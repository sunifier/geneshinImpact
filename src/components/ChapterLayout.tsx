import { ReactNode, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDossierStore, type ChapterId, CHAPTERS } from '@/stores/useDossierStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChapterTransition from './ChapterTransition';
import { playClueLogged, playChapterUnlocked, playConfirm } from '@/lib/sounds';

interface ChapterLayoutProps {
  chapterId: ChapterId;
  children: ReactNode;
  onLogClue?: string;
}

export default function ChapterLayout({ chapterId, children, onLogClue }: ChapterLayoutProps) {
  const { completeChapter, isChapterCompleted, logClue, setCurrentChapter } = useDossierStore();
  const navigate = useNavigate();
  const chapter = CHAPTERS.find(c => c.id === chapterId)!;
  const visibleChapters = useDossierStore.getState().getVisibleChapters();
  const nextChapter = visibleChapters.find(c => c.order > chapter.order && useDossierStore.getState().isChapterUnlocked(c.id));
  const prevChapter = visibleChapters.filter(c => c.order < chapter.order).pop();

  const [showTransition, setShowTransition] = useState(false);
  const [pendingNav, setPendingNav] = useState<string | null>(null);

  useEffect(() => {
    setCurrentChapter(chapterId);
  }, [chapterId, setCurrentChapter]);

  const handleComplete = useCallback(() => {
    const wasCompleted = isChapterCompleted(chapterId);
    completeChapter(chapterId);
    if (onLogClue) {
      logClue(onLogClue);
      playClueLogged();
      toast.success(`Evidence recorded`, {
        description: onLogClue,
        className: 'font-body',
      });
    }
    if (!wasCompleted) {
      playChapterUnlocked();
      toast('New route unlocked', {
        description: 'Continue your investigation',
        className: 'font-body',
      });
    }
  }, [chapterId, completeChapter, isChapterCompleted, logClue, onLogClue]);

  const handleContinue = useCallback(() => {
    handleComplete();
    if (nextChapter) {
      playConfirm();
      setPendingNav(nextChapter.route);
      setShowTransition(true);
    }
  }, [handleComplete, nextChapter]);

  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false);
    if (pendingNav) {
      navigate(pendingNav);
      setPendingNav(null);
    }
  }, [navigate, pendingNav]);

  const nextChapterMeta = nextChapter ? CHAPTERS.find(c => c.route === nextChapter.route) : null;

  return (
    <>
      <ChapterTransition
        show={showTransition}
        chapterTitle={nextChapterMeta?.title || ''}
        chapterSubtitle={nextChapterMeta?.subtitle}
        chapterId={nextChapterMeta?.id}
        onComplete={handleTransitionComplete}
      />

      <div className="min-h-screen pt-20 pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {children}
          </motion.div>

          {/* Chapter navigation footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 pt-8 border-t border-border flex items-center justify-between"
          >
            {prevChapter ? (
              <button
                onClick={() => navigate(prevChapter.route)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                {prevChapter.title}
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              {!isChapterCompleted(chapterId) && onLogClue && (
                <button
                  onClick={handleComplete}
                  className="text-xs border border-border rounded-lg px-4 py-2 text-muted-foreground hover:border-accent hover:text-accent transition-all hover:shadow-[0_0_12px_hsl(37_90%_44%_/_0.2)]"
                >
                  Log Evidence
                </button>
              )}
              {nextChapter && (
                <button
                  onClick={handleContinue}
                  className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2.5 font-medium tracking-wide transition-all hover:shadow-[0_0_20px_hsl(0_72%_51%_/_0.3)] group flex items-center gap-2"
                >
                  Continue
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  {nextChapter.title}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
