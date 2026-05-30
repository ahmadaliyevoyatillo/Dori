# Dori.uz - Tibbiy Ma'lumotlar Portali (Node.js Express MVC)

Ushbu loyiha dorilar va kasalliklar haqidagi to'liq ma'lumotlar bazasi, taqqoslash va qidiruv tizimini o'z ichiga oladi. U **Node.js, Express, EJS va SQLite** texnologiyalari yordamida **MVC (Model-View-Controller)** arxitekturasida yozilgan.

## 🚀 O'rnatish va Ishga tushirish

Loyihani kompyuteringizda ishga tushirish uchun quyidagi oddiy amallarni bajaring:

1. **Paketlarni o'rnatish:**
   Loyihaning ildiz jildida terminalni oching va quyidagi buyruqni bering:
   ```bash
   npm install
   ```

2. **Serverni ishga tushirish:**
   O'rnatish muvaffaqiyatli yakunlangach, serverni ko'taring:
   ```bash
   npm start
   ```

3. **Brauzerda ko'rish:**
   Brauzerni oching va quyidagi manzilga kiring:
   [http://localhost:3000](http://localhost:3000)

## 🔑 Test uchun Hisoblar (Default Accounts)

Ma'lumotlar bazasi avtomatik ravishda boshlang'ich ma'lumotlar va quyidagi foydalanuvchilar bilan to'ldiriladi:
* **Admin Hisobi:**
  * **Email:** `admin@dori.uz`
  * **Parol:** `admin123`
* **Oddiy Foydalanuvchi Hisobi:**
  * **Email:** `user@dori.uz`
  * **Parol:** `user123`

## 📁 Palka va Fayllar Strukturasi

* `controllers/` — So'rovlarni qabul qiluvchi va EJS shablonlarini ma'lumotlar bilan render qiluvchi boshqaruvchilar.
* `middleware/` — Foydalanuvchi tizimga kirganligi va huquqlarini (admin) tekshiruvchi filtrlar.
* `models/` — SQLite bazasi bilan to'g'ridan-to'g'ri ishlovchi modellar (`db.js` da ma'lumotlar bazasi jadvallari yaratiladi).
* `public/` — Tashqi statik resurslar (`style.css`, client JS fayllari).
* `routes/` — Sayt yo'nalishlari (routing).
* `view/` — EJS shablon sahifalari va layout elementlari.
* `server.js` — Express ilovasining ishga tushuvchi yadrosi.
