import { create } from 'zustand';
import type { ViewMode } from '@/data/dossierData';

export type ChapterId =
  | 'prologue' | 'briefing' | 'evidence-board' | 'case-brief'
  | 'evidence-intake' | 'forensics-lab' | 'segmentation' | 'risk-engine'
  | 'public-voice' | 'cross-view' | 'deployment' | 'verdict'
  | 'validation' | 'diagnostics';

export interface ChapterMeta {
  id: ChapterId;
  title: string;
  subtitle: string;
  route: string;
  internalOnly: boolean;
  order: number;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'prologue', title: 'Prologue', subtitle: 'The World of Teyvat', route: '/', internalOnly: false, order: 0 },
  { id: 'briefing', title: 'Opening Briefing', subtitle: 'Mission Parameters', route: '/briefing', internalOnly: false, order: 1 },
  { id: 'evidence-board', title: 'Evidence Board', subtitle: 'Investigation Map', route: '/evidence', internalOnly: false, order: 2 },
  { id: 'case-brief', title: 'Case Brief', subtitle: 'Business Understanding', route: '/case-brief', internalOnly: false, order: 3 },
  { id: 'evidence-intake', title: 'Evidence Intake', subtitle: 'Data Sources & Features', route: '/evidence-intake', internalOnly: false, order: 4 },
  { id: 'forensics-lab', title: 'Forensics Lab', subtitle: 'Distributions & Sanity Checks', route: '/forensics', internalOnly: false, order: 5 },
  { id: 'segmentation', title: 'Segmentation Room', subtitle: 'Player Archetypes', route: '/segmentation', internalOnly: false, order: 6 },
  { id: 'risk-engine', title: 'Risk Engine', subtitle: 'Risk Prioritization', route: '/risk', internalOnly: false, order: 7 },
  { id: 'public-voice', title: 'Public Voice', subtitle: 'Topic Pressure & Sentiment', route: '/public-voice', internalOnly: false, order: 8 },
  { id: 'cross-view', title: 'Cross-View Meaning', subtitle: 'Synthesis & Archetypes', route: '/synthesis', internalOnly: false, order: 9 },
  { id: 'deployment', title: 'Deployment Plan', subtitle: 'From Insight to Action', route: '/deployment', internalOnly: false, order: 10 },
  { id: 'verdict', title: 'Final Verdict', subtitle: 'Conclusions & Next Steps', route: '/verdict', internalOnly: false, order: 11 },
  { id: 'validation', title: 'Validation', subtitle: 'Statistical Evidence', route: '/internal/validation', internalOnly: true, order: 12 },
  { id: 'diagnostics', title: 'Diagnostics', subtitle: 'Correlation & Sanity Checks', route: '/internal/diagnostics', internalOnly: true, order: 13 },
];

interface DossierState {
  isAuthenticated: boolean;
  isShareMode: boolean;
  viewMode: ViewMode;
  completedChapters: Set<ChapterId>;
  unlockedChapters: Set<ChapterId>;
  loggedClues: string[];
  currentChapter: ChapterId;

  authenticate: (code: string) => boolean;
  enterShareMode: () => void;
  setViewMode: (mode: ViewMode) => void;
  completeChapter: (id: ChapterId) => void;
  unlockChapter: (id: ChapterId) => void;
  logClue: (clue: string) => void;
  setCurrentChapter: (id: ChapterId) => void;
  getVisibleChapters: () => ChapterMeta[];
  isChapterUnlocked: (id: ChapterId) => boolean;
  isChapterCompleted: (id: ChapterId) => boolean;
  getProgress: () => { completed: number; total: number; pct: number };
  logout: () => void;
}

const INITIAL_UNLOCKED: ChapterId[] = ['prologue', 'briefing'];

// Progression unlock map: completing X unlocks Y
const UNLOCK_MAP: Record<ChapterId, ChapterId[]> = {
  'prologue': ['briefing'],
  'briefing': ['evidence-board', 'case-brief'],
  'case-brief': ['evidence-intake'],
  'evidence-intake': ['forensics-lab'],
  'forensics-lab': ['segmentation'],
  'segmentation': ['risk-engine'],
  'risk-engine': ['public-voice'],
  'public-voice': ['cross-view'],
  'cross-view': ['deployment'],
  'deployment': ['verdict'],
  'verdict': ['validation', 'diagnostics'],
  'evidence-board': [],
  'validation': [],
  'diagnostics': [],
};

export const useDossierStore = create<DossierState>((set, get) => ({
  isAuthenticated: false,
  isShareMode: false,
  viewMode: 'client',
  completedChapters: new Set<ChapterId>(),
  unlockedChapters: new Set<ChapterId>(INITIAL_UNLOCKED),
  loggedClues: [],
  currentChapter: 'prologue',

  authenticate: (code) => {
    if (code.toUpperCase() === 'WHALES') {
      set({ isAuthenticated: true, isShareMode: false });
      return true;
    }
    return false;
  },

  enterShareMode: () => {
    const publicChapters = CHAPTERS
      .filter((ch) => !ch.internalOnly)
      .map((ch) => ch.id);

    set({
      isAuthenticated: true,
      isShareMode: true,
      viewMode: 'client',
      completedChapters: new Set<ChapterId>(),
      unlockedChapters: new Set<ChapterId>(publicChapters),
      loggedClues: [],
      currentChapter: 'prologue',
    });
  },

  setViewMode: (mode) =>
    set((state) => ({
      viewMode: state.isShareMode ? 'client' : mode,
    })),

  completeChapter: (id) => {
    const { completedChapters, unlockedChapters } = get();
    const newCompleted = new Set(completedChapters);
    newCompleted.add(id);

    const newUnlocked = new Set(unlockedChapters);
    const toUnlock = UNLOCK_MAP[id] || [];
    toUnlock.forEach((ch) => newUnlocked.add(ch));

    if (id === 'briefing') newUnlocked.add('evidence-board');

    set({ completedChapters: newCompleted, unlockedChapters: newUnlocked });
  },

  unlockChapter: (id) => {
    const { unlockedChapters } = get();
    const newUnlocked = new Set(unlockedChapters);
    newUnlocked.add(id);
    set({ unlockedChapters: newUnlocked });
  },

  logClue: (clue) => {
    const { loggedClues } = get();
    if (!loggedClues.includes(clue)) {
      set({ loggedClues: [...loggedClues, clue] });
    }
  },

  setCurrentChapter: (id) => set({ currentChapter: id }),

  getVisibleChapters: () => {
    const { viewMode } = get();
    return CHAPTERS.filter((ch) => !ch.internalOnly || viewMode === 'internal');
  },

  isChapterUnlocked: (id) => get().unlockedChapters.has(id),
  isChapterCompleted: (id) => get().completedChapters.has(id),

  getProgress: () => {
    const { completedChapters, viewMode } = get();
    const visible = CHAPTERS.filter((ch) => !ch.internalOnly || viewMode === 'internal');
    const completed = visible.filter((ch) => completedChapters.has(ch.id)).length;
    return {
      completed,
      total: visible.length,
      pct: Math.round((completed / visible.length) * 100),
    };
  },

  logout: () =>
    set({
      isAuthenticated: false,
      isShareMode: false,
      viewMode: 'client',
      completedChapters: new Set<ChapterId>(),
      unlockedChapters: new Set<ChapterId>(INITIAL_UNLOCKED),
      loggedClues: [],
      currentChapter: 'prologue',
    }),
}));

