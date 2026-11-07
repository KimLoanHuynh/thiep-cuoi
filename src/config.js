// ====== SỬA THÔNG TIN Ở ĐÂY ======
export const wedding = {
  bride: "Kim An",
  groom: "Thành Thứ",
  date: "2026-12-16T23:59:59+07:00", // dùng cho đếm ngược
  weekday: "Thứ Tư",
  displayDate: "16.12.2026",
};

export const events = [
  { title: "Tân hôn", time: "11:00, Thứ Tư 16.12.2026", place: "Nhà Chú Rể / Phú Yên", address: "Thôn Phước Bình Nam, phường Phú Yên, tỉnh Đắk Lắk", map: "https://maps.google.com" },
  { title: "Vu Quy", time: "10:00, Thứ Ba 15.12.2026", place: "Nhà hàng tiệc cưới Lê Ngươm / Phú Yên", address: "28Q5+756, Đường Tránh TP Tuy Hòa, phường Phú Yên, tỉnh Đắk Lắk", map: "https://share.google/4LfdfqudMRQJby7Bs" },
];

export const story = [
  {
    year: "2024",
    title: "Lần đầu gặp nhau",
    text: "Giữa quê nhà Phú Yên, một buổi gặp gỡ giản dị mà ai ngờ lại là trang đầu tiên của câu chuyện tình yêu này.",
    photo: `${import.meta.env.BASE_URL}images/story-1.jpg`,
    caption: "Phú Yên, nơi mọi thứ bắt đầu",
  },
  {
    year: "2025",
    title: "Cùng nhau viết tiếp",
    text: "Phố núi Pleiku se lạnh, đủ để hai đứa nắm tay nhau chặt hơn. Những ngày yêu thương cứ thế đầy lên, bình dị mà nhớ mãi.",
    photo: `${import.meta.env.BASE_URL}images/story-2.jpg`,
    caption: "Pleiku, những ngày yêu thương",
  },
  {
    year: "2026",
    title: "Về chung một nhà",
    text: "Có những tháng ngày xa cách, người vào Sài Gòn, người ở nơi xứ xa. Nhưng sau tất cả, trời vẫn se duyên để chúng mình về chung một mái nhà.",
    photo: `${import.meta.env.BASE_URL}images/story-3.jpg`,
    caption: "Và chúng mình đã về với nhau",
  },
];

// Bỏ ảnh vào public/images rồi sửa tên file ở đây
export const cover = `${import.meta.env.BASE_URL}images/cover.jpg`;
export const cover2 = `${import.meta.env.BASE_URL}images/cover2.jpg`;
export const nen = `${import.meta.env.BASE_URL}images/bg.jpg`;
export const album = [`${import.meta.env.BASE_URL}images/1.jpg`, `${import.meta.env.BASE_URL}images/2.jpg`, `${import.meta.env.BASE_URL}images/3.jpg`, `${import.meta.env.BASE_URL}images/4.jpg`, `${import.meta.env.BASE_URL}images/5.jpg`, `${import.meta.env.BASE_URL}images/6.jpg`, `${import.meta.env.BASE_URL}images/7.jpg`, `${import.meta.env.BASE_URL}images/8.jpg`, `${import.meta.env.BASE_URL}images/9.jpg`, `${import.meta.env.BASE_URL}images/10.jpg`, `${import.meta.env.BASE_URL}images/11.jpg`, `${import.meta.env.BASE_URL}images/12.jpg`, `${import.meta.env.BASE_URL}images/13.jpg`, `${import.meta.env.BASE_URL}images/14.jpg`, `${import.meta.env.BASE_URL}images/15.jpg`, `${import.meta.env.BASE_URL}images/16.jpg`, `${import.meta.env.BASE_URL}images/17.jpg`, `${import.meta.env.BASE_URL}images/18.jpg`, `${import.meta.env.BASE_URL}images/19.jpg`];

export const music = `${import.meta.env.BASE_URL}music/nhac.mp3`;

// Màn hình bìa "nhấn để mở thiệp"
export const bia = {
  image: `${import.meta.env.BASE_URL}images/bia.jpg`,   // ảnh bìa (minh họa/ảnh cưới), đặt trong public/images
  hasText: false,             // true nếu ảnh bìa đã có sẵn chữ (tên, ngày...) -> trang sẽ không chèn thêm chữ
  defaultGuest: "Bằng hữu gần xa",
  button: "Mở thiệp",
};

export const gifts = [
  { who: "Chú rể", bank: "Tên ngân hàng", owner: "TO THANH THU", number: "0123456789", qr: `${import.meta.env.BASE_URL}images/qr-chu-re.png` },
  { who: "Cô dâu", bank: "Tên ngân hàng", owner: "HUYNH THI KIM AN", number: "0123456789", qr: `${import.meta.env.BASE_URL}images/qr-co-dau.png` },
];
