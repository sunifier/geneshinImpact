import { motion } from 'framer-motion';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, CrimsonDivider, ChapterIntro, Takeaway } from '@/components/shared/DossierUI';
import { PyroIcon, CryoIcon, AnemoIcon, DendroIcon } from '@/components/GenshinIcons';

const LENSES = [
  { icon: <PyroIcon size={20} color="hsl(0 72% 51%)" />, lens: "Game System Incentives", desc: "Rarity, cadence, monetization context" },
  { icon: <CryoIcon size={20} color="hsl(210 60% 60%)" />, lens: "Behavior", desc: "Gacha activity intensity, inactivity gaps, diversity" },
  { icon: <AnemoIcon size={20} color="hsl(180 50% 50%)" />, lens: "Public Voice", desc: "Review sentiment, topic pressure, volatility" },
  { icon: <DendroIcon size={20} color="hsl(150 60% 45%)" />, lens: "Private Intel", desc: "Survey-based motivation, break risk, preferences" },
];

export default function CaseBriefPage() {
  return (
    <ChapterLayout chapterId="case-brief" onLogClue="Business questions established">
      <SectionHeader
        badge="Chapter III"
        title="Case Brief"
        subtitle="Business Understanding — what we set out to learn."
        whyItMatters="Every analytical decision flows from these questions."
      />

      <ChapterIntro>
        Before modeling begins, the investigation must establish its core questions.
        These five hypotheses define the scope, boundaries, and success criteria of the analysis.
      </ChapterIntro>

      <div className="space-y-8">
        <PanelCard>
          <h3 className="font-heading text-xl text-foreground mb-6">Core Investigation Questions</h3>
          <div className="space-y-5">
            {[
              { q: "Can we identify distinct behavioral engagement profiles from gacha activity data?", tag: "H1" },
              { q: "Is public review sentiment thematically polarized, and do certain topics concentrate negative experiences?", tag: "H2" },
              { q: "Do behavioral segments differ meaningfully in inactivity-gap structure?", tag: "H3" },
              { q: "Can we fuse public voice data with behavioral data to create a multi-view segmentation?", tag: "H4" },
              { q: "Is there a relationship between monetization behavior and disengagement risk?", tag: "H5" },
            ].map(({ q, tag }, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                className="flex gap-4 items-start"
              >
                <span className="text-primary font-heading text-xl font-semibold w-10 shrink-0">{tag}</span>
                <p className="text-foreground/80 text-sm leading-relaxed">{q}</p>
              </motion.div>
            ))}
          </div>
        </PanelCard>

        <CrimsonDivider />

        <PanelCard delay={0.1}>
          <h3 className="font-heading text-xl text-foreground mb-4">Analytical Framework</h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            The investigation triangulates four analytical lenses to build an evidence-driven segmentation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LENSES.map(({ icon, lens, desc }, i) => (
              <motion.div
                key={lens}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-panel-solid p-5"
              >
                <h4 className="text-foreground text-sm font-medium mb-2 flex items-center gap-2">
                  {icon} {lens}
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </PanelCard>

        <PanelCard delay={0.2}>
          <h3 className="font-heading text-xl text-foreground mb-3">CRISP-DM Methodology</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This dossier follows the Cross-Industry Standard Process for Data Mining, treating each phase as a "case file" —
            what we did, why we did it, what it proves, and what it does not prove. Every claim is bounded by the evidence available.
          </p>
        </PanelCard>
      </div>

      <Takeaway>
        Five hypotheses drive the investigation. Not all will survive scrutiny — and that's by design.
        The dossier treats negative findings as evidence, not failure.
      </Takeaway>
    </ChapterLayout>
  );
}
