# Thiệp cưới Kim An & Thành Thứ

Chạy local:
    npm install
    npm run dev        # mở http://localhost:5173

Sửa thông tin: src/config.js
Ảnh: bỏ vào public/images (cover.jpg, 1.jpg ... 6.jpg, qr-mung-cuoi.png)
Nhạc: public/music/nhac.mp3

Deploy Firebase Hosting:
    npm run build
    npm i -g firebase-tools && firebase login
    firebase init hosting   # public = dist, single-page app = Yes
    firebase deploy
