import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import VocabularyList from './pages/VocabularyList';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import { useEffect } from 'react';
import { seedDatabase } from './db/seedData';
import { useVocabularyStore } from './store/vocabularyStore';

function VocabularyListWithLevel() {
  const [searchParams] = useSearchParams();
  const { setSelectedHSKLevel, loadVocabularies } = useVocabularyStore();
  const level = searchParams.get('level');

  useEffect(() => {
    const levelNum = level ? parseInt(level) : null;
    setSelectedHSKLevel(levelNum);
    loadVocabularies(levelNum || undefined);
  }, [level, setSelectedHSKLevel, loadVocabularies]);

  return <VocabularyList />;
}

function App() {
  useEffect(() => {
    // Seed database on first load
    seedDatabase();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vocabulary" element={<VocabularyListWithLevel />} />
        <Route path="/practice/:wordId" element={<Practice />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

