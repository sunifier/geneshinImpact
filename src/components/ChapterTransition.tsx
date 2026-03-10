import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { playChapterTransition } from '@/lib/sounds';
import type { ChapterId } from '@/stores/useDossierStore';
import { ElementIcon } from '@/components/GenshinIcons';

interface ChapterTransitionProps {
  show: boolean;
  chapterTitle: string;
  chapterSubtitle?: string;
  chapterId?: ChapterId;
  onComplete: () => void;
}

const CHAPTER_THEMES: Record<string, { accent: string; glow: string; element: string; elementColor: string }> = {
  'prologue':       { accent: 'hsl(37 90% 44%)',   glow: 'hsl(37 90% 44% / 0.3)',   element: 'geo',     elementColor: 'hsl(37 90% 44%)' },
  'briefing':       { accent: 'hsl(0 72% 51%)',    glow: 'hsl(0 72% 51% / 0.3)',    element: 'pyro',    elementColor: 'hsl(0 72% 51%)' },
  'evidence-board': { accent: 'hsl(0 72% 51%)',    glow: 'hsl(0 72% 51% / 0.3)',    element: 'star',    elementColor: 'hsl(0 72% 51%)' },
  'case-brief':     { accent: 'hsl(210 25% 95%)',  glow: 'hsl(210 25% 95% / 0.2)',  element: 'cryo',    elementColor: 'hsl(210 60% 70%)' },
  'evidence-intake':{ accent: 'hsl(37 90% 44%)',   glow: 'hsl(37 90% 44% / 0.3)',   element: 'geo',     elementColor: 'hsl(37 90% 44%)' },
  'forensics-lab':  { accent: 'hsl(210 60% 60%)',  glow: 'hsl(210 60% 60% / 0.3)',  element: 'hydro',   elementColor: 'hsl(210 60% 60%)' },
  'segmentation':   { accent: 'hsl(270 50% 60%)',  glow: 'hsl(270 50% 60% / 0.3)',  element: 'electro', elementColor: 'hsl(270 50% 60%)' },
  'risk-engine':    { accent: 'hsl(0 72% 51%)',    glow: 'hsl(0 72% 51% / 0.4)',    element: 'pyro',    elementColor: 'hsl(0 72% 51%)' },
  'public-voice':   { accent: 'hsl(180 50% 50%)',  glow: 'hsl(180 50% 50% / 0.3)',  element: 'anemo',   elementColor: 'hsl(180 50% 50%)' },
  'cross-view':     { accent: 'hsl(37 90% 44%)',   glow: 'hsl(37 90% 44% / 0.3)',   element: 'geo',     elementColor: 'hsl(37 90% 44%)' },
  'deployment':     { accent: 'hsl(37 90% 44%)',   glow: 'hsl(37 90% 44% / 0.4)',   element: 'wish',    elementColor: 'hsl(37 90% 44%)' },
  'verdict':        { accent: 'hsl(0 72% 51%)',    glow: 'hsl(0 72% 51% / 0.4)',    element: 'vision',  elementColor: 'hsl(0 72% 51%)' },
  'validation':     { accent: 'hsl(210 60% 60%)',  glow: 'hsl(210 60% 60% / 0.3)',  element: 'hydro',   elementColor: 'hsl(210 60% 60%)' },
  'diagnostics':    { accent: 'hsl(150 50% 50%)',  glow: 'hsl(150 50% 50% / 0.3)',  element: 'dendro',  elementColor: 'hsl(150 60% 45%)' },
};

export default function ChapterTransition({ show, chapterTitle, chapterSubtitle, chapterId, onComplete }: ChapterTransitionProps) {
  const [phase, setPhase] = useState<'walk' | 'reveal' | 'done'>('walk');
  const theme = CHAPTER_THEMES[chapterId || ''] || CHAPTER_THEMES['briefing'];

  // Generate particles once — element-colored dust
  const particles = useMemo(() =>
    Array.from({ length: 30 }).map(() => ({
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 80,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      drift: -20 - Math.random() * 40,
    })), []);

  useEffect(() => {
    if (!show) {
      setPhase('walk');
      return;
    }
    playChapterTransition();
    const t1 = setTimeout(() => setPhase('reveal'), 1200);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && phase !== 'done' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'hsl(222 47% 4%)' }}
        >
          {/* Ambient radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${theme.glow}, transparent 70%)`,
            }}
          />

          {/* Element-colored dust/particle field */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  background: i % 3 === 0 ? theme.accent : 'hsl(210 25% 95% / 0.15)',
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  y: [0, p.drift],
                  x: [0, (Math.random() - 0.5) * 20],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Crimson thread path */}
          <div className="relative w-full max-w-2xl px-8 mb-16">
            <motion.div
              className="h-[2px] relative overflow-visible"
              style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.glow}` }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Traveling element icon along the thread */}
            <motion.div
              className="absolute -top-5"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: '90%', opacity: [0, 1, 1, 0.6] }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <ElementIcon element={theme.element} size={24} color={theme.elementColor} />
              </motion.div>
            </motion.div>

            {/* Trail sparkles */}
            <motion.div
              className="absolute top-0 h-[2px]"
              initial={{ width: '0%', opacity: 0.8 }}
              animate={{ width: '100%', opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
            />
          </div>

          {/* Chapter title reveal */}
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center relative"
              >
                {/* Element icon above title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-4"
                >
                  <ElementIcon element={theme.element} size={40} color={theme.elementColor} />
                </motion.div>

                <h2
                  className="chapter-title text-4xl md:text-6xl mb-3"
                  style={{ textShadow: `0 0 40px ${theme.glow}` }}
                >
                  {chapterTitle}
                </h2>
                {chapterSubtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground text-sm tracking-[0.2em] uppercase"
                  >
                    {chapterSubtitle}
                  </motion.p>
                )}

                {/* Decorative lines under title */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 120 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="h-[1px] mx-auto mt-4"
                  style={{ background: theme.accent, opacity: 0.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
