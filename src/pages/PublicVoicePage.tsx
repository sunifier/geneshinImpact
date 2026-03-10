import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis, CartesianGrid } from 'recharts';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, CrimsonDivider, ChapterIntro, Takeaway, CollapsibleDetail } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';

const bubbleData = DATA.TOPICS.map(t => ({
  name: DATA.TOPIC_LABELS[t.id],
  x: t.share * 100,
  y: t.negRate * 100,
  z: t.n,
  lift: t.negLift,
  isHigh: t.negLift > 1,
}));

const barData = DATA.TOPICS
  .slice()
  .sort((a, b) => b.negLift - a.negLift)
  .map(t => ({
    name: DATA.TOPIC_LABELS[t.id],
    lift: t.negLift,
    isHigh: t.negLift > 1,
  }));

const BubbleTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-border shadow-lg max-w-[200px]">
      <p className="text-foreground font-medium mb-1">{d.name}</p>
      <p className="text-muted-foreground">Share: {d.x.toFixed(1)}%</p>
      <p className="text-muted-foreground">Neg rate: {d.y.toFixed(1)}%</p>
      <p className="text-muted-foreground">Reviews: {d.z.toLocaleString()}</p>
      <p className={d.isHigh ? 'text-primary' : 'text-accent'}>Neg lift: {d.lift.toFixed(2)}×</p>
    </div>
  );
};

const BarTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-border shadow-lg">
      <p className="text-foreground font-medium mb-1">{d.name}</p>
      <p className={d.isHigh ? 'text-primary' : 'text-accent'}>{d.lift.toFixed(3)}× negative lift</p>
    </div>
  );
};

export default function PublicVoicePage() {
  const highPressure = DATA.TOPICS.filter(t => t.negLift > 1);
  const lowPressure = DATA.TOPICS.filter(t => t.negLift <= 1);

  return (
    <ChapterLayout chapterId="public-voice" onLogClue="Topic pressure patterns mapped">
      <SectionHeader
        badge="Chapter VIII"
        title="Public Voice"
        subtitle="Topic pressure, sentiment concentration, and the echo-effect."
        whyItMatters="Public reviews amplify specific friction points rather than representing a balanced cross-section of player experience."
      />

      <ChapterIntro>
        The public voice layer examines {DATA.N_REVIEWS.toLocaleString()} app store reviews through NLP topic extraction.
        The key finding is not what players say — but which topics disproportionately attract negative sentiment.
      </ChapterIntro>

      <div className="space-y-10">
        {/* Echo effect callout */}
        <PanelCard>
          <h3 className="font-heading text-xl text-foreground mb-4">The Echo Effect</h3>
          <p className="text-foreground/80 text-sm leading-relaxed">
            H2 is <span className="text-primary font-medium">supported</span>: public review discourse is thematically polarized.
            Certain topics disproportionately concentrate negative sentiment, while others are almost exclusively positive.
          </p>
        </PanelCard>

        {/* Topic Pressure Bubble Chart */}
        <PanelCard delay={0.1}>
          <h3 className="font-heading text-xl text-foreground mb-2">Topic Pressure Map</h3>
          <p className="text-muted-foreground text-xs mb-4">Bubble size = review count · X = topic share · Y = negative rate — hover for details</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 20% 18%)" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Share %"
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  label={{ value: 'Topic Share %', position: 'bottom', fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Neg Rate %"
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  label={{ value: 'Neg Rate %', angle: -90, position: 'insideLeft', fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                />
                <ZAxis type="number" dataKey="z" range={[80, 600]} />
                <Tooltip content={<BubbleTooltip />} />
                <Scatter data={bubbleData} animationDuration={800}>
                  {bubbleData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.isHigh ? 'hsl(0 72% 51%)' : 'hsl(37 90% 44%)'}
                      fillOpacity={0.7}
                      stroke={entry.isHigh ? 'hsl(0 72% 60%)' : 'hsl(37 90% 55%)'}
                      strokeWidth={1}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-muted-foreground justify-center">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> High pressure</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Low pressure</span>
          </div>
        </PanelCard>

        <CrimsonDivider />

        {/* Negative Lift Bar Chart */}
        <PanelCard delay={0.15}>
          <h3 className="font-heading text-xl text-foreground mb-2">Negative Lift by Topic</h3>
          <p className="text-muted-foreground text-xs mb-4">Values above 1.0 indicate disproportionate negative concentration</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis
                  type="number"
                  tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(217 20% 18%)' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={160}
                  tick={{ fill: 'hsl(210 25% 85%)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<BarTooltip />} cursor={{ fill: 'hsl(217 20% 18% / 0.3)' }} />
                <Bar dataKey="lift" radius={[0, 4, 4, 0]} animationDuration={800}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.isHigh ? 'hsl(0 72% 51%)' : 'hsl(37 90% 44%)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        {/* High pressure detail cards */}
        <CollapsibleDetail title={`View high-pressure topic details (${highPressure.length} topics)`}>
          <div className="space-y-4">
            {highPressure.map((t) => (
              <div key={t.id} className="glass-panel-solid p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-foreground text-sm font-medium">{DATA.TOPIC_LABELS[t.id]}</h4>
                  <span className="text-primary text-xs font-mono">{t.negLift.toFixed(2)}× lift</span>
                </div>
                <p className="text-muted-foreground text-xs">Top terms: {t.topTerms}</p>
                <p className="text-muted-foreground text-xs mt-1">{t.n.toLocaleString()} reviews · {(t.negRate * 100).toFixed(1)}% negative</p>
              </div>
            ))}
          </div>
        </CollapsibleDetail>

        <CollapsibleDetail title={`View low-pressure topics (${lowPressure.length} predominantly positive)`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowPressure.map((t) => (
              <div key={t.id} className="glass-panel-solid p-3">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-foreground text-xs font-medium">{DATA.TOPIC_LABELS[t.id]}</h4>
                  <span className="text-accent text-xs font-mono">{t.negLift.toFixed(2)}×</span>
                </div>
                <p className="text-muted-foreground text-xs">{t.topTerms}</p>
              </div>
            ))}
          </div>
        </CollapsibleDetail>
      </div>

      <Takeaway>
        Technical complaints (shader compilation, performance) and UX friction (dialogue skip buttons) are the most overrepresented
        sources of negative sentiment. Meanwhile, fun, open-world appreciation, and character attachment topics are overwhelmingly positive.
        This asymmetry reflects frustration concentration, not overall dissatisfaction.
      </Takeaway>
    </ChapterLayout>
  );
}
