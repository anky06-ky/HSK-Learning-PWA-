import { useEffect, useState, useRef } from 'react';
import { useVocabularyStore } from '../store/vocabularyStore';
import { db, LearningProgress, Vocabulary } from '../db/database';
import { useNavigate } from 'react-router-dom';
import { exportProgress, importProgress } from '../utils/exportData';

export default function Progress() {
  const { vocabularies, loadVocabularies } = useVocabularyStore();
  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    learning: 0,
    mastered: 0,
    todayReviewed: 0,
    streak: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadVocabularies();
    loadProgress();
  }, [loadVocabularies]);

  const loadProgress = async () => {
    try {
      const allProgress = await db.progress.toArray();
      setProgress(allProgress);

      // Calculate stats
      const total = vocabularies.length;
      const newCount = total - allProgress.length;
      const learningCount = allProgress.filter(p => p.status === 'learning').length;
      const masteredCount = allProgress.filter(p => p.status === 'mastered').length;
      
      // Today reviewed
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayReviewed = allProgress.filter(
        p => p.lastReviewed >= today.getTime()
      ).length;

      // Streak (simplified - count consecutive days with reviews)
      const streak = calculateStreak(allProgress);

      setStats({
        total,
        new: newCount,
        learning: learningCount,
        mastered: masteredCount,
        todayReviewed,
        streak
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const calculateStreak = (allProgress: LearningProgress[]): number => {
    if (allProgress.length === 0) return 0;
    
    const reviewDates = allProgress
      .map(p => new Date(p.lastReviewed).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < reviewDates.length; i++) {
      const reviewDate = new Date(reviewDates[i]);
      reviewDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (reviewDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getWordsByStatus = (status: 'new' | 'learning' | 'mastered'): Array<{ word: Vocabulary; progress?: LearningProgress }> => {
    if (status === 'new') {
      const progressWordIds = new Set(progress.map(p => p.vocabularyId));
      return vocabularies
        .filter(w => !progressWordIds.has(w.id!))
        .map(word => ({ word }));
    }
    const progressWords = progress.filter(p => p.status === status);
    return progressWords
      .map(p => {
        const word = vocabularies.find(w => w.id === p.vocabularyId);
        return word ? { word, progress: p } : null;
      })
      .filter((item): item is { word: Vocabulary; progress: LearningProgress } => item !== null);
  };

  const wordsToReview = progress.filter(p => {
    return p.nextReview <= Date.now() && p.status !== 'mastered';
  }).length;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const success = await exportProgress();
    if (success) {
      alert('Đã xuất dữ liệu thành công!');
    } else {
      alert('Lỗi khi xuất dữ liệu');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const success = await importProgress(file);
    if (success) {
      alert('Đã nhập dữ liệu thành công!');
      loadProgress();
    } else {
      alert('Lỗi khi nhập dữ liệu');
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Tiến độ học tập</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-primary mb-1">{stats.mastered}</div>
            <div className="text-sm text-gray-600">Đã thuộc</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.learning}</div>
            <div className="text-sm text-gray-600">Đang học</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-gray-400 mb-1">{stats.new}</div>
            <div className="text-sm text-gray-600">Chưa học</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.streak}</div>
            <div className="text-sm text-gray-600">Ngày liên tiếp</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Tiến độ tổng thể</span>
            <span className="text-sm font-bold text-primary">
              {Math.round((stats.mastered / stats.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${(stats.mastered / stats.total) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.mastered} / {stats.total} từ
          </div>
        </div>

        {/* Today's Activity */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-bold mb-3">Hôm nay</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Đã ôn tập:</span>
              <span className="font-bold">{stats.todayReviewed} từ</span>
            </div>
            {wordsToReview > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cần ôn tập:</span>
                <span className="font-bold text-orange-600">{wordsToReview} từ</span>
              </div>
            )}
          </div>
        </div>

        {/* Words to Review */}
        {wordsToReview > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-orange-800 mb-2">📚 Cần ôn tập</h3>
            <p className="text-sm text-orange-700 mb-3">
              Bạn có {wordsToReview} từ cần ôn tập lại
            </p>
            <button
              onClick={() => navigate('/vocabulary')}
              className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 active:scale-95 transition-all touch-manipulation"
            >
              Ôn tập ngay
            </button>
          </div>
        )}

        {/* Learning Words */}
        {getWordsByStatus('learning').length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-3">Đang học ({getWordsByStatus('learning').length})</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {getWordsByStatus('learning').slice(0, 10).map(({ word, progress }) => (
                <div
                  key={word.id}
                  onClick={() => word.id && navigate(`/practice/${word.id}`)}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 active:scale-[0.98] transition-all touch-manipulation"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">{word.word}</div>
                      <div className="text-sm text-primary">{word.pinyin}</div>
                    </div>
                    {progress && (
                      <div className="text-xs text-gray-500">
                        {Math.floor((Date.now() - progress.lastReviewed) / (1000 * 60 * 60 * 24))} ngày trước
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mastered Words */}
        {getWordsByStatus('mastered').length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-3">Đã thuộc ({getWordsByStatus('mastered').length})</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {getWordsByStatus('mastered').slice(0, 10).map(({ word, progress }) => (
                <div
                  key={word.id}
                  onClick={() => word.id && navigate(`/practice/${word.id}`)}
                  className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 active:scale-[0.98] transition-all touch-manipulation"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">{word.word}</div>
                      <div className="text-sm text-primary">{word.pinyin}</div>
                    </div>
                    {progress && (
                      <div className="text-xs text-gray-500">
                        Ôn {progress.reviewCount} lần
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export/Import */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-bold mb-3">Sao lưu dữ liệu</h2>
          <div className="space-y-2">
            <button
              onClick={handleExport}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 active:scale-95 transition-all touch-manipulation"
            >
              📥 Xuất dữ liệu
            </button>
            <label className="block">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <div className="w-full py-3 bg-green-500 text-white rounded-lg font-medium text-center hover:bg-green-600 active:scale-95 transition-all touch-manipulation cursor-pointer">
                📤 Nhập dữ liệu
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

