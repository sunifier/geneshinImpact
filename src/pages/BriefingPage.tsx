import { motion } from 'framer-motion';
import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, BadgePill, CrimsonDivider, ChapterIntro } from '@/components/shared/DossierUI';
import { DATA } from '@/data/dossierData';
import { useNavigate } from 'react-router-dom';
import { ElectroIcon, HydroIcon, DendroIcon, PyroIcon } from '@/components/GenshinIcons';

const INTAKE_ITEMS = [
  { val: DATA.N_ACCOUNTS.toLocaleString(), label: 'Accounts Analyzed', icon: <ElectroIcon size={16} color="hsl(270 50% 60%)" />, color: 'text-accent' },
  { val: DATA.N_REVIEWS.toLocaleString(), label: 'Reviews Processed', icon: <HydroIcon size={16} color="hsl(210 60% 60%)" />, color: 'text-accent' },
  { val: DATA.N_SURVEY, label: 'Survey Respondents', icon: <DendroIcon size={16} color="hsl(150 60% 45%)" />, color: 'text-accent' },
  { val: '4', label: 'Analytical Lenses', icon: <PyroIcon size={16} color="hsl(0 72% 51%)" />, color: 'text-accent' },
];

export default function BriefingPage() {
  const navigate = useNavigate();

  return (
    <ChapterLayout chapterId="briefing" onLogClue="Mission parameters received">
      {/* Hero */}
      <div className="text-center py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
          <span className="badge-chapter mb-4">Chapter I</span>
          <h1 className="chapter-title text-5xl md:text-6xl mt-4 mb-4">Opening Briefing</h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="crimson-thread mx-auto w-32 mb-8"
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            An evidence-driven segmentation triangulating behavior, public voice, survey data, and game system incentives to understand player engagement, risk, and motivation in Genshin Impact.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => navigate('/case-brief')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 text-sm font-medium tracking-wide transition-all hover:shadow-[0_0_20px_hsl(0_72%_51%_/_0.3)]"
          >
            Start Investigation
          </button>
          <button
            onClick={() => navigate('/verdict')}
            className="border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-lg px-6 py-3 text-sm transition-colors"
          >
            View Final Verdict
          </button>
        </motion.div>
      </div>

      <CrimsonDivider />

      {/* Dataset summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <PanelCard className="mb-10">
          <h3 className="font-heading text-xl text-foreground mb-6">Evidence Intake Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {INTAKE_ITEMS.map(({ val, label, icon, color }) => (
              <div key={label}>
                <div className={`text-3xl font-heading ${color}`}>{val}</div>
                <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1.5">
                  {icon} {label}
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      </motion.div>

      {/* Method Boundary Panel */}
      <SectionHeader
        title="Case Status & Method Boundaries"
        whyItMatters="Not all analytical layers carry equal evidential weight. This hierarchy governs every conclusion in the dossier."
      />

      <div className="grid gap-4">
        {DATA.EVALUATION_LAYERS.map((layer, i) => (
          <motion.div
            key={layer.layer}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <PanelCard className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-foreground font-medium text-sm">{layer.layer}</span>
                  <BadgePill variant={layer.status === 'Retained' ? 'retained' : layer.status === 'demo only' ? 'demo' : 'rejected'}>
                    {layer.status}
                  </BadgePill>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{layer.reason}</p>
              </div>
            </PanelCard>
          </motion.div>
        ))}
      </div>

      <CrimsonDivider />

      {/* Hypothesis Status */}
      <SectionHeader title="Hypothesis Status" />
      <div className="grid gap-3">
        {DATA.HYPOTHESIS_AUDIT.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <PanelCard className="flex items-start gap-4">
              <span className="text-primary font-heading text-lg font-semibold w-10">{h.id}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <BadgePill variant={
                    h.status.includes('Supported') ? 'retained' :
                    h.status.includes('Partially') ? 'demo' : 'rejected'
                  }>
                    {h.status}
                  </BadgePill>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{h.evidence}</p>
              </div>
            </PanelCard>
          </motion.div>
        ))}
      </div>
    </ChapterLayout>
  );
}
