# Tạo PWA Icons

## Yêu cầu

Cần 2 file icon trong thư mục `public/`:
- `pwa-192x192.png` (192x192 pixels)
- `pwa-512x512.png` (512x512 pixels)

## Cách tạo

### Option 1: Dùng công cụ online

1. Vào https://www.pwabuilder.com/imageGenerator
2. Upload logo/icon của bạn
3. Download các kích thước cần thiết
4. Đặt vào thư mục `public/`

### Option 2: Dùng Photoshop/GIMP

1. Tạo file 512x512px
2. Design icon
3. Export 512x512px → `pwa-512x512.png`
4. Resize xuống 192x192px → `pwa-192x192.png`

### Option 3: Dùng ImageMagick (CLI)

```bash
# Nếu có file icon gốc
convert icon.png -resize 512x512 public/pwa-512x512.png
convert icon.png -resize 192x192 public/pwa-192x192.png
```

## Gợi ý thiết kế

- Nền: Màu primary (#3b82f6) hoặc gradient
- Icon: Chữ "HSK" hoặc biểu tượng học tập
- Style: Đơn giản, dễ nhận biết ở kích thước nhỏ
- Format: PNG với transparency (nếu cần)

## Test

Sau khi tạo icons, test bằng:
1. `npm run build`
2. `npm run preview`
3. DevTools > Application > Manifest
4. Kiểm tra icons hiển thị đúng

