import ChapterLayout from '@/components/ChapterLayout';
import { SectionHeader, PanelCard, CrimsonDivider, ChapterIntro, Takeaway, CollapsibleDetail } from '@/components/shared/DossierUI';
import { Check } from 'lucide-react';

const FEATURES = ['pulls/day', 'max_gap', 'mean_gap', '5★ rate', 'banner_div'];
const CORR: number[][] = [
  [1, -0.31, -0.25, 0.12, 0.18],
  [-0.31, 1, 0.72, -0.08, -0.15],
  [-0.25, 0.72, 1, -0.05, -0.11],
  [0.12, -0.08, -0.05, 1, 0.22],
  [0.18, -0.15, -0.11, 0.22, 1],
];

const GAP_FEATURES = ['max_gap', 'mean_gap', 'span_days', 'active_days'];
const GAP_CORR: number[][] = [
  [1, 0.72, 0.45, -0.38],
  [0.72, 1, 0.31, -0.29],
  [0.45, 0.31, 1, 0.62],
  [-0.38, -0.29, 0.62, 1],
];

function HeatmapCell({ value }: { value: number }) {
  const abs = Math.abs(value);
  const bg = value > 0
    ? `hsl(0 72% 51% / ${abs * 0.8})`
    : `hsl(210 50% 50% / ${abs * 0.8})`;
  return (
    <div
      className="aspect-square flex items-center justify-center rounded text-foreground transition-transform hover:scale-110"
      style={{ background: bg }}
      title={value.toFixed(2)}
    >
      <span className="text-[10px] font-mono">{value.toFixed(2)}</span>
    </div>
  );
}

export default function DiagnosticsPage() {
  return (
    <ChapterLayout chapterId="diagnostics" onLogClue="Diagnostics reviewed">
      <SectionHeader
        badge="Internal Only"
        title="Diagnostics"
        subtitle="Correlation checks, feature dependencies, and analytical sanity."
        whyItMatters="Ensures that segmentation structure is not an artifact of feature redundancy or data quirks."
      />

      <ChapterIntro>
        This diagnostic chapter tests whether the segmentation findings are structurally robust
        or artifacts of collinear features, sample imbalance, or other data-quality issues.
      </ChapterIntro>

      <div className="space-y-10">
        {/* Feature Correlation Heatmap */}
        <PanelCard>
          <h3 className="font-heading text-xl text-foreground mb-2">Feature Correlation Heatmap</h3>
          <p className="text-muted-foreground text-xs mb-6">
            Hover cells for exact values · <span className="text-primary">Red = positive</span> · <span style={{ color: 'hsl(210 50% 50%)' }}>Blue = negative</span>
          </p>
          <div className="max-w-md mx-auto">
            {/* Column labels */}
            <div className="grid gap-1.5 mb-1" style={{ gridTemplateColumns: `80px repeat(${FEATURES.length}, 1fr)` }}>
              <div />
              {FEATURES.map(f => (
                <div key={f} className="text-center text-[9px] text-muted-foreground truncate">{f}</div>
              ))}
            </div>
            {/* Rows */}
            {CORR.map((row, ri) => (
              <div key={ri} className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: `80px repeat(${FEATURES.length}, 1fr)` }}>
                <div className="flex items-center text-[10px] text-muted-foreground">{FEATURES[ri]}</div>
                {row.map((val, ci) => (
                  <HeatmapCell key={ci} value={val} />
                ))}
              </div>
            ))}
          </div>
        </PanelCard>

        <CrimsonDivider />

        {/* Gap-Related Heatmap */}
        <PanelCard delay={0.1}>
          <h3 className="font-heading text-xl text-foreground mb-2">Gap-Related Diagnostics Heatmap</h3>
          <p className="text-muted-foreground text-xs mb-6">
            max_gap and mean_gap correlate (r ≈ 0.72) but capture different inactivity aspects
          </p>
          <div className="max-w-sm mx-auto">
            <div className="grid gap-1.5 mb-1" style={{ gridTemplateColumns: `80px repeat(${GAP_FEATURES.length}, 1fr)` }}>
              <div />
              {GAP_FEATURES.map(f => (
                <div key={f} className="text-center text-[9px] text-muted-foreground truncate">{f}</div>
              ))}
            </div>
            {GAP_CORR.map((row, ri) => (
              <div key={ri} className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: `80px repeat(${GAP_FEATURES.length}, 1fr)` }}>
                <div className="flex items-center text-[10px] text-muted-foreground">{GAP_FEATURES[ri]}</div>
                {row.map((val, ci) => (
                  <HeatmapCell key={ci} value={val} />
                ))}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6 leading-relaxed text-center">
            Both gap features carry unique structural information despite moderate correlation.
          </p>
        </PanelCard>

        <CollapsibleDetail title="View all diagnostic findings">
          <div className="space-y-3">
            {[
              "No single feature removal collapses the segmentation structure entirely",
              "max_gap_days is the most influential feature for segment separation",
              "pulls_per_day removal causes the largest drop in silhouette quality",
              "banner_diversity contributes moderate but non-redundant signal",
              "Downsampled Kruskal-Wallis tests remain significant in 100% of runs",
              "Feature ablation confirms both gap features carry unique structural information",
            ].map((finding, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/80 text-xs leading-relaxed">{finding}</p>
              </div>
            ))}
          </div>
        </CollapsibleDetail>
      </div>

      <Takeaway>
        The segmentation structure is not an artifact. Feature ablation, downsampled significance testing,
        and correlation analysis confirm that the retained segments reflect genuine structural patterns in the data.
      </Takeaway>
    </ChapterLayout>
  );
}
