import { Vocabulary } from '../db/database';
import AudioPlayer from './AudioPlayer';

interface WordDetailProps {
  word: Vocabulary;
  onClose: () => void;
}

export default function WordDetail({ word, onClose }: WordDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Chi tiết từ vựng</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all touch-manipulation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <div className="text-6xl font-bold mb-2">{word.word}</div>
            <div className="text-2xl text-primary mb-2">{word.pinyin}</div>
            <div className="text-xl text-gray-700">{word.meaning}</div>
          </div>

          <div className="flex justify-center">
            <AudioPlayer text={word.pinyin} />
          </div>

          {word.example && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-2">Ví dụ:</div>
              <div className="text-lg font-medium mb-1">{word.example}</div>
              {word.examplePinyin && (
                <div className="text-base text-primary">{word.examplePinyin}</div>
              )}
            </div>
          )}

          {word.radicals && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Bộ thủ:</div>
              <div className="text-lg">{word.radicals}</div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 pt-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              HSK {word.hskLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

