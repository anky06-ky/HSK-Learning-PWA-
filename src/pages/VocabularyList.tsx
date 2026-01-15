import { useEffect, useState } from 'react';
import { useVocabularyStore } from '../store/vocabularyStore';
import WordCard from '../components/WordCard';
import WordDetail from '../components/WordDetail';
import { Vocabulary } from '../db/database';

export default function VocabularyList() {
  const {
    vocabularies,
    selectedHSKLevel,
    searchQuery,
    isLoading,
    loadVocabularies,
    setSelectedHSKLevel,
    setSearchQuery,
    setCurrentWord
  } = useVocabularyStore();

  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);

  useEffect(() => {
    if (selectedHSKLevel !== null) {
      loadVocabularies(selectedHSKLevel);
    } else {
      loadVocabularies();
    }
  }, [selectedHSKLevel, loadVocabularies]);

  const filteredWords = vocabularies.filter(word => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        word.word.toLowerCase().includes(query) ||
        word.pinyin.toLowerCase().includes(query) ||
        word.meaning.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleWordSelect = (word: Vocabulary) => {
    setSelectedWord(word);
    setCurrentWord(word);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Từ vựng HSK</h1>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
          </div>

          {/* HSK Level Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedHSKLevel(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all touch-manipulation ${
                selectedHSKLevel === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Tất cả
            </button>
            {[1, 2, 3, 4].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedHSKLevel(level)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all touch-manipulation ${
                  selectedHSKLevel === level
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                HSK {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Word List */}
      <div className="max-w-2xl mx-auto p-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : filteredWords.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Không tìm thấy từ vựng nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWords.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                onSelect={() => handleWordSelect(word)}
              />
            ))}
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-500">
          Tổng: {filteredWords.length} từ
        </div>
      </div>

      {selectedWord && (
        <WordDetail
          word={selectedWord}
          onClose={() => {
            setSelectedWord(null);
            setCurrentWord(null);
          }}
        />
      )}
    </div>
  );
}

