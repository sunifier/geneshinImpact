import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, ChapterIntro } from '@/components/shared/DossierUI';
import { useDossierStore, CHAPTERS } from '@/stores/useDossierStore';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, Circle } from 'lucide-react';
import { ElementIcon } from '@/components/GenshinIcons';

const CHAPTER_ELEMENTS: Record<string, string> = {
  'prologue': 'geo',
  'briefing': 'pyro',
  'case-brief': 'cryo',
  'evidence-intake': 'geo',
  'forensics-lab': 'hydro',
  'segmentation': 'electro',
  'risk-engine': 'pyro',
  'public-voice': 'anemo',
  'cross-view': 'geo',
  'deployment': 'wish',
  'verdict': 'vision',
  'validation': 'hydro',
  'diagnostics': 'dendro',
};

const CHAPTER_COLORS: Record<string, string> = {
  'prologue': 'hsl(37 90% 44%)',
  'briefing': 'hsl(0 72% 51%)',
  'case-brief': 'hsl(210 60% 70%)',
  'evidence-intake': 'hsl(37 90% 44%)',
  'forensics-lab': 'hsl(210 60% 60%)',
  'segmentation': 'hsl(270 50% 60%)',
  'risk-engine': 'hsl(0 72% 51%)',
  'public-voice': 'hsl(180 50% 50%)',
  'cross-view': 'hsl(37 90% 44%)',
  'deployment': 'hsl(37 90% 44%)',
  'verdict': 'hsl(0 72% 51%)',
  'validation': 'hsl(210 60% 60%)',
  'diagnostics': 'hsl(150 60% 45%)',
};

// Pre-compute node positions for the board layout
function getNodePositions(count: number, containerW: number, containerH: number) {
  const cols = Math.min(count, 4);
  const rows = Math.ceil(count / cols);
  const cellW = containerW / cols;
  const cellH = containerH / rows;
  
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    // Zigzag: reverse col on odd rows for a natural investigation flow
    const actualCol = row % 2 === 0 ? col : (cols - 1 - col);
    return {
      x: cellW * actualCol + cellW / 2,
      y: cellH * row + cellH / 2,
    };
  });
}

export default function EvidenceBoardPage() {
  const { isChapterUnlocked, isChapterCompleted, viewMode, getProgress, loggedClues } = useDossierStore();
  const navigate = useNavigate();
  const visible = CHAPTERS.filter(ch => !ch.internalOnly || viewMode === 'internal').filter(ch => ch.id !== 'evidence-board');
  const { completed, total } = getProgress();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 900, h: 600 });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ w: rect.width, h: Math.max(500, visible.length * 50) });
    }
  }, [visible.length]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const positions = getNodePositions(visible.length, dimensions.w, dimensions.h);

  // Build red string connections (sequential path)
  const connections: Array<{ from: number; to: number }> = [];
  for (let i = 0; i < visible.length - 1; i++) {
    connections.push({ from: i, to: i + 1 });
  }

  return (
    <ChapterLayout chapterId="evidence-board">
      <SectionHeader
        badge="Mission Map"
        title="Evidence Board"
        subtitle="Your investigation overview. Navigate between chapters and track progress."
      />

      <ChapterIntro>
        Each node represents a phase of the investigation. Complete chapters in sequence to unlock the next.
        Your evidence accumulates as you progress through the dossier.
      </ChapterIntro>

      {/* Progress summary */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <PanelCard className="text-center">
          <div className="text-2xl font-heading text-primary">{completed}/{total}</div>
          <div className="text-xs text-muted-foreground mt-1">Chapters Cleared</div>
        </PanelCard>
        <PanelCard className="text-center">
          <div className="text-2xl font-heading text-accent">{loggedClues.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Evidence Collected</div>
        </PanelCard>
        <PanelCard className="text-center">
          <div className="text-2xl font-heading text-foreground">
            {completed >= total ? '100%' : `${Math.round((completed / total) * 100)}%`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Verdict Readiness</div>
        </PanelCard>
      </div>

      {/* Evidence Board with red strings */}
      <div
        ref={containerRef}
        className="relative glass-panel p-6 overflow-hidden"
        style={{ minHeight: dimensions.h + 40 }}
      >
        {/* Background texture — corkboard feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* SVG layer for red strings */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: dimensions.w, height: dimensions.h }}
        >
          <defs>
            <filter id="string-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {connections.map(({ from, to }, i) => {
            const p1 = positions[from];
            const p2 = positions[to];
            if (!p1 || !p2) return null;

            const fromUnlocked = isChapterUnlocked(visible[from].id);
            const toUnlocked = isChapterUnlocked(visible[to].id);
            const isActive = fromUnlocked && toUnlocked;

            // Create a slight curve for the string
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2 - 15 + Math.sin(i * 1.5) * 10;
            const path = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

            return (
              <motion.path
                key={`${from}-${to}`}
                d={path}
                fill="none"
                stroke={isActive ? 'hsl(0 72% 51%)' : 'hsl(0 72% 51% / 0.15)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '4 4'}
                filter={isActive ? 'url(#string-glow)' : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            );
          })}

          {/* Pin dots at each node */}
          {positions.map((pos, i) => {
            const ch = visible[i];
            if (!ch || !pos) return null;
            const unlocked = isChapterUnlocked(ch.id);
            return (
              <circle
                key={`pin-${i}`}
                cx={pos.x}
                cy={pos.y}
                r={4}
                fill={unlocked ? 'hsl(0 72% 51%)' : 'hsl(0 72% 51% / 0.2)'}
                stroke="hsl(0 72% 40%)"
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {/* Chapter node cards */}
        {positions.map((pos, i) => {
          const ch = visible[i];
          if (!ch || !pos) return null;
          const unlocked = isChapterUnlocked(ch.id);
          const completed = isChapterCompleted(ch.id);
          const element = CHAPTER_ELEMENTS[ch.id] || 'star';
          const color = CHAPTER_COLORS[ch.id] || 'hsl(0 72% 51%)';

          return (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="absolute"
              style={{
                left: pos.x - 72,
                top: pos.y - 44,
                width: 144,
              }}
            >
              <button
                onClick={() => unlocked && navigate(ch.route)}
                disabled={!unlocked}
                className={`w-full text-center p-3 rounded-lg transition-all duration-300 ${
                  unlocked
                    ? completed
                      ? 'glass-panel-solid border-accent/30 cursor-pointer hover:border-accent/60 hover:shadow-[0_0_12px_hsl(37_90%_44%_/_0.15)]'
                      : 'glass-panel-solid border-primary/20 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_15px_hsl(0_72%_51%_/_0.15)]'
                    : 'glass-panel-solid opacity-30 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1.5">
                  <ElementIcon element={element} size={16} color={unlocked ? color : 'hsl(215 16% 47%)'} />
                  {completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  ) : unlocked ? (
                    <Circle className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <Lock className="w-3 h-3 text-muted-foreground/50" />
                  )}
                </div>
                <h3 className="font-heading text-xs text-foreground leading-tight">{ch.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                  {ch.internalOnly ? 'Internal' : `Ch. ${ch.order}`}
                </p>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Red thread */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-10 crimson-thread w-full max-w-md mx-auto"
      />
    </ChapterLayout>
  );
}
