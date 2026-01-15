import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioUrl?: string;
  text?: string;
  className?: string;
}

export default function AudioPlayer({ audioUrl, text, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  // Nếu không có audioUrl, dùng Web Speech API để phát âm
  const speakText = () => {
    if (!text) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = playbackRate;
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
    }
  };

  const handlePlay = audioUrl ? togglePlay : speakText;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handlePlay}
        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all touch-manipulation"
        aria-label={isPlaying ? 'Dừng phát âm' : 'Phát âm'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
      </button>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="auto" />
      )}

      <div className="flex gap-1">
        {[0.5, 1, 1.5].map((rate) => (
          <button
            key={rate}
            onClick={() => setPlaybackRate(rate)}
            className={`px-2 py-1 text-sm rounded ${
              playbackRate === rate
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  );
}

