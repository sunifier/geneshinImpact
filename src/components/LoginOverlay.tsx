import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDossierStore } from '@/stores/useDossierStore';
import type { ViewMode } from '@/data/dossierData';
import { playConfirm, playChapterTransition } from '@/lib/sounds';

export default function LoginOverlay() {
  const { isAuthenticated, authenticate, setViewMode } = useDossierStore();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [step, setStep] = useState<'code' | 'mode'>('code');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticate(code)) {
      playChapterTransition();
      setStep('mode');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleModeSelect = (mode: ViewMode) => {
    playConfirm();
    setViewMode(mode);
  };

  if (isAuthenticated && step === 'mode') return null;
  if (isAuthenticated) return null;

  return (
    <AnimatePresence>
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'hsl(222 47% 4% / 0.97)' }}
        >
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 5 === 0
                    ? 'hsl(var(--crimson) / 0.3)'
                    : 'hsl(var(--parchment) / 0.12)',
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  y: [0, -30],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-panel p-10 max-w-md w-full mx-4 relative"
          >
            <AnimatePresence mode="wait">
              {step === 'code' ? (
                <motion.div key="code" exit={{ opacity: 0, y: -10 }}>
                  <div className="text-center mb-10">
                    <h1 className="chapter-title text-3xl mb-3">Silent Whale</h1>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="crimson-thread mx-auto w-24 mb-4"
                    />
                    <p className="text-muted-foreground text-sm tracking-[0.15em] uppercase">
                      Quest Dossier
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                        Access Code
                      </label>
                      <input
                        type="password"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); setError(false); }}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Enter access code"
                        autoFocus
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-primary text-xs mt-2"
                        >
                          Invalid access code. Try again.
                        </motion.p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 text-sm font-medium tracking-wider uppercase transition-all hover:shadow-[0_0_20px_hsl(0_72%_51%_/_0.3)]"
                    >
                      Authenticate
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="mode"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h2 className="chapter-title text-2xl mb-3">Access Granted</h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className="crimson-thread mx-auto w-16 mb-8"
                  />
                  <p className="text-muted-foreground text-sm mb-8">
                    Select your viewing mode
                  </p>

                  <div className="grid gap-4">
                    <button
                      onClick={() => handleModeSelect('client')}
                      className="glass-panel p-6 text-left hover:border-primary/50 transition-all group hover:shadow-[0_0_20px_hsl(0_72%_51%_/_0.1)]"
                    >
                      <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        Client View
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Executive presentation — narrative, visual, conclusion-first
                      </p>
                    </button>

                    <button
                      onClick={() => handleModeSelect('internal')}
                      className="glass-panel p-6 text-left hover:border-accent/50 transition-all group hover:shadow-[0_0_20px_hsl(37_90%_44%_/_0.1)]"
                    >
                      <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                        Internal View
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Full diagnostic access — validation, statistics, synthetic hybrid appendix
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
