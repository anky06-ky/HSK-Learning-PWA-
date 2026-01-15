# PRODUCT SPEC - Ứng dụng học tiếng Trung HSK

## 1. THÔNG TIN SẢN PHẨM

**Tên sản phẩm:** HSK Learning PWA  
**Nền tảng:** Progressive Web App (PWA)  
**Đối tượng:** Người học tiếng Trung HSK 1-4  
**Thiết bị chính:** Điện thoại di động  
**Yêu cầu offline:** 100% hoạt động không cần internet  

## 2. MỤC TIÊU SẢN PHẨM

- Học từ vựng HSK 1-4 (tổng ~1200 từ)
- Luyện phát âm với AI chấm điểm
- Luyện viết chữ Hán với nhận diện
- Học offline hoàn toàn
- Cài đặt như app native trên điện thoại

## 3. CẤU TRÚC DỮ LIỆU

### 3.1 Từ vựng HSK
- HSK 1: 150 từ
- HSK 2: 150 từ (tổng 300)
- HSK 3: 300 từ (tổng 600)
- HSK 4: 600 từ (tổng 1200)

Mỗi từ bao gồm:
- Chữ Hán (汉字)
- Pinyin (拼音)
- Nghĩa tiếng Việt
- Audio phát âm
- Ví dụ câu
- Bộ thủ (nếu có)

### 3.2 Tiến độ học tập
- Từ đã học
- Từ đang học
- Từ chưa học
- Điểm phát âm
- Số lần ôn tập
- Ngày học cuối

## 4. KIẾN TRÚC KỸ THUẬT

### 4.1 Frontend
- Framework: React + TypeScript
- UI Library: Tailwind CSS
- State Management: Zustand hoặc Context API
- Routing: React Router

### 4.2 Offline Storage
- IndexedDB: Lưu từ vựng, audio, tiến độ
- Service Worker: Cache tất cả assets
- LocalStorage: Settings, preferences

### 4.3 AI Features
- Speech Recognition: Web Speech API
- Pronunciation Scoring: Custom algorithm hoặc Web Audio API
- Handwriting Recognition: Canvas + ML model (TensorFlow.js)

### 4.4 PWA
- Manifest.json: Cấu hình install
- Service Worker: Offline caching
- Icons: Đầy đủ sizes cho mobile

## 5. YÊU CẦU HIỆU NĂNG

- Load time < 3 giây
- Offline first: Tất cả tính năng hoạt động offline
- Responsive: Tối ưu cho màn hình 320px - 768px
- Touch-friendly: Buttons tối thiểu 44x44px
- One-hand usage: Các action chính ở vùng dễ với tay

## 6. GIỚI HẠN & GIẢI PHÁP

### 6.1 AI Pronunciation Scoring
- **Giới hạn:** Web Speech API không có built-in scoring
- **Giải pháp:** So sánh waveform với audio mẫu, hoặc dùng thư viện như Web Audio API để phân tích pitch, tone

### 6.2 Handwriting Recognition
- **Giới hạn:** Cần model ML phức tạp
- **Giải pháp:** Dùng TensorFlow.js với model pre-trained, hoặc so sánh stroke order với database

### 6.3 Audio Storage
- **Giới hạn:** 1200 audio files có thể lớn
- **Giải pháp:** Compress audio, lazy loading, chỉ tải audio khi cần

## 7. ROADMAP PHÁT TRIỂN

- **PHASE 1:** MVP Offline - Học từ vựng, nghe audio
- **PHASE 2:** AI Core - Phát âm, viết chữ
- **PHASE 3:** Sync & UX - Tracking, đồng bộ
- **PHASE 4:** Build & Deploy - Production ready

