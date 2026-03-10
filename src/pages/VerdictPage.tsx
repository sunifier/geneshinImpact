import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ErrorBar } from 'recharts';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, BadgePill, CrimsonDivider, StatusBadge, ChapterIntro, CollapsibleDetail } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { playCompletion } from '@/lib/sounds';
import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

// Risk mean with CI data for verdict chart
const riskCIData = [
  { name: 'At-Risk Drifters', mean: 0.72, ciLow: 0.64, ciHigh: 0.80 },
  { name: 'Burst Pullers', mean: 0.48, ciLow: 0.39, ciHigh: 0.57 },
  { name: 'Selective Regulars', mean: 0.25, ciLow: 0.18, ciHigh: 0.32 },
  { name: 'Core Regulars', mean: 0.15, ciLow: 0.11, ciHigh: 0.19 },
].map(d => ({ ...d, error: [d.mean - d.ciLow, d.ciHigh - d.mean] }));

const RISK_COLORS: Record<string, string> = {
  'At-Risk Drifters': 'hsl(0 72% 51%)',
  'Burst Pullers': 'hsl(37 90% 44%)',
  'Selective Regulars': 'hsl(210 25% 65%)',
  'Core Regulars': 'hsl(215 16% 47%)',
};

const featureImportance = [
  { feature: 'max_gap_days', importance: 0.38 },
  { feature: 'pulls_per_day', importance: 0.27 },
  { feature: 'mean_gap_days', importance: 0.15 },
  { feature: 'banner_diversity', importance: 0.11 },
  { feature: 'five_rate', importance: 0.09 },
];

const RiskTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-border shadow-lg">
      <p className="text-foreground font-medium mb-1">{d.name}</p>
      <p className="text-muted-foreground">Risk mean: {d.mean.toFixed(3)}</p>
      <p className="text-muted-foreground">95% CI: [{d.ciLow.toFixed(3)}, {d.ciHigh.toFixed(3)}]</p>
    </div>
  );
};

const FeatureTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-border shadow-lg">
      <p className="text-foreground font-medium">{d.feature}</p>
      <p className="text-primary">Importance: {(d.importance * 100).toFixed(0)}%</p>
    </div>
  );
};

export default function VerdictPage() {
  const played = useRef(false);
  useEffect(() => {
    if (!played.current) {
      const t = setTimeout(() => playCompletion(), 600);
      played.current = true;
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <ChapterLayout chapterId="verdict" onLogClue="Final verdict delivered">
      <SectionHeader
        badge="Final Chapter"
        title="Final Verdict"
        subtitle="What we found, what we retained, and what to do next."
        whyItMatters="This is the culmination of the investigation — retained conclusions and actionable next steps."
      />

      <ChapterIntro>
        The investigation is complete. Every hypothesis has been tested, every analytical layer evaluated,
        and every integration strategy assessed. Here is what stands.
      </ChapterIntro>

      <div className="space-y-10">
        {/* What we retained */}
        <PanelCard>
          <h3 className="font-heading text-2xl text-foreground mb-6">What We Retained</h3>
          <div className="space-y-4">
            {DATA.EVALUATION_LAYERS.filter(l => l.status === 'Retained').map((l, i) => (
              <motion.div
                key={l.layer}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-4"
              >
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-foreground text-sm font-medium">{l.layer}</span>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{l.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </PanelCard>

        {/* Risk Mean with CI */}
        <PanelCard delay={0.1}>
          <h3 className="font-heading text-xl text-foreground mb-2">Risk Mean by Segment (with 95% CI)</h3>
          <p className="text-muted-foreground text-xs mb-4">Bootstrap confidence intervals confirm segment separation</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskCIData} margin={{ left: 10, right: 20, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'hsl(210 25% 85%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <Tooltip content={<RiskTooltip />} cursor={{ fill: 'hsl(217 20% 18% / 0.3)' }} />
                <Bar dataKey="mean" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {riskCIData.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                  ))}
                  <ErrorBar dataKey="error" stroke="hsl(210 25% 75%)" strokeWidth={1.5} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        {/* Feature Importance */}
        <PanelCard delay={0.15}>
          <h3 className="font-heading text-xl text-foreground mb-2">Feature Importance</h3>
          <p className="text-muted-foreground text-xs mb-4">Which behavioral features drive segment differentiation</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ left: 15, right: 20 }}>
                <XAxis
                  type="number"
                  domain={[0, 0.45]}
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  width={120}
                  tick={{ fill: 'hsl(210 25% 85%)', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<FeatureTooltip />} cursor={{ fill: 'hsl(217 20% 18% / 0.3)' }} />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]} animationDuration={800}>
                  {featureImportance.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? 'hsl(0 72% 51%)' : i === 1 ? 'hsl(37 90% 44%)' : 'hsl(215 16% 47%)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        {/* What we rejected or demoted */}
        <PanelCard delay={0.2}>
          <h3 className="font-heading text-xl text-foreground mb-6">What We Rejected or Demoted</h3>
          <div className="space-y-4">
            {DATA.EVALUATION_LAYERS.filter(l => l.status !== 'Retained').map((l) => (
              <div key={l.layer} className="flex items-start gap-4">
                <span className="text-muted-foreground text-lg mt-0.5">{l.status === 'demo only' ? '◉' : '✗'}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground text-sm">{l.layer}</span>
                    <BadgePill variant={l.status === 'demo only' ? 'demo' : 'rejected'}>{l.status}</BadgePill>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{l.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <CrimsonDivider />

        {/* Core player archetypes */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Core Player Archetypes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATA.CROSS_VIEW_ARCHETYPES.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-panel-solid p-5"
              >
                <h4 className="text-foreground font-medium text-sm mb-2">{a.name}</h4>
                <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{a.coreStory}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary text-xs">{a.mainRisk}</span>
                  <span className="text-accent text-xs font-medium">{a.actionFamily}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hypothesis audit */}
        <CollapsibleDetail title="View full hypothesis audit">
          <div className="space-y-3">
            {DATA.HYPOTHESIS_AUDIT.map((h) => (
              <div key={h.id} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <span className="text-primary font-heading text-lg font-semibold w-10">{h.id}</span>
                <div className="flex-1">
                  <StatusBadge status={h.status} />
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{h.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleDetail>

        <CrimsonDivider />

        {/* What to do next */}
        <PanelCard>
          <h3 className="font-heading text-xl text-foreground mb-6">What To Do Next</h3>
          <div className="space-y-4">
            {[
              "Deploy behavioral segmentation on live account-level logs for automated risk scoring",
              "Collect linked survey data (with respondent-level keys) to enable true multi-view fusion",
              "Build monitoring dashboards tracking segment drift and risk distribution over time",
              "Pilot NBA strategies on a subset of at-risk accounts before full deployment",
              "Revisit H4 (public voice + behavior fusion) once temporally aligned data becomes available",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                className="flex items-start gap-3"
              >
                <span className="text-accent text-sm font-medium">{i + 1}.</span>
                <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </PanelCard>

        {/* Limitations */}
        <CollapsibleDetail title="View key limitations">
          <div className="space-y-2">
            {DATA.KEY_LIMITATIONS.map((l, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground text-xs mt-0.5">•</span>
                <p className="text-muted-foreground text-xs leading-relaxed">{l}</p>
              </div>
            ))}
          </div>
        </CollapsibleDetail>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="crimson-thread mx-auto w-32 mb-8"
          />
          <p className="font-heading text-3xl text-foreground mb-3">Case Complete</p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            The investigation is concluded. The evidence speaks for itself.
          </p>
        </motion.div>
      </div>
    </ChapterLayout>
  );
}
