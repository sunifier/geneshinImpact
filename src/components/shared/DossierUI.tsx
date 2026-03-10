import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  whyItMatters?: string;
  children?: ReactNode;
}

export function SectionHeader({ badge, title, subtitle, whyItMatters, children }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-10"
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="badge-chapter mb-3"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="chapter-title text-4xl md:text-5xl mt-3 mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg font-body max-w-3xl">{subtitle}</p>
      )}
      {whyItMatters && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary text-sm mt-4 italic font-body"
        >
          Why this matters: {whyItMatters}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}

export function PanelCard({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`glass-panel p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BadgePill({ variant, children }: { variant: 'retained' | 'demo' | 'rejected'; children: ReactNode }) {
  const cls = variant === 'retained' ? 'badge-retained' : variant === 'demo' ? 'badge-demo' : 'badge-rejected';
  return <span className={cls}>{children}</span>;
}

export function CrimsonDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8 }}
      className="crimson-thread my-12"
    />
  );
}

export function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  if (lower.includes('retained') || lower.includes('supported')) return <BadgePill variant="retained">{status}</BadgePill>;
  if (lower.includes('demo') || lower.includes('partial') || lower.includes('exploratory')) return <BadgePill variant="demo">{status}</BadgePill>;
  return <BadgePill variant="rejected">{status}</BadgePill>;
}

/** Collapsible detail panel — hides dense content behind a toggle */
export function CollapsibleDetail({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-panel overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/** Chapter takeaway block */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-6 border-l-2 border-l-accent mt-8"
    >
      <h3 className="font-heading text-xl text-foreground mb-2">Takeaway</h3>
      <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
}

/** Chapter intro / framing block */
export function ChapterIntro({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-foreground/80 text-base leading-relaxed mb-10 max-w-3xl"
    >
      {children}
    </motion.div>
  );
}
