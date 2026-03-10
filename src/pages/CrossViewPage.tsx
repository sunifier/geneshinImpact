import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, BadgePill, CrimsonDivider, ChapterIntro, Takeaway } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { useDossierStore } from '@/stores/useDossierStore';
import { playCardReveal } from '@/lib/sounds';

export default function CrossViewPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { viewMode } = useDossierStore();
  const arch = DATA.CROSS_VIEW_ARCHETYPES[activeCard];

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => {
      setRevealed(true);
      playCardReveal();
    }, 120);
    return () => clearTimeout(t);
  }, [activeCard]);

  return (
    <ChapterLayout chapterId="cross-view" onLogClue="Cross-view synthesis complete">
      <SectionHeader
        badge="Chapter IX"
        title="Cross-View Meaning"
        subtitle="How behavioral and survey lenses connect — and where they diverge."
        whyItMatters="The project's valid integration claim is profile-level synthesis across retained views, not row-level fusion."
      />

      <ChapterIntro>
        This is where the investigation converges. By examining how behavioral patterns and private player-state
        align at the archetype level, we construct the cross-view intelligence that powers deployment.
      </ChapterIntro>

      <div className="space-y-8">
        {/* Archetype selector */}
        <div className="flex gap-2 flex-wrap">
          {DATA.CROSS_VIEW_ARCHETYPES.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setActiveCard(i)}
              className={`px-4 py-2 rounded-lg text-xs transition-all ${
                i === activeCard
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_12px_hsl(0_72%_51%_/_0.15)]'
                  : 'glass-panel-solid text-muted-foreground hover:text-foreground'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>

        {/* Hero archetype card */}
        <AnimatePresence mode="wait">
          {revealed && (
            <motion.div
              key={arch.name}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <PanelCard className="border-primary/15">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-heading text-3xl text-foreground mb-1">{arch.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {arch.behaviorAnchor} × {arch.surveyAnchor}
                    </span>
                  </div>
                  <BadgePill variant="retained">Cross-View</BadgePill>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Core Story</h4>
                    <p className="text-foreground/80 text-sm leading-relaxed">{arch.coreStory}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Main Risk</h4>
                    <p className="text-primary text-sm leading-relaxed">{arch.mainRisk}</p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <div>
                    <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Action Family</h4>
                    <span className="text-accent font-medium">{arch.actionFamily}</span>
                  </div>
                </div>
              </PanelCard>
            </motion.div>
          )}
        </AnimatePresence>

        <CrimsonDivider />

        {/* Synthetic hybrid — demo only, internal only */}
        {viewMode === 'internal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <PanelCard className="border-accent/15 opacity-80">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-heading text-lg text-foreground">Synthetic Hybrid Mapping</h3>
                <BadgePill variant="demo">Demo Only</BadgePill>
                <BadgePill variant="rejected">Non-inferential</BadgePill>
              </div>
              <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                Artificial linkage with weak separation. Retained only as methodological illustration. Do not use for deployment decisions.
              </p>
              <div className="space-y-3">
                {DATA.SYNTHETIC_HYBRIDS.map((h) => (
                  <div key={h.cluster} className="glass-panel-solid p-3 opacity-90">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-foreground/70 text-sm">{h.name}</span>
                      <BadgePill variant="demo">Demo</BadgePill>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span>≈ {h.closestBehavior} (d={h.distanceBehavior})</span>
                      <span>≈ {h.closestSurvey} (d={h.distanceSurvey})</span>
                    </div>
                  </div>
                ))}
              </div>
            </PanelCard>
          </motion.div>
        )}
      </div>

      <Takeaway>
        Cross-view synthesis reveals that behavioral drift and private withdrawal risk align clearly in the Drift-Risk Archetype,
        while externally active players may mask private fatigue (Active-but-Fatigued Archetype). These archetypes form the basis
        of the deployment strategy — combining what we can observe with what only players themselves can report.
      </Takeaway>
    </ChapterLayout>
  );
}
