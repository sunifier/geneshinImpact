import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, BadgePill, CrimsonDivider, ChapterIntro, Takeaway, CollapsibleDetail } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { useDossierStore } from '@/stores/useDossierStore';
import { playCardReveal } from '@/lib/sounds';

const BEHAVIOR_COLORS = [
  'hsl(215 16% 47%)',   // Core Regulars - muted
  'hsl(37 90% 44%)',    // Burst Pullers - orichalcum
  'hsl(210 25% 75%)',   // Selective Regulars - parchment
  'hsl(0 72% 51%)',     // At-Risk Drifters - crimson
];

const SURVEY_COLORS = [
  'hsl(210 25% 75%)',
  'hsl(0 72% 51%)',
  'hsl(37 90% 44%)',
  'hsl(150 60% 40%)',
  'hsl(0 60% 40%)',
  'hsl(215 40% 55%)',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-border shadow-lg">
      <p className="text-foreground font-medium mb-1">{d.name}</p>
      <p className="text-muted-foreground">{d.sharePct}% of population</p>
    </div>
  );
};

export default function SegmentationPage() {
  const [activeTab, setActiveTab] = useState<'behavior' | 'survey'>('behavior');
  const [selectedSeg, setSelectedSeg] = useState(0);
  const [revealed, setRevealed] = useState(true);
  const { viewMode } = useDossierStore();

  const segments = activeTab === 'behavior' ? DATA.BEHAVIOR_SEGMENTS : DATA.SURVEY_SEGMENTS;
  const current = segments[selectedSeg] || segments[0];
  const colors = activeTab === 'behavior' ? BEHAVIOR_COLORS : SURVEY_COLORS;

  const donutData = segments.map((s) => ({
    name: s.name,
    sharePct: s.sharePct,
    value: s.sharePct,
  }));

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => {
      setRevealed(true);
      playCardReveal();
    }, 100);
    return () => clearTimeout(t);
  }, [selectedSeg, activeTab]);

  return (
    <ChapterLayout chapterId="segmentation" onLogClue="Player archetypes identified">
      <SectionHeader
        badge="Chapter VI"
        title="Segmentation Room"
        subtitle="Retained player archetypes from behavioral and survey analysis."
        whyItMatters="These segments define the analytical foundation for all risk, deployment, and strategy decisions."
      />

      <ChapterIntro>
        Two independent segmentation layers — behavioral and survey — each reveal distinct player archetypes.
        Both are retained as valid analytical contributions. Explore each segment to understand its signature, risk profile, and recommended approach.
      </ChapterIntro>

      {/* Tab selector */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => { setActiveTab('behavior'); setSelectedSeg(0); }}
          className={`px-5 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
            activeTab === 'behavior'
              ? 'bg-primary/15 text-primary border border-primary/30'
              : 'glass-panel text-muted-foreground hover:text-foreground'
          }`}
        >
          Behavior Segments <BadgePill variant="retained">Retained</BadgePill>
        </button>
        <button
          onClick={() => { setActiveTab('survey'); setSelectedSeg(0); }}
          className={`px-5 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
            activeTab === 'survey'
              ? 'bg-primary/15 text-primary border border-primary/30'
              : 'glass-panel text-muted-foreground hover:text-foreground'
          }`}
        >
          Survey Segments <BadgePill variant="retained">Retained</BadgePill>
        </button>
      </div>

      {/* Donut Chart */}
      <PanelCard className="mb-8">
        <h3 className="font-heading text-xl text-foreground mb-2">Segment Size Distribution</h3>
        <p className="text-muted-foreground text-xs mb-4">
          {activeTab === 'behavior' ? `${DATA.N_ACCOUNTS} accounts` : `${DATA.N_SURVEY} respondents`} — click a segment to explore
        </p>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  onClick={(_, index) => setSelectedSeg(index)}
                  style={{ cursor: 'pointer' }}
                  animationDuration={800}
                >
                  {donutData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      stroke="hsl(222 47% 6%)"
                      strokeWidth={2}
                      opacity={index === selectedSeg ? 1 : 0.6}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {segments.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setSelectedSeg(i)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                  i === selectedSeg ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/30'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: colors[i % colors.length] }}
                />
                <span className="text-sm text-foreground flex-1">{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.sharePct}%</span>
              </button>
            ))}
          </div>
        </div>
      </PanelCard>

      {/* Segment stepper */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {segments.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setSelectedSeg(i)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              i === selectedSeg
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_hsl(0_72%_51%_/_0.15)]'
                : 'glass-panel-solid text-muted-foreground hover:text-foreground'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Hero card */}
      <AnimatePresence mode="wait">
        {revealed && (
          <motion.div
            key={current.name + activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <PanelCard className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-heading text-3xl text-foreground">{current.name}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {activeTab === 'behavior' ? 'Behavior View' : 'Survey View'} — {current.sharePct}% of population
                  </span>
                </div>
                <BadgePill variant="retained">Retained</BadgePill>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Signature</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed">{current.signature}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Main Risk</h4>
                  <p className="text-primary text-sm leading-relaxed">{current.mainRisk}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Interpretation</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed">{current.interpretation}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recommended Use</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed">{current.recommendedUse}</p>
                </div>
              </div>

              {/* Share bar */}
              <div className="mt-8">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: colors[selectedSeg % colors.length] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${current.sharePct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">{current.sharePct}% of population</span>
              </div>

              {/* Survey-specific metrics */}
              {activeTab === 'survey' && 'avgMotivation' in current && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="glass-panel-solid p-4 text-center">
                    <div className="text-2xl font-heading text-accent">{(current as any).avgMotivation.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Motivation</div>
                  </div>
                  <div className="glass-panel-solid p-4 text-center">
                    <div className="text-2xl font-heading text-primary">{(current as any).avgBreakLikelihood.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Break Risk</div>
                  </div>
                  <div className="glass-panel-solid p-4 text-center">
                    <div className="text-2xl font-heading text-foreground">{(current as any).avgDisengagementRisk.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Disengage Risk</div>
                  </div>
                </div>
              )}
            </PanelCard>
          </motion.div>
        )}
      </AnimatePresence>

      <CrimsonDivider />

      {/* Summary table — collapsible */}
      <CollapsibleDetail title={`View all ${activeTab === 'behavior' ? 'behavior' : 'survey'} segments summary table`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <th className="text-left py-2 pr-4">Segment</th>
              <th className="text-right py-2 pr-4">Share</th>
              <th className="text-left py-2">Main Risk</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((s) => (
              <tr key={s.name} className="border-b border-border/50">
                <td className="py-2 pr-4 text-foreground">{s.name}</td>
                <td className="py-2 pr-4 text-right text-muted-foreground">{s.sharePct}%</td>
                <td className="py-2 text-primary text-xs">{s.mainRisk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleDetail>

      <Takeaway>
        Both segmentation layers are independently retained. Behavioral segments capture observable activity patterns,
        while survey segments add the invisible dimension of private motivation, break propensity, and communication preferences.
        Together, they form the basis for cross-view synthesis in the next chapter.
      </Takeaway>
    </ChapterLayout>
  );
}
