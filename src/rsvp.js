// Hiện lưu tạm trong trình duyệt (localStorage) để chạy thử.
// Khi deploy: thay 2 hàm này bằng Firebase Firestore hoặc Google Apps Script.
const KEY = "thiep-cuoi-wishes";
export function loadWishes() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
export function saveWish(wish) {
  const all = [{ ...wish, at: Date.now() }, ...loadWishes()];
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
  return all;
}
