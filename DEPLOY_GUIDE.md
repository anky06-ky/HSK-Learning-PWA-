# HƯỚNG DẪN DEPLOY

## 📦 Build Production

### 1. Build ứng dụng

```bash
npm run build
```

Files sẽ được build vào thư mục `dist/`

### 2. Kiểm tra build

```bash
npm run preview
```

Mở `http://localhost:4173` để kiểm tra production build

## 🚀 Deploy lên các nền tảng

### Option 1: Vercel (Khuyến nghị - Miễn phí)

1. **Cài đặt Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Hoặc deploy qua GitHub:**
   - Push code lên GitHub
   - Vào https://vercel.com
   - Import project từ GitHub
   - Vercel tự động detect Vite và deploy

**Ưu điểm:**
- Miễn phí
- HTTPS tự động
- Auto-deploy từ GitHub
- CDN global
- Custom domain

### Option 2: Netlify

1. **Cài đặt Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Build command:**
```bash
npm run build
```

3. **Publish directory:** `dist`

4. **Deploy:**
```bash
netlify deploy --prod
```

**Hoặc qua web:**
- Vào https://app.netlify.com
- Kéo thả thư mục `dist/` vào Netlify
- Hoặc kết nối GitHub repo

### Option 3: GitHub Pages

1. **Cài đặt gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Thêm vào package.json:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/hsk-learning-pwa"
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Cấu hình GitHub:**
   - Settings > Pages
   - Source: `gh-pages` branch
   - Path: `/ (root)`

### Option 4: Firebase Hosting

1. **Cài đặt Firebase CLI:**
```bash
npm i -g firebase-tools
```

2. **Login:**
```bash
firebase login
```

3. **Init project:**
```bash
firebase init hosting
```

4. **Cấu hình:**
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

5. **Deploy:**
```bash
npm run build
firebase deploy
```

### Option 5: Cloudflare Pages

1. **Push code lên GitHub/GitLab**

2. **Vào Cloudflare Dashboard:**
   - Pages > Create a project
   - Connect Git repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Framework preset: `Vite`

3. **Deploy tự động từ Git**

## 🔧 Cấu hình PWA

### 1. Tạo Icons

Tạo 2 file icon trong `public/`:
- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)

**Công cụ tạo icon:**
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

### 2. Kiểm tra Manifest

Sau khi deploy, kiểm tra:
- DevTools > Application > Manifest
- Đảm bảo tất cả icons load được
- Kiểm tra `start_url`, `scope`

### 3. Test PWA Install

- **Desktop:** Icon install trên address bar
- **Mobile:** "Add to Home Screen"
- **Test offline:** Tắt mạng, reload trang

## ✅ Checklist Release

### Trước khi deploy:

- [ ] Build production thành công (`npm run build`)
- [ ] Preview production build (`npm run preview`)
- [ ] Test offline mode
- [ ] Test PWA install
- [ ] Test trên mobile devices
- [ ] Kiểm tra manifest.json
- [ ] Icons PWA đã có (192x192, 512x512)
- [ ] Service Worker hoạt động
- [ ] IndexedDB hoạt động
- [ ] Audio playback hoạt động
- [ ] Speech recognition hoạt động (nếu có)
- [ ] Tất cả routes hoạt động

### Sau khi deploy:

- [ ] Test trên HTTPS
- [ ] Test PWA install trên production
- [ ] Test offline mode trên production
- [ ] Kiểm tra performance (Lighthouse)
- [ ] Test trên nhiều browsers:
  - [ ] Chrome/Edge
  - [ ] Safari (iOS)
  - [ ] Firefox
- [ ] Kiểm tra responsive trên nhiều kích thước màn hình

## 🐛 Troubleshooting

### PWA không install được sau deploy:

1. **Kiểm tra HTTPS:**
   - PWA chỉ hoạt động trên HTTPS hoặc localhost
   - Đảm bảo domain có SSL certificate

2. **Kiểm tra manifest:**
   - DevTools > Application > Manifest
   - Xem có lỗi gì không

3. **Kiểm tra Service Worker:**
   - DevTools > Application > Service Workers
   - Đảm bảo SW đã register

4. **Clear cache:**
   - Clear browser cache
   - Hard reload (Ctrl+Shift+R)

### Build lỗi:

1. **Lỗi TypeScript:**
```bash
npm run build
# Sửa các lỗi TypeScript
```

2. **Lỗi dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Lỗi Vite:**
```bash
rm -rf dist .vite
npm run build
```

### Performance issues:

1. **Bundle size lớn:**
   - Kiểm tra `npm run build` output
   - Dùng `vite-bundle-visualizer` để phân tích
   - Code splitting nếu cần

2. **Images/Audio lớn:**
   - Compress images
   - Lazy load audio
   - Dùng CDN nếu có

## 📊 Performance Targets

- **Lighthouse Score:**
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90
  - PWA: > 90

- **Load time:** < 3 giây
- **First Contentful Paint:** < 1.5 giây
- **Time to Interactive:** < 3 giây

## 🔄 Continuous Deployment

### GitHub Actions (Vercel/Netlify)

Tự động deploy khi push code:

1. **Vercel:** Tự động detect và setup
2. **Netlify:** Tự động detect và setup
3. **GitHub Pages:** Cần setup workflow (xem `.github/workflows/deploy.yml`)

## 📝 Notes

- **Environment Variables:** Nếu cần, thêm vào `.env.production`
- **API Keys:** Không commit API keys vào code
- **Analytics:** Có thể thêm Google Analytics sau
- **Error Tracking:** Có thể thêm Sentry sau

