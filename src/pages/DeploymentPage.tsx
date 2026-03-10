import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, BadgePill, CrimsonDivider, ChapterIntro, Takeaway, CollapsibleDetail } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { playCardReveal } from '@/lib/sounds';
import { Scale } from 'lucide-react';

export default function DeploymentPage() {
  const [activeArchetype, setActiveArchetype] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const arch = DATA.CROSS_VIEW_ARCHETYPES[activeArchetype];

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => {
      setRevealed(true);
      playCardReveal();
    }, 150);
    return () => clearTimeout(t);
  }, [activeArchetype]);

  return (
    <ChapterLayout chapterId="deployment" onLogClue="Deployment protocol established">
      <SectionHeader
        badge="Chapter X"
        title="Deployment Plan"
        subtitle="From insight to action — player intelligence cards, NBA rules, and responsible deployment."
        whyItMatters="Analytical findings only matter if they translate into responsible, actionable decisions."
      />

      <ChapterIntro>
        This is the payoff. Every segment, risk score, and cross-view archetype converges here into actionable deployment intelligence.
        The cross-view player cards are the crown jewel — combining what we observe with what only players themselves can report.
      </ChapterIntro>

      <div className="space-y-8">
        {/* Hero: Cross-view player cards */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Player Intelligence Cards</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
            Cross-view archetypes are the primary deployment output. Each card combines behavioral risk, private player-state, and recommended strategy.
          </p>

          <div className="flex gap-2 flex-wrap mb-6">
            {DATA.CROSS_VIEW_ARCHETYPES.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setActiveArchetype(i)}
                className={`px-4 py-2 rounded-lg text-xs transition-all ${
                  i === activeArchetype
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_12px_hsl(0_72%_51%_/_0.2)]'
                    : 'glass-panel-solid text-muted-foreground hover:text-foreground'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {revealed && (
              <motion.div
                key={arch.name}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-panel-solid p-8 border-primary/20"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-heading text-3xl text-foreground"
                    >
                      {arch.name}
                    </motion.h4>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs text-muted-foreground"
                    >
                      {arch.behaviorAnchor} × {arch.surveyAnchor}
                    </motion.span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-accent/10 text-accent px-4 py-2 rounded-lg text-sm font-medium border border-accent/20"
                  >
                    {arch.actionFamily}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h5 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Core Story</h5>
                    <p className="text-foreground/80 text-sm leading-relaxed">{arch.coreStory}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h5 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Primary Risk</h5>
                    <p className="text-primary text-sm leading-relaxed">{arch.mainRisk}</p>
                  </motion.div>
                </div>

                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="crimson-thread mt-6"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CrimsonDivider />

        {/* NBA rules — card-first */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Next-Best-Action Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATA.NBA_RULES.map((r, i) => (
              <motion.div
                key={r.surveySegment}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass-panel-solid p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-foreground text-sm font-medium">{r.surveySegment}</h4>
                  <div className="flex gap-2">
                    <BadgePill variant={r.riskLevel.toLowerCase().includes('high') ? 'retained' : r.riskLevel.toLowerCase().includes('moderate') ? 'demo' : 'rejected'}>
                      {r.riskLevel} risk
                    </BadgePill>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-medium text-xs">{r.actionFamily}</span>
                    <span className="text-border">·</span>
                    <span>{r.topChannel}</span>
                  </div>
                  <p className="text-foreground/70">{r.recommendedAction}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deployment logic — collapsible */}
        <CollapsibleDetail title="View deployment decision logic table">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                <th className="text-left py-2 pr-3">Input Layer</th>
                <th className="text-left py-2 pr-3">Signal Type</th>
                <th className="text-left py-2">Deployment Use</th>
              </tr>
            </thead>
            <tbody>
              {DATA.DEPLOYMENT_LOGIC.map((d) => (
                <tr key={d.inputLayer} className="border-b border-border/50">
                  <td className="py-2 pr-3 text-foreground">{d.inputLayer}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{d.signalType}</td>
                  <td className="py-2 text-muted-foreground text-xs">{d.deploymentUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CollapsibleDetail>

        {/* Responsible use */}
        <PanelCard className="border-accent/30">
          <h3 className="font-heading text-xl text-accent mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5" /> Responsible Use
          </h3>
          <p className="text-foreground/80 text-sm leading-relaxed">
            This is a <strong>decision-support prototype</strong>, not an automated targeting engine. Fatigue and disengagement signals must not be used as triggers for manipulative monetization pressure. The goal is relevance, reduced overload, and respectful communication — not extraction.
          </p>
        </PanelCard>
      </div>

      <Takeaway>
        Deployment prioritizes the cross-view archetypes as the primary intelligence layer, with survey-segment NBA rules providing the actionable communication strategy. Tables and detail are available for audit but secondary to the card-first presentation.
      </Takeaway>
    </ChapterLayout>
  );
}
