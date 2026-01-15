# HƯỚNG DẪN CHẠY LOCAL

## Bước 1: Cài đặt Node.js

Đảm bảo bạn đã cài Node.js 18+:
```bash
node --version
```

Nếu chưa có, tải tại: https://nodejs.org/

## Bước 2: Cài đặt dependencies

```bash
npm install
```

## Bước 3: Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ tự động mở tại `http://localhost:3000`

## Bước 4: Test offline mode

1. Mở DevTools (F12)
2. Vào tab **Network**
3. Chọn **Offline** trong dropdown
4. Reload trang - app vẫn hoạt động bình thường

## Bước 5: Test PWA install

### Chrome/Edge Desktop:
1. Click icon **Install** trên thanh address bar
2. Hoặc vào menu > **Install app**

### Chrome Android:
1. Menu > **Add to Home screen**
2. Hoặc chờ thông báo tự động

### Safari iOS:
1. Share button > **Add to Home Screen**

## Kiểm tra Database

1. Mở DevTools (F12)
2. Vào tab **Application**
3. **Storage** > **IndexedDB** > **HSKLearningDB**
4. Kiểm tra tables: `vocabularies`, `progress`

## Troubleshooting

### Port 3000 đã được sử dụng:
Sửa trong `vite.config.ts`:
```typescript
server: {
  port: 3001, // Đổi port khác
}
```

### Database không seed:
- Xóa IndexedDB trong DevTools > Application > Storage > Clear site data
- Reload trang

### PWA không install:
- Đảm bảo chạy trên HTTPS hoặc localhost
- Kiểm tra manifest trong DevTools > Application > Manifest

## Build Production

```bash
npm run build
```

Files sẽ được build vào `dist/`

Để preview:
```bash
npm run preview
```

## Deploy

Có thể deploy lên:
- **Vercel**: `vercel deploy`
- **Netlify**: Kéo thả thư mục `dist/`
- **GitHub Pages**: Setup GitHub Actions
- **Firebase Hosting**: `firebase deploy`

