import { useDossierStore } from '@/stores/useDossierStore';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CHAPTERS } from '@/stores/useDossierStore';
import { Eye, Map, LogOut, Search } from 'lucide-react';

export default function DossierHUD() {
  const { viewMode, isShareMode, getProgress, loggedClues, isAuthenticated, logout, setViewMode } = useDossierStore();
  const { completed, total, pct } = getProgress();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-30 glass-panel rounded-none border-x-0 border-t-0 no-print"
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Title + Mode */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="font-heading text-sm text-foreground hover:text-primary transition-colors"
          >
            Silent Whale
          </button>
          <div className="h-4 w-px bg-border" />
          {!isShareMode && (
            <button
              onClick={() => setViewMode(viewMode === 'client' ? 'internal' : 'client')}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Eye className="w-3 h-3" />
              {viewMode === 'client' ? 'Client' : 'Internal'}
            </button>
          )}
        </div>

        {/* Center: Progress dots */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex gap-1.5">
            {CHAPTERS.filter(ch => !ch.internalOnly || viewMode === 'internal').map((ch) => {
              const isCompleted = useDossierStore.getState().isChapterCompleted(ch.id);
              const isUnlocked = useDossierStore.getState().isChapterUnlocked(ch.id);
              const isActive = location.pathname === ch.route;
              return (
                <button
                  key={ch.id}
                  onClick={() => isUnlocked && navigate(ch.route)}
                  disabled={!isUnlocked}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-primary scale-150 shadow-[0_0_6px_hsl(0_72%_51%_/_0.5)]' :
                    isCompleted ? 'bg-accent' :
                    isUnlocked ? 'bg-muted-foreground/40' :
                    'bg-muted-foreground/15'
                  }`}
                  title={ch.title}
                />
              );
            })}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {completed}/{total}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-1.5">
            <Search className="w-3 h-3 text-accent" /> {loggedClues.length} clues
          </span>
          <button
            onClick={() => navigate('/evidence')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Evidence Board"
          >
            <Map className="w-4 h-4" />
          </button>
          {!isShareMode && (
          <button
            onClick={() => {
              window.localStorage.removeItem("silent-whale-share");
              logout();
              navigate('/');
            }}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-muted">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, hsl(var(--crimson)), hsl(var(--orichalcum)))' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.header>
  );
}
