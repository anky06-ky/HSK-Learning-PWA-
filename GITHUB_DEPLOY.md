# 🚀 DEPLOY TỪ GITHUB - CỰC KỲ ĐƠN GIẢN

## ✅ Code đã có trên GitHub!

Repository: https://github.com/anky06-ky/HSK-Learning-PWA-

---

## 🌐 CÁCH 1: VERCEL (KHUYẾN NGHỊ - 1 PHÚT)

### Bước 1: Vào Vercel
https://vercel.com

### Bước 2: Đăng nhập bằng GitHub
Click "Continue with GitHub"

### Bước 3: Import Project
1. Click **"Add New..."** > **"Project"**
2. Tìm repository: `anky06-ky/HSK-Learning-PWA-`
3. Click **"Import"**

### Bước 4: Cấu hình (Tự động)
- **Framework Preset:** Vite (tự động detect)
- **Root Directory:** `./` (mặc định)
- **Build Command:** `npm run build` (tự động)
- **Output Directory:** `dist` (tự động)

### Bước 5: Deploy
Click **"Deploy"**

### ✅ Xong!
Vercel tự động:
- Build project
- Deploy lên HTTPS
- Tạo link: `https://hsk-learning-pwa.vercel.app`
- **Auto-deploy mỗi khi push code lên GitHub!**

---

## 🌐 CÁCH 2: NETLIFY (CŨNG RẤT ĐƠN GIẢN)

### Bước 1: Vào Netlify
https://app.netlify.com

### Bước 2: Đăng nhập bằng GitHub
Click "Sign up with GitHub"

### Bước 3: Import từ Git
1. Click **"Add new site"** > **"Import an existing project"**
2. Chọn **"GitHub"**
3. Tìm repository: `anky06-ky/HSK-Learning-PWA-`
4. Click **"Import"**

### Bước 4: Cấu hình Build
- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Bước 5: Deploy
Click **"Deploy site"**

### ✅ Xong!
Netlify tự động:
- Build và deploy
- Tạo link: `https://random-name.netlify.app`
- **Auto-deploy mỗi khi push code!**

---

## 🌐 CÁCH 3: GITHUB PAGES (MIỄN PHÍ)

### Bước 1: Enable GitHub Pages
1. Vào repository trên GitHub
2. **Settings** > **Pages**
3. **Source:** Chọn **"GitHub Actions"**
4. Save

### Bước 2: Workflow tự động chạy
- GitHub Actions workflow đã có sẵn (`.github/workflows/deploy.yml`)
- Tự động chạy khi push code
- Deploy lên: `https://anky06-ky.github.io/HSK-Learning-PWA-/`

### ✅ Xong!
Mỗi khi push code, GitHub tự động:
- Build project
- Deploy lên GitHub Pages
- Có link HTTPS miễn phí

---

## 🎯 SO SÁNH

| Platform | Thời gian setup | Auto-deploy | Custom domain | Miễn phí |
|----------|----------------|-------------|---------------|----------|
| **Vercel** | 1 phút | ✅ | ✅ | ✅ |
| **Netlify** | 2 phút | ✅ | ✅ | ✅ |
| **GitHub Pages** | 1 phút | ✅ | ✅ | ✅ |

**Khuyến nghị:** Dùng **Vercel** - nhanh nhất, dễ nhất!

---

## 📝 LƯU Ý

### Sau khi deploy:
1. **Test PWA install:**
   - Desktop: Icon install trên address bar
   - Mobile: "Add to Home Screen"

2. **Test offline:**
   - DevTools > Network > Offline
   - Reload trang - vẫn hoạt động!

3. **Share link:**
   - Gửi link cho mọi người
   - Họ có thể cài đặt như app!

---

## 🔄 Auto-deploy

Sau khi setup xong:
- **Mỗi khi push code lên GitHub** → Tự động deploy lại
- **Không cần làm gì thêm!**

---

**Chúc bạn deploy thành công! 🎉**

