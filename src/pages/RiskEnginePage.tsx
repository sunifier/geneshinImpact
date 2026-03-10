import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, CrimsonDivider, ChapterIntro, Takeaway } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { PyroIcon } from '@/components/GenshinIcons';

const RISK_COLORS: Record<string, string> = {
  'At-Risk Drifters': 'hsl(0 72% 51%)',
  'Burst Pullers': 'hsl(37 90% 44%)',
  'Selective Regulars': 'hsl(210 25% 65%)',
  'Core Regulars': 'hsl(215 16% 47%)',
};

const riskData = [
  { name: 'At-Risk Drifters', pct: 13.71, risk: 100 },
  { name: 'Burst Pullers', pct: 9.14, risk: 65 },
  { name: 'Selective Regulars', pct: 4.57, risk: 30 },
  { name: 'Core Regulars', pct: 72.57, risk: 15 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-border shadow-lg">
      <p className="text-foreground font-medium mb-1">{d.name}</p>
      <p className="text-muted-foreground">{d.pct}% of accounts</p>
      <p className="text-primary">Relative risk: {d.risk}%</p>
    </div>
  );
};

export default function RiskEnginePage() {
  const drifters = DATA.BEHAVIOR_SEGMENTS.find(s => s.name === 'At-Risk Drifters')!;

  return (
    <ChapterLayout chapterId="risk-engine" onLogClue="Risk priorities established">
      <SectionHeader
        badge="Chapter VII"
        title="Risk Engine"
        subtitle="Which players are most at risk — and what drives that risk?"
        whyItMatters="Identifying the highest-risk segment enables targeted, proportionate intervention."
      />

      <ChapterIntro>
        Not all players carry equal disengagement risk. This chapter ranks segments by structural vulnerability
        and identifies the behavioral features that define the boundary between stable and drift-prone accounts.
      </ChapterIntro>

      <div className="space-y-10">
        {/* Highest risk callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <PanelCard className="border-primary/30 crimson-glow">
            <div className="flex items-start gap-5">
              <div className="mt-1">
                <PyroIcon size={40} color="hsl(0 72% 51%)" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-primary mb-2">Highest Risk: {drifters.name}</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">{drifters.interpretation}</p>
                <p className="text-muted-foreground text-xs mt-3">{drifters.signature}</p>
              </div>
            </div>
          </PanelCard>
        </motion.div>

        {/* Interactive Risk Ranking Bar Chart */}
        <PanelCard delay={0.1}>
          <h3 className="font-heading text-xl text-foreground mb-2">Behavioral Risk Ranking</h3>
          <p className="text-muted-foreground text-xs mb-6">Relative disengagement risk by segment — hover for details</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical" margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
                <XAxis
                  type="number"
                  domain={[0, 110]}
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={130}
                  tick={{ fill: 'hsl(210 25% 85%)', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(217 20% 18% / 0.3)' }} />
                <Bar dataKey="risk" radius={[0, 6, 6, 0]} animationDuration={1000}>
                  {riskData.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <CrimsonDivider />

        {/* Risk drivers */}
        <PanelCard delay={0.2}>
          <h3 className="font-heading text-xl text-foreground mb-4">Key Risk Drivers</h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Inactivity gaps and pull intensity are the primary behavioral markers of disengagement risk.
            These features define the structural boundary between stable and drift-prone segments.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel-solid p-5 text-center">
              <code className="text-primary text-sm">max_gap_days</code>
              <p className="text-xs text-muted-foreground mt-2">Primary disengagement signal</p>
            </div>
            <div className="glass-panel-solid p-5 text-center">
              <code className="text-accent text-sm">pulls_per_day</code>
              <p className="text-xs text-muted-foreground mt-2">Activity intensity marker</p>
            </div>
          </div>
        </PanelCard>
      </div>

      <Takeaway>
        <p>
          Risk is not uniformly distributed. The At-Risk Drifters segment represents 13.7% of accounts but concentrates
          the highest behavioral disengagement risk. This ranking informs deployment priority and communication strategy.
        </p>
        <p className="text-primary text-xs mt-3 italic">
          Note: Risk scoring is descriptive, not causal. It identifies structural patterns, not individual predictions.
        </p>
      </Takeaway>
    </ChapterLayout>
  );
}
