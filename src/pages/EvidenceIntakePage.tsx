import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, CrimsonDivider, ChapterIntro, Takeaway, CollapsibleDetail } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { motion } from 'framer-motion';
import { PyroIcon, AnemoIcon, DendroIcon, ElectroIcon, GeoIcon, CryoIcon } from '@/components/GenshinIcons';

const EVIDENCE_TILES = [
  {
    icon: <PyroIcon size={28} color="hsl(0 72% 51%)" />,
    title: 'Behavioral Logs',
    subtitle: 'How players actually pull, pause, and return',
    detail: `${DATA.N_ACCOUNTS} gacha accounts with full wish-level activity logs`,
    color: 'hsl(var(--crimson))',
  },
  {
    icon: <AnemoIcon size={28} color="hsl(180 50% 50%)" />,
    title: 'Public Voice',
    subtitle: 'What frustration and praise look like in the wild',
    detail: `${DATA.N_REVIEWS.toLocaleString()} app store reviews with NLP topic extraction`,
    color: 'hsl(var(--orichalcum))',
  },
  {
    icon: <DendroIcon size={28} color="hsl(150 60% 45%)" />,
    title: 'Survey Layer',
    subtitle: 'What players privately feel, fear, and prefer',
    detail: `${DATA.N_SURVEY} respondents with motivation, break risk, and preference data`,
    color: 'hsl(210 60% 60%)',
  },
  {
    icon: <ElectroIcon size={28} color="hsl(270 50% 60%)" />,
    title: 'Banner Logic',
    subtitle: 'Where scarcity, hype, and timing begin',
    detail: 'Character & weapon banner cadence, rarity tiers, and pity structure',
    color: 'hsl(270 50% 60%)',
  },
  {
    icon: <GeoIcon size={28} color="hsl(37 90% 44%)" />,
    title: 'Characters & Weapons',
    subtitle: 'Why desire and planning matter in this world',
    detail: '5★ and 4★ acquisition rates, banner diversity, and selectivity patterns',
    color: 'hsl(37 90% 44%)',
  },
  {
    icon: <CryoIcon size={28} color="hsl(210 60% 70%)" />,
    title: 'Cross-View Synthesis',
    subtitle: 'How the analytical lenses converge',
    detail: 'Profile-level comparison of behavior + survey views (no artificial fusion)',
    color: 'hsl(180 50% 50%)',
  },
];

export default function EvidenceIntakePage() {
  return (
    <ChapterLayout chapterId="evidence-intake" onLogClue="Data sources catalogued">
      <SectionHeader
        badge="Chapter IV"
        title="Evidence Intake"
        subtitle="Data sources, features, and the raw materials of the investigation."
        whyItMatters="Understanding what data we have — and what we don't — determines what conclusions are possible."
      />

      <ChapterIntro>
        Before we analyze, we must know our evidence. Each source contributes a unique lens —
        and each has limitations that bound what we can claim.
      </ChapterIntro>

      {/* Meet the Evidence — codex tiles */}
      <div className="mb-12">
        <h3 className="font-heading text-2xl text-foreground mb-6">Meet the Evidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVIDENCE_TILES.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel p-5 group cursor-default"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5">{tile.icon}</div>
                <div>
                  <h4 className="text-foreground font-medium text-sm group-hover:text-accent transition-colors">
                    {tile.title}
                  </h4>
                  <p className="text-primary/70 text-xs italic mt-0.5">{tile.subtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{tile.detail}</p>
              <div className="mt-3 h-[2px] rounded-full overflow-hidden bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: tile.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CrimsonDivider />

      {/* Data sources — numbers */}
      <div className="space-y-6">
        <PanelCard delay={0.2}>
          <h3 className="font-heading text-xl text-foreground mb-4">Data Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel-solid p-5 text-center">
              <div className="text-accent text-3xl font-heading mb-1">{DATA.N_ACCOUNTS}</div>
              <h4 className="text-foreground text-sm font-medium">Gacha Accounts</h4>
              <p className="text-muted-foreground text-xs mt-1">Account-level behavioral features from wish/pull logs</p>
            </div>
            <div className="glass-panel-solid p-5 text-center">
              <div className="text-accent text-3xl font-heading mb-1">{DATA.N_REVIEWS.toLocaleString()}</div>
              <h4 className="text-foreground text-sm font-medium">Public Reviews</h4>
              <p className="text-muted-foreground text-xs mt-1">App store reviews with NLP-extracted sentiment and topics</p>
            </div>
            <div className="glass-panel-solid p-5 text-center">
              <div className="text-accent text-3xl font-heading mb-1">{DATA.N_SURVEY}</div>
              <h4 className="text-foreground text-sm font-medium">Survey Responses</h4>
              <p className="text-muted-foreground text-xs mt-1">Private player state: motivation, break risk, preferences</p>
            </div>
          </div>
        </PanelCard>

        {/* Feature list — collapsible */}
        <CollapsibleDetail title="View all behavioral features (per account)">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { name: "pulls", desc: "Total wish count" },
              { name: "active_days", desc: "Days with activity" },
              { name: "span_days", desc: "Account lifespan" },
              { name: "pulls_per_day", desc: "Activity intensity" },
              { name: "max_gap_days", desc: "Longest inactive gap" },
              { name: "mean_gap_days", desc: "Average gap between activity" },
              { name: "five_rate", desc: "5★ acquisition rate" },
              { name: "four_rate", desc: "4★ acquisition rate" },
              { name: "banner_diversity", desc: "Banner types engaged" },
            ].map(({ name, desc }) => (
              <div key={name} className="glass-panel-solid p-3">
                <code className="text-primary text-xs">{name}</code>
                <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleDetail>
      </div>

      <Takeaway>
        Three distinct data sources — behavioral logs, public reviews, and a private survey — form the evidentiary base.
        Their lack of respondent-level linkage is a key constraint that shapes the entire integration strategy.
      </Takeaway>
    </ChapterLayout>
  );
}
