import { create } from 'zustand';
import { Vocabulary, LearningProgress } from '../db/database';
import { db } from '../db/database';

interface VocabularyState {
  vocabularies: Vocabulary[];
  currentWord: Vocabulary | null;
  selectedHSKLevel: number | null;
  searchQuery: string;
  isLoading: boolean;
  loadVocabularies: (level?: number) => Promise<void>;
  setCurrentWord: (word: Vocabulary | null) => void;
  setSelectedHSKLevel: (level: number | null) => void;
  setSearchQuery: (query: string) => void;
  getWordProgress: (wordId: number) => Promise<LearningProgress | undefined>;
  markAsLearned: (wordId: number) => Promise<void>;
  markAsLearning: (wordId: number) => Promise<void>;
}

export const useVocabularyStore = create<VocabularyState>((set) => ({
  vocabularies: [],
  currentWord: null,
  selectedHSKLevel: null,
  searchQuery: '',
  isLoading: false,

  loadVocabularies: async (level?: number) => {
    set({ isLoading: true });
    try {
      let words: Vocabulary[];
      if (level) {
        words = await db.vocabularies.where('hskLevel').equals(level).toArray();
      } else {
        words = await db.vocabularies.toArray();
      }
      set({ vocabularies: words, isLoading: false });
    } catch (error) {
      console.error('Error loading vocabularies:', error);
      set({ isLoading: false });
    }
  },

  setCurrentWord: (word) => set({ currentWord: word }),

  setSelectedHSKLevel: (level) => set({ selectedHSKLevel: level }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getWordProgress: async (wordId: number) => {
    try {
      const progress = await db.progress.where('vocabularyId').equals(wordId).first();
      return progress;
    } catch (error) {
      console.error('Error getting word progress:', error);
      return undefined;
    }
  },

  markAsLearned: async (wordId: number) => {
    try {
      const existing = await db.progress.where('vocabularyId').equals(wordId).first();
      if (existing) {
        await db.progress.update(existing.id!, {
          status: 'mastered',
          lastReviewed: Date.now(),
          reviewCount: existing.reviewCount + 1
        });
      } else {
        await db.progress.add({
          vocabularyId: wordId,
          status: 'mastered',
          reviewCount: 1,
          lastReviewed: Date.now(),
          nextReview: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
          createdAt: Date.now()
        });
      }
    } catch (error) {
      console.error('Error marking as learned:', error);
    }
  },

  markAsLearning: async (wordId: number) => {
    try {
      const existing = await db.progress.where('vocabularyId').equals(wordId).first();
      if (existing) {
        await db.progress.update(existing.id!, {
          status: 'learning',
          lastReviewed: Date.now()
        });
      } else {
        await db.progress.add({
          vocabularyId: wordId,
          status: 'learning',
          reviewCount: 0,
          lastReviewed: Date.now(),
          nextReview: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
          createdAt: Date.now()
        });
      }
    } catch (error) {
      console.error('Error marking as learning:', error);
    }
  }
}));

