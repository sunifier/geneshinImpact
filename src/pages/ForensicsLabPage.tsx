import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, ChapterIntro, Takeaway, CrimsonDivider } from '@/components/shared/DossierUI';

const gapHistogram = [
  { bin: '0-10', count: 45 }, { bin: '10-20', count: 35 }, { bin: '20-30', count: 28 },
  { bin: '30-50', count: 22 }, { bin: '50-80', count: 15 }, { bin: '80-120', count: 10 },
  { bin: '120-180', count: 8 }, { bin: '180-250', count: 5 }, { bin: '250-350', count: 4 },
  { bin: '350+', count: 3 },
];

const pullsHistogram = [
  { bin: '0-1', count: 40 }, { bin: '1-2', count: 48 }, { bin: '2-3', count: 30 },
  { bin: '3-5', count: 22 }, { bin: '5-8', count: 12 }, { bin: '8-12', count: 8 },
  { bin: '12-18', count: 15 }, { bin: '18-25', count: 5 }, { bin: '25+', count: 3 },
];

const segmentPie = [
  { name: 'Core Regulars', value: 72.57, fill: 'hsl(215 16% 47%)' },
  { name: 'At-Risk Drifters', value: 13.71, fill: 'hsl(0 72% 51%)' },
  { name: 'Burst Pullers', value: 9.14, fill: 'hsl(37 90% 44%)' },
  { name: 'Selective Regulars', value: 4.57, fill: 'hsl(210 25% 75%)' },
];

const HistTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="glass-panel-solid p-2 text-xs border border-border shadow-lg">
      <p className="text-foreground">{label}: {payload[0].value} accounts</p>
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="glass-panel-solid p-2 text-xs border border-border shadow-lg">
      <p className="text-foreground">{payload[0].name}: {payload[0].value}%</p>
    </div>
  );
};

export default function ForensicsLabPage() {
  return (
    <ChapterLayout chapterId="forensics-lab" onLogClue="Distribution patterns verified">
      <SectionHeader
        badge="Chapter V"
        title="Forensics Lab"
        subtitle="Distributions, outliers, and sanity checks on the raw evidence."
        whyItMatters="Before segmenting, we must understand the data's shape, range, and quality."
      />

      <ChapterIntro>
        The forensics lab examines the raw material before any modeling begins.
        What does the data look like? Where are the outliers? What structural patterns emerge before clustering?
      </ChapterIntro>

      <div className="space-y-10">
        <PanelCard>
          <h3 className="font-heading text-xl text-foreground mb-2">Distribution of max_gap_days</h3>
          <p className="text-muted-foreground text-xs mb-4">
            Heavily right-skewed — most accounts show moderate gaps, but a tail exhibits extended disappearances
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gapHistogram} margin={{ left: 5, right: 10, bottom: 5 }}>
                <XAxis
                  dataKey="bin"
                  tick={{ fill: 'hsl(210 25% 85%)', fontSize: 10 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <Tooltip content={<HistTooltip />} cursor={{ fill: 'hsl(217 20% 18% / 0.3)' }} />
                <Bar dataKey="count" radius={[3, 3, 0, 0]} animationDuration={800}>
                  {gapHistogram.map((_, i) => (
                    <Cell key={i} fill={i >= 7 ? 'hsl(0 72% 51%)' : 'hsl(210 25% 75% / 0.4)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            <span className="text-primary">Red</span> = high-gap tail (risk zone)
          </p>
        </PanelCard>

        <PanelCard delay={0.1}>
          <h3 className="font-heading text-xl text-foreground mb-2">Distribution of pulls_per_day</h3>
          <p className="text-muted-foreground text-xs mb-4">
            Right-skewed with a cluster of high-intensity "burst" accounts
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pullsHistogram} margin={{ left: 5, right: 10, bottom: 5 }}>
                <XAxis
                  dataKey="bin"
                  tick={{ fill: 'hsl(210 25% 85%)', fontSize: 10 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <Tooltip content={<HistTooltip />} cursor={{ fill: 'hsl(217 20% 18% / 0.3)' }} />
                <Bar dataKey="count" radius={[3, 3, 0, 0]} animationDuration={800}>
                  {pullsHistogram.map((_, i) => (
                    <Cell key={i} fill={i === 6 ? 'hsl(37 90% 44%)' : 'hsl(210 25% 75% / 0.4)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            <span className="text-accent">Gold</span> = burst-pull cluster
          </p>
        </PanelCard>

        <CrimsonDivider />

        <PanelCard delay={0.2}>
          <h3 className="font-heading text-xl text-foreground mb-2">Segment Mix</h3>
          <p className="text-muted-foreground text-xs mb-4">
            k=4, silhouette=0.337 — size distribution is imbalanced, with niche profiles representing key strategic populations
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-56 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={800}
                  >
                    {segmentPie.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} stroke="hsl(222 47% 6%)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {segmentPie.map(s => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.fill }} />
                  <span className="text-sm text-foreground flex-1">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </PanelCard>
      </div>

      <Takeaway>
        The data is clean but structurally imbalanced. Inactivity gaps and pull intensity are the primary axes of variation.
        These distributions justify the segmentation approach and inform the risk-scoring logic used downstream.
      </Takeaway>
    </ChapterLayout>
  );
}
