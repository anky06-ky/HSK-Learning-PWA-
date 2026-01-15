import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVocabularyStore } from '../store/vocabularyStore';
import { Vocabulary } from '../db/database';
import SpeechRecognition from '../components/SpeechRecognition';
import PronunciationScoring from '../components/PronunciationScoring';
import HandwritingRecognition from '../components/HandwritingRecognition';
import AudioPlayer from '../components/AudioPlayer';

type PracticeMode = 'speech' | 'pronunciation' | 'handwriting';

export default function Practice() {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();
  const { vocabularies, markAsLearned } = useVocabularyStore();
  const [word, setWord] = useState<Vocabulary | null>(null);
  const [mode, setMode] = useState<PracticeMode>('speech');
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (wordId) {
      const foundWord = vocabularies.find(w => w.id === parseInt(wordId));
      if (foundWord) {
        setWord(foundWord);
      }
    }
  }, [wordId, vocabularies]);

  const handleSpeechResult = (isCorrect: boolean) => {
    if (isCorrect && word?.id) {
      markAsLearned(word.id);
    }
  };

  const handlePronunciationScore = (pronunciationScore: number) => {
    setScore(pronunciationScore);
    if (pronunciationScore >= 80 && word?.id) {
      markAsLearned(word.id);
    }
  };

  const handleHandwritingResult = (isCorrect: boolean) => {
    if (isCorrect && word?.id) {
      markAsLearned(word.id);
    }
  };

  if (!word) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy từ vựng</p>
          <button
            onClick={() => navigate('/vocabulary')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Luyện tập</h1>
            <div className="w-10"></div>
          </div>

          {/* Word Display */}
          <div className="text-center py-4 bg-gray-50 rounded-lg mb-4">
            <div className="text-4xl font-bold mb-2">{word.word}</div>
            <div className="text-2xl text-primary mb-2">{word.pinyin}</div>
            <div className="text-lg text-gray-700">{word.meaning}</div>
            <div className="mt-3 flex justify-center">
              <AudioPlayer text={word.pinyin} />
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode('speech')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all touch-manipulation ${
                mode === 'speech'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              🎤 Nói
            </button>
            <button
              onClick={() => setMode('pronunciation')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all touch-manipulation ${
                mode === 'pronunciation'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              🔊 Phát âm
            </button>
            <button
              onClick={() => setMode('handwriting')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all touch-manipulation ${
                mode === 'handwriting'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              ✍️ Viết
            </button>
          </div>
        </div>
      </div>

      {/* Practice Content */}
      <div className="max-w-2xl mx-auto p-4">
        {mode === 'speech' && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <SpeechRecognition
              targetText={word.word}
              targetPinyin={word.pinyin}
              onResult={handleSpeechResult}
            />
          </div>
        )}

        {mode === 'pronunciation' && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <PronunciationScoring
              word={word}
              onScore={handlePronunciationScore}
            />
          </div>
        )}

        {mode === 'handwriting' && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <HandwritingRecognition
              word={word}
              onResult={handleHandwritingResult}
            />
          </div>
        )}

        {score !== null && score >= 80 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-green-700 font-medium">🎉 Tuyệt vời! Bạn đã hoàn thành!</p>
          </div>
        )}
      </div>
    </div>
  );
}

