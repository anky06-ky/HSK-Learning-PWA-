import { useState, useRef, useEffect } from 'react';
import { Vocabulary } from '../db/database';

interface HandwritingRecognitionProps {
  word: Vocabulary;
  onResult: (isCorrect: boolean) => void;
}

export default function HandwritingRecognition({ word, onResult }: HandwritingRecognitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }>>([]);
  const [recognized, setRecognized] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set drawing style
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    const newStroke = [{ x: coords.x, y: coords.y }];
    setCurrentStroke(newStroke);
    drawPoint(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const coords = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastPoint = currentStroke[currentStroke.length - 1];
    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }

    setCurrentStroke([...currentStroke, coords]);
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes([...strokes, currentStroke]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const drawPoint = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const recognize = () => {
    // Đơn giản hóa: So sánh số nét với từ đúng
    // Trong thực tế, cần dùng ML model như TensorFlow.js
    
    const strokeCount = strokes.length;
    const expectedStrokes = estimateStrokeCount(word.word);
    
    // Kiểm tra cơ bản
    const isCorrect = Math.abs(strokeCount - expectedStrokes) <= 2;
    
    setRecognized(isCorrect ? 'Đúng!' : 'Chưa đúng, thử lại');
    onResult(isCorrect);
    
    // Có thể cải thiện bằng cách:
    // 1. So sánh hình dạng với template
    // 2. Sử dụng TensorFlow.js với model pre-trained
    // 3. So sánh stroke order
  };

  const estimateStrokeCount = (char: string): number => {
    // Ước tính số nét dựa trên độ phức tạp của chữ
    // Đây là ước tính đơn giản, có thể cải thiện với database thật
    if (char.length === 1) {
      // Ước tính dựa trên số lượng nét phổ biến
      const simpleChars: { [key: string]: number } = {
        '一': 1, '二': 2, '三': 3, '十': 2, '人': 2, '大': 3, '小': 3,
        '中': 4, '国': 8, '学': 8, '生': 5, '好': 6, '我': 7, '你': 7
      };
      return simpleChars[char] || 5; // Default estimate
    }
    return char.length * 4; // Rough estimate for multi-char words
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokes([]);
    setCurrentStroke([]);
    setRecognized(null);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Luyện viết chữ Hán</h3>
        <p className="text-gray-600 mb-1">Viết từ: <span className="font-medium text-2xl">{word.word}</span></p>
        <p className="text-primary mb-4">{word.pinyin} - {word.meaning}</p>
      </div>

      <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-white rounded touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={clearCanvas}
          className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 active:scale-95 transition-all touch-manipulation"
        >
          Xóa
        </button>
        <button
          onClick={recognize}
          className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 active:scale-95 transition-all touch-manipulation"
        >
          Kiểm tra
        </button>
      </div>

      {recognized && (
        <div className={`p-4 rounded-lg ${
          recognized === 'Đúng!' ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <p className={`text-center font-medium ${
            recognized === 'Đúng!' ? 'text-green-700' : 'text-red-700'
          }`}>
            {recognized}
          </p>
          {recognized !== 'Đúng!' && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Số nét bạn vẽ: {strokes.length}
            </p>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        💡 Mẹo: Vẽ từng nét một, theo thứ tự từ trái sang phải, trên xuống dưới
      </div>
    </div>
  );
}

