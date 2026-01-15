# HSK Learning PWA

[![GitHub](https://img.shields.io/badge/GitHub-anky06--ky-blue?style=flat&logo=github)](https://github.com/anky06-ky/HSK-Learning-PWA-)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Ứng dụng học tiếng Trung HSK 1-4 dưới dạng Progressive Web App (PWA), hoạt động 100% offline.

**🔗 Repository:** https://github.com/anky06-ky/HSK-Learning-PWA-

## 🚀 Tính năng

- ✅ Học từ vựng HSK 1-4 (1200+ từ)
- ✅ Phát âm với audio (Web Speech API)
- ✅ Hoạt động offline 100%
- ✅ Cài đặt như app native
- ✅ Theo dõi tiến độ học tập
- ✅ Tìm kiếm và lọc theo cấp độ HSK
- ✅ UI tối ưu cho mobile, dùng một tay
- ✅ AI: Speech recognition, Pronunciation scoring, Handwriting recognition

## 🚀 DEPLOY NGAY (2 PHÚT)

### Option 1: Vercel (Khuyến nghị - Tự động từ GitHub)
1. Vào https://vercel.com
2. Đăng nhập bằng GitHub
3. Import repository: `anky06-ky/HSK-Learning-PWA-`
4. Vercel tự động detect và deploy! 🎉

### Option 2: Netlify
1. Vào https://app.netlify.com
2. Đăng nhập bằng GitHub
3. Import repository: `anky06-ky/HSK-Learning-PWA-`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy! 🎉

### Option 3: GitHub Pages
1. Vào Settings > Pages trong repository
2. Source: `gh-pages` branch (sau khi chạy workflow)
3. Hoặc dùng GitHub Actions workflow đã có sẵn

Xem chi tiết: `DEPLOY_SIMPLE.md` hoặc `DEPLOY_NOW.txt`

## 📋 Yêu cầu

- Node.js 18+ 
- npm hoặc yarn

## 🛠️ Cài đặt và chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ mở tại `http://localhost:3000`

### 3. Build production

```bash
npm run build
```

Files sẽ được build vào thư mục `dist/`

### 4. Preview production build

```bash
npm run preview
```

## 📱 Cài đặt PWA

### Trên Chrome/Edge (Desktop):
1. Mở ứng dụng trong browser
2. Click icon "Install" trên thanh address bar
3. Hoặc vào menu > "Install app"

### Trên Chrome (Android):
1. Mở ứng dụng trong Chrome
2. Menu > "Add to Home screen"
3. Hoặc thông báo "Add to Home screen" sẽ xuất hiện

### Trên Safari (iOS):
1. Mở ứng dụng trong Safari
2. Share button > "Add to Home Screen"

## 🗂️ Cấu trúc project

```
src/
├── db/
│   ├── database.ts          # IndexedDB schema (Dexie)
│   └── seedData.ts          # Sample data từ vựng
├── store/
│   └── vocabularyStore.ts   # Zustand state management
├── components/
│   ├── AudioPlayer.tsx      # Component phát audio
│   ├── WordCard.tsx         # Card hiển thị từ vựng
│   └── WordDetail.tsx       # Modal chi tiết từ vựng
├── pages/
│   ├── Home.tsx             # Trang chủ
│   └── VocabularyList.tsx   # Danh sách từ vựng
├── App.tsx                   # Main app component
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 🗄️ Database

Ứng dụng sử dụng **IndexedDB** (qua Dexie) để lưu trữ:
- Từ vựng (vocabularies)
- Tiến độ học tập (progress)

Dữ liệu được seed tự động khi lần đầu mở app.

## 🔧 Công nghệ sử dụng

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Dexie** - IndexedDB wrapper
- **Tailwind CSS** - Styling
- **Vite PWA Plugin** - PWA support

## 📝 Ghi chú

- Audio hiện tại sử dụng Web Speech API (browser TTS)
- Để thêm audio files thật, đặt trong `public/audio/` và cập nhật `audioUrl` trong database
- Service Worker tự động cache tất cả assets khi build production
- PWA icons: Cần tạo `pwa-192x192.png` và `pwa-512x512.png` trong `public/` (xem `scripts/create-icons.md`)

## 🎯 Tính năng đã hoàn thành

### ✅ Core Features
- [x] Học từ vựng HSK 1-4
- [x] Phát âm với audio (Web Speech API)
- [x] Tìm kiếm và lọc từ vựng
- [x] Hoạt động offline 100%
- [x] PWA - Cài đặt như app

### ✅ AI Features
- [x] Speech-to-text (nhận diện giọng nói)
- [x] Pronunciation scoring (chấm phát âm)
- [x] Handwriting recognition (nhận diện viết chữ)

### ✅ Progress Tracking
- [x] Theo dõi tiến độ học tập
- [x] Thống kê (đã học, đang học, chưa học)
- [x] Streak (ngày học liên tiếp)
- [x] Words to review
- [x] Export/Import dữ liệu

### ✅ UX
- [x] Mobile-first design
- [x] Touch-friendly
- [x] One-hand usage
- [x] Smooth animations
- [x] Dark mode ready (có thể thêm sau)

## 🐛 Troubleshooting

### PWA không install được:
- Đảm bảo chạy trên HTTPS hoặc localhost
- Kiểm tra manifest.json trong DevTools > Application > Manifest
- Kiểm tra icons đã có trong `public/` chưa

### Audio không phát:
- Kiểm tra browser có hỗ trợ Web Speech API
- Trên mobile, có thể cần user interaction trước khi phát audio
- Chrome/Edge: Hỗ trợ tốt
- Safari: Hỗ trợ hạn chế

### Speech Recognition không hoạt động:
- Chỉ hoạt động trên Chrome/Edge (desktop & mobile)
- Safari không hỗ trợ Web Speech API
- Cần microphone permission

### Database không load:
- Mở DevTools > Application > IndexedDB để kiểm tra
- Clear storage và reload nếu cần
- Kiểm tra console có lỗi không

### Build lỗi:
- Xóa `node_modules` và `package-lock.json`
- Chạy lại `npm install`
- Kiểm tra Node.js version (cần 18+)

## 📄 License

MIT

