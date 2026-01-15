import { useState, useEffect, useRef } from 'react';

interface SpeechRecognitionProps {
  targetText: string;
  targetPinyin: string;
  onResult: (isCorrect: boolean, recognizedText: string) => void;
  onScore?: (score: number) => void;
}

export default function SpeechRecognition({
  targetText,
  targetPinyin,
  onResult,
  onScore
}: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Trình duyệt không hỗ trợ nhận diện giọng nói');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      
      // So sánh với target (đơn giản hóa - chỉ so sánh text)
      const isCorrect = transcript.trim().toLowerCase() === targetText.toLowerCase() ||
                       transcript.trim().toLowerCase() === targetPinyin.toLowerCase();
      
      onResult(isCorrect, transcript);
      
      // Tính điểm đơn giản
      if (onScore) {
        const score = isCorrect ? 100 : calculateSimilarity(transcript, targetPinyin);
        onScore(score);
      }
    };

    recognition.onerror = (event: any) => {
      setError(`Lỗi: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [targetText, targetPinyin, onResult, onScore]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setRecognizedText('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Tính độ tương đồng đơn giản (Levenshtein distance)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    if (longer.length === 0) return 100;
    
    const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    return Math.max(0, 100 - (distance / longer.length) * 100);
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  if (error && !isListening) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`w-full py-4 rounded-lg font-medium text-lg transition-all touch-manipulation ${
          isListening
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        {isListening ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            Đang nghe... (Click để dừng)
          </div>
        ) : (
          '🎤 Nhấn để nói'
        )}
      </button>

      {recognizedText && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Bạn đã nói:</p>
          <p className="text-base font-medium">{recognizedText}</p>
        </div>
      )}
    </div>
  );
}

// Extend Window interface
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

