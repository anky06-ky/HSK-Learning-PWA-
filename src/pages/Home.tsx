import { Link, useNavigate } from 'react-router-dom';
import { useVocabularyStore } from '../store/vocabularyStore';
import { useEffect } from 'react';

export default function Home() {
  const { loadVocabularies, vocabularies } = useVocabularyStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadVocabularies();
  }, [loadVocabularies]);

  const hskCounts = [1, 2, 3, 4].map(level => ({
    level,
    count: vocabularies.filter(w => w.hskLevel === level).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8 pt-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">HSK Learning</h1>
          <p className="text-lg text-gray-600">Học tiếng Trung HSK 1-4 offline</p>
        </div>

        <div className="space-y-4 mb-8">
          {hskCounts.map(({ level, count }) => (
            <Link
              key={level}
              to={`/vocabulary?level=${level}`}
              className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all active:scale-[0.98] touch-manipulation"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">HSK {level}</h2>
                  <p className="text-gray-600">{count} từ vựng</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-3">
          <Link
            to="/vocabulary"
            className="block w-full bg-primary text-white text-center py-4 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] touch-manipulation"
          >
            Xem tất cả từ vựng
          </Link>
          <button
            onClick={() => navigate('/progress')}
            className="block w-full bg-green-500 text-white text-center py-4 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] touch-manipulation"
          >
            📊 Tiến độ học tập
          </button>
        </div>

        <div className="mt-8 p-4 bg-white rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">Tính năng</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Học offline 100%
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Phát âm với audio
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Theo dõi tiến độ học
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cài đặt như app
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

