import { Vocabulary } from '../db/database';
import AudioPlayer from './AudioPlayer';
import { useVocabularyStore } from '../store/vocabularyStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface WordCardProps {
  word: Vocabulary;
  onSelect?: () => void;
}

export default function WordCard({ word, onSelect }: WordCardProps) {
  const { getWordProgress, markAsLearned, markAsLearning } = useVocabularyStore();
  const [progress, setProgress] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (word.id) {
      getWordProgress(word.id).then(setProgress);
    }
  }, [word.id, getWordProgress]);

  const handleMarkLearned = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (word.id) {
      await markAsLearned(word.id);
      if (word.id) {
        const updated = await getWordProgress(word.id);
        setProgress(updated);
      }
    }
  };

  const handleMarkLearning = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (word.id) {
      await markAsLearning(word.id);
      if (word.id) {
        const updated = await getWordProgress(word.id);
        setProgress(updated);
      }
    }
  };

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] touch-manipulation"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1">{word.word}</div>
          <div className="text-lg text-primary mb-1">{word.pinyin}</div>
          <div className="text-gray-700">{word.meaning}</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
            HSK {word.hskLevel}
          </span>
          {progress && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              progress.status === 'mastered' 
                ? 'bg-green-100 text-green-700'
                : progress.status === 'learning'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {progress.status === 'mastered' ? 'Đã thuộc' : progress.status === 'learning' ? 'Đang học' : 'Mới'}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <AudioPlayer text={word.pinyin} className="flex-1" />
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (word.id) navigate(`/practice/${word.id}`);
            }}
            className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 active:scale-95 transition-all touch-manipulation"
          >
            Luyện tập
          </button>
          <button
            onClick={handleMarkLearning}
            className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 active:scale-95 transition-all touch-manipulation"
          >
            Đang học
          </button>
          <button
            onClick={handleMarkLearned}
            className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 active:scale-95 transition-all touch-manipulation"
          >
            Đã thuộc
          </button>
        </div>
      </div>

      {word.example && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Ví dụ:</div>
          <div className="text-base font-medium">{word.example}</div>
          {word.examplePinyin && (
            <div className="text-sm text-primary">{word.examplePinyin}</div>
          )}
        </div>
      )}
    </div>
  );
}

