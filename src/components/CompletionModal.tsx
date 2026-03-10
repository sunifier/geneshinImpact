import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDossierStore } from '@/stores/useDossierStore';
import { playCompletion } from '@/lib/sounds';
import { VisionIcon } from '@/components/GenshinIcons';

export default function CompletionModal() {
  const { getProgress, loggedClues } = useDossierStore();
  const { completed, total } = getProgress();
  const navigate = useNavigate();
  const played = useRef(false);
  const [dismissed, setDismissed] = useState(false);

  const isComplete = completed >= total && total > 0;

  useEffect(() => {
    if (isComplete && !played.current) {
      played.current = true;
      playCompletion();
    }
  }, [isComplete]);

  if (!isComplete || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md no-print"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-panel-solid border-primary/30 crimson-glow max-w-lg w-full mx-4 p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-primary/50 flex items-center justify-center"
            style={{ background: 'hsl(var(--crimson) / 0.1)' }}
          >
            <VisionIcon size={36} color="hsl(0 72% 51%)" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-heading text-3xl text-foreground mb-3"
          >
            Case Completed
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="crimson-thread mx-auto w-24 mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground text-sm leading-relaxed mb-2"
          >
            All {completed} chapters investigated. {loggedClues.length} clues collected.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-foreground/70 text-xs leading-relaxed mb-8"
          >
            The Silent Whale dossier is complete. Every hypothesis tested, every layer evaluated,
            every integration strategy assessed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => setDismissed(true)}
              className="px-6 py-2.5 rounded-lg text-sm glass-panel text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue Exploring
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 rounded-lg text-sm glass-panel text-muted-foreground hover:text-foreground transition-colors"
            >
              Print Dossier
            </button>
            <button
              onClick={() => { setDismissed(true); navigate('/verdict'); }}
              className="px-6 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: 'hsl(var(--crimson) / 0.15)',
                color: 'hsl(var(--crimson))',
                border: '1px solid hsl(var(--crimson) / 0.3)',
              }}
            >
              Go to Verdict
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
