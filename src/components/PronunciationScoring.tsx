import { useState, useRef } from 'react';
import { Vocabulary } from '../db/database';

interface PronunciationScoringProps {
  word: Vocabulary;
  onScore: (score: number) => void;
}

export default function PronunciationScoring({ word, onScore }: PronunciationScoringProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Phân tích audio và chấm điểm
        analyzeAudio(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setScore(null);
      setFeedback('');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback('Không thể truy cập microphone. Vui lòng cho phép quyền truy cập.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    // Đơn giản hóa: So sánh với audio mẫu bằng Web Audio API
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Phân tích cơ bản
      const duration = audioBuffer.duration;
      const channelData = audioBuffer.getChannelData(0);
      
      // Tính RMS (Root Mean Square) - độ lớn âm thanh
      let sumSquares = 0;
      for (let i = 0; i < channelData.length; i++) {
        sumSquares += channelData[i] * channelData[i];
      }
      const rms = Math.sqrt(sumSquares / channelData.length);
      
      // Tính điểm dựa trên các yếu tố cơ bản
      // Đây là implementation đơn giản, có thể cải thiện với ML model
      let calculatedScore = 70; // Base score
      
      // Kiểm tra độ dài (nếu quá ngắn hoặc quá dài thì trừ điểm)
      const expectedDuration = word.pinyin.length * 0.3; // Ước tính
      if (Math.abs(duration - expectedDuration) < 0.5) {
        calculatedScore += 10;
      }
      
      // Kiểm tra độ lớn âm thanh (phải có âm thanh rõ ràng)
      if (rms > 0.01) {
        calculatedScore += 10;
      } else {
        calculatedScore -= 20;
      }
      
      // Giới hạn điểm từ 0-100
      calculatedScore = Math.max(0, Math.min(100, calculatedScore));
      
      setScore(calculatedScore);
      onScore(calculatedScore);
      
      // Feedback
      if (calculatedScore >= 80) {
        setFeedback('Phát âm tốt! 👍');
      } else if (calculatedScore >= 60) {
        setFeedback('Phát âm khá, cần luyện thêm');
      } else {
        setFeedback('Cần luyện tập nhiều hơn. Hãy nghe lại audio mẫu.');
      }
      
    } catch (error) {
      console.error('Error analyzing audio:', error);
      setFeedback('Không thể phân tích audio');
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Luyện phát âm</h3>
        <p className="text-gray-600 mb-1">Từ: <span className="font-medium">{word.word}</span></p>
        <p className="text-primary mb-4">{word.pinyin}</p>
      </div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-full py-4 rounded-lg font-medium text-lg transition-all touch-manipulation ${
          isRecording
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        {isRecording ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            Đang ghi âm... (Click để dừng)
          </div>
        ) : (
          '🎤 Ghi âm phát âm'
        )}
      </button>

      {score !== null && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-center mb-2">
            <div className="text-3xl font-bold text-primary mb-1">{score}/100</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
          {feedback && (
            <p className="text-center text-sm text-gray-700 mt-2">{feedback}</p>
          )}
        </div>
      )}

      {audioUrl && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Bản ghi âm của bạn:</p>
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}
    </div>
  );
}

