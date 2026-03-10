import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, CrimsonDivider } from '@/components/shared/DossierUI';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playPageTurn } from '@/lib/sounds';
import { AnemoIcon, DendroIcon, PyroIcon, GeoIcon, ElectroIcon } from '@/components/GenshinIcons';

const PROLOGUE_PAGES = [
  {
    title: "What is Genshin Impact?",
    icon: <AnemoIcon size={28} color="hsl(180 50% 50%)" />,
    content: (
      <div className="space-y-5">
        <p className="text-foreground/90 text-lg leading-relaxed">
          Genshin Impact is a fantasy open-world action RPG set in the world of <span className="text-accent">Teyvat</span> — a realm shaped by seven elemental forces, each governed by a divine Archon.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Players explore vast landscapes, engage in real-time combat, uncover narrative quests, and collect characters — each with unique abilities, elemental affinities, and deeply woven backstories. Since its launch in 2020, the game has become one of the most commercially successful live-service titles in history.
        </p>
      </div>
    ),
  },
  {
    title: "The Story of the World",
    icon: <DendroIcon size={28} color="hsl(150 60% 45%)" />,
    content: (
      <div className="space-y-5">
        <p className="text-foreground/90 text-lg leading-relaxed">
          A <span className="text-accent">Traveler</span> arrives in Teyvat from beyond its borders, searching for a lost sibling separated during a cataclysmic encounter with an unknown god.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The journey unfolds across seven nations — Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, and Snezhnaya — each with its own culture, history, power system, and ruling Archon.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The narrative is not merely backdrop. It drives player attachment, shapes emotional connection to characters, and creates the motivational architecture that sustains long-term engagement.
        </p>
      </div>
    ),
  },
  {
    title: "Characters & Nations",
    icon: <PyroIcon size={28} color="hsl(0 72% 51%)" />,
    content: (
      <div className="space-y-5">
        <p className="text-foreground/90 text-lg leading-relaxed">
          Characters are central to <span className="text-accent">identity, attachment, and collectibility</span> in Genshin Impact.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Each playable character belongs to a nation, wields an element, carries a personal story, and functions as both a narrative anchor and a gameplay identity. Players form teams, invest resources, and develop emotional relationships with their favorites.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          This dual role — story figure and gameplay asset — makes character acquisition one of the most powerful drivers of engagement, spending, and sentiment.
        </p>
      </div>
    ),
  },
  {
    title: "Banners, Wishes & Weapons",
    icon: <GeoIcon size={28} color="hsl(37 90% 44%)" />,
    content: (
      <div className="space-y-5">
        <p className="text-foreground/90 text-lg leading-relaxed">
          The <span className="text-primary">wish system</span> is the primary acquisition mechanic — and the foundation of the data in this dossier.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Banners</strong> are limited-time wish pools featuring specific characters or weapons. <strong>Wishes</strong> (or pulls) are the act of spending currency to acquire items. Rarity matters: 5★ items are exceptionally rare and highly desired.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Players must decide when to save, when to spend, and which banners to invest in — creating behavioral signatures of intensity, selectivity, and inactivity.
        </p>
        <div className="glass-panel-solid p-4 mt-2">
          <p className="text-sm text-muted-foreground italic">
            Timing, scarcity, and planning shape player behavior, excitement, frustration, and retention — all captured in the gacha logs analyzed here.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Why This Matters for the Dossier",
    icon: <ElectroIcon size={28} color="hsl(270 50% 60%)" />,
    content: (
      <div className="space-y-5">
        <p className="text-foreground/90 text-lg leading-relaxed">
          Every pattern analyzed in this dossier emerges from the structure described above.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          <span className="text-accent">Scarcity</span> creates urgency and spending patterns.{' '}
          <span className="text-accent">Attachment</span> drives loyalty and frustration.{' '}
          <span className="text-accent">Inactivity</span> reveals drift and disengagement risk.{' '}
          <span className="text-accent">Public voice</span> amplifies friction points.{' '}
          <span className="text-accent">Private motivation</span> explains what logs alone cannot see.
        </p>
        <CrimsonDivider />
        <p className="text-center text-foreground/80 italic font-heading text-xl">
          The investigation begins.
        </p>
      </div>
    ),
  },
];

export default function ProloguePage() {
  const [pageIdx, setPageIdx] = useState(0);
  const navigate = useNavigate();
  const page = PROLOGUE_PAGES[pageIdx];
  const isLast = pageIdx === PROLOGUE_PAGES.length - 1;

  const goTo = useCallback((idx: number) => {
    playPageTurn();
    setPageIdx(idx);
  }, []);

  return (
    <ChapterLayout chapterId="prologue" onLogClue="World context established">
      <SectionHeader
        badge="Prologue"
        title="The World of Teyvat"
        subtitle="Before the investigation begins, the world must be understood."
      />

      {/* Page indicator */}
      <div className="flex items-center gap-3 mb-10">
        {PROLOGUE_PAGES.map((p, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === pageIdx
                ? 'w-10 h-1.5 bg-accent'
                : i < pageIdx
                ? 'w-6 h-1.5 bg-accent/40'
                : 'w-6 h-1.5 bg-muted'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-2">{pageIdx + 1} / {PROLOGUE_PAGES.length}</span>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pageIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-panel p-8 md:p-12 min-h-[320px]"
        >
          <div className="flex items-center gap-3 mb-6">
            {page.icon}
            <h3 className="font-heading text-2xl text-accent">{page.title}</h3>
          </div>
          {page.content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={() => goTo(Math.max(0, pageIdx - 1))}
          disabled={pageIdx === 0}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <button
          onClick={() => navigate('/briefing')}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <SkipForward className="w-3 h-3" /> Skip to Investigation
        </button>

        {isLast ? (
          <button
            onClick={() => navigate('/briefing')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2.5 text-sm font-medium tracking-wide transition-all hover:shadow-[0_0_20px_hsl(0_72%_51%_/_0.3)]"
          >
            Begin Investigation →
          </button>
        ) : (
          <button
            onClick={() => goTo(pageIdx + 1)}
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </ChapterLayout>
  );
}
