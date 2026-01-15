import Dexie, { Table } from 'dexie';

export interface Vocabulary {
  id?: number;
  word: string; // Chữ Hán
  pinyin: string;
  meaning: string; // Nghĩa tiếng Việt
  hskLevel: number; // 1-4
  audioUrl?: string;
  example?: string;
  examplePinyin?: string;
  radicals?: string; // Bộ thủ
  createdAt: number;
}

export interface LearningProgress {
  id?: number;
  vocabularyId: number;
  status: 'new' | 'learning' | 'mastered';
  pronunciationScore?: number;
  reviewCount: number;
  lastReviewed: number;
  nextReview: number;
  createdAt: number;
}

export class HSKDatabase extends Dexie {
  vocabularies!: Table<Vocabulary>;
  progress!: Table<LearningProgress>;

  constructor() {
    super('HSKLearningDB');
    
    this.version(1).stores({
      vocabularies: '++id, word, pinyin, hskLevel, meaning',
      progress: '++id, vocabularyId, status, nextReview'
    });
  }
}

export const db = new HSKDatabase();

