# QUICK START - Bắt đầu ngay

## 🚀 Chạy ứng dụng trong 3 bước

### Bước 1: Cài đặt
```bash
npm install
```

### Bước 2: Chạy development
```bash
npm run dev
```

### Bước 3: Mở browser
Ứng dụng tự động mở tại `http://localhost:3000`

## ✅ Kiểm tra hoạt động

1. **Trang chủ:** Hiển thị danh sách HSK 1-4
2. **Từ vựng:** Click "Xem tất cả từ vựng"
3. **Phát âm:** Click nút play trên mỗi từ
4. **Luyện tập:** Click "Luyện tập" trên từ vựng
5. **Tiến độ:** Click "Tiến độ học tập" từ trang chủ

## 🎯 Test Offline

1. Mở DevTools (F12)
2. Tab **Network**
3. Chọn **Offline**
4. Reload trang - App vẫn hoạt động!

## 📱 Test PWA Install

### Chrome/Edge:
- Icon "Install" trên address bar
- Hoặc menu > "Install app"

### Mobile:
- Menu > "Add to Home Screen"

## 🐛 Nếu gặp lỗi

### Port đã được sử dụng:
Sửa `vite.config.ts`:
```typescript
server: {
  port: 3001, // Đổi port
}
```

### Database không load:
- Clear browser storage: DevTools > Application > Clear storage
- Reload trang

### Module not found:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Build Production

```bash
npm run build
npm run preview
```

## 🚀 Deploy

Xem `DEPLOY_GUIDE.md` để deploy lên Vercel, Netlify, Firebase, etc.

---

**Chúc bạn học tốt! 🎉**

