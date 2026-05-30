// server.js - Express server yadrosi va ulanishlari

require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./models/db'); // Baza avtomatik ravishda yuklanadi va jadvallar migratsiya bo'ladi

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. EXPRESS SOZLAMALARI VA SHABLONIZATOR ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view')); // Shablonlar papkasi 'view' deb nomlangan

// --- 2. MIDDLEWARE O'RNATISh ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'dori_default_secure_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 kunlik sessiya
  }
}));

// Statik papkalar
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Til va foydalanuvchi contextini shablonlarga ulash middleware
const { setUserContext } = require('./middleware/auth');
app.use(setUserContext);

// --- 3. MAHSUS API YO'NALISHLARI (Til, Mavzu, Qidiruv) ---

// A. Til almashtirish marshruti
app.get('/set-language/:lang', (req, res) => {
  const lang = req.params.lang === 'en' ? 'en' : 'uz';
  res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false }); // 1 yillik cookie
  res.redirect(req.headers.referer || '/');
});

// B. Mavzu (Dark Mode) almashtirish marshruti
app.get('/set-theme/:theme', (req, res) => {
  const theme = req.params.theme === 'dark' ? 'dark' : 'light';
  res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false });
  res.redirect(req.headers.referer || '/');
});

// C. AJAX Qidiruv Takliflari API (Auto-completion)
app.get('/api/search-suggest', (req, res) => {
  const val = (req.query.q || '').trim().toLowerCase();
  if (val.length < 2) {
    return res.json([]);
  }

  // SQLite-dan dorilar va kasalliklarni qidirish
  const queryMeds = "SELECT id, name_uz, name_en FROM medicines WHERE name_uz LIKE ? OR name_en LIKE ? LIMIT 4";
  const queryDis = "SELECT id, name_uz, name_en FROM diseases WHERE name_uz LIKE ? OR name_en LIKE ? LIMIT 4";
  const param = `%${val}%`;

  db.all(queryMeds, [param, param], (errM, rowsMeds) => {
    if (errM) return res.status(500).json([]);
    
    db.all(queryDis, [param, param], (errD, rowsDis) => {
      if (errD) return res.status(500).json([]);

      const results = [];
      if (rowsMeds) {
        rowsMeds.forEach(m => results.push({ id: m.id, name_uz: m.name_uz, name_en: m.name_en, type: 'medicine' }));
      }
      if (rowsDis) {
        rowsDis.forEach(d => results.push({ id: d.id, name_uz: d.name_uz, name_en: d.name_en, type: 'disease' }));
      }
      return res.json(results);
    });
  });
});

// --- 4. ASOSIY SAHIFA VA BIZNES MARSHRUTLAR ---
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(homeRoutes);
app.use(authRoutes);
app.use(medicineRoutes);
app.use(diseaseRoutes);
app.use(adminRoutes);

// --- 5. HATO (404) SAHIFASINI BOSHQARISH ---
app.use((req, res) => {
  res.status(404).render('404', { title: "404 - Topilmadi" });
});

// --- 6. SERVERNI ISHGA TUSHIRISH ---
app.listen(PORT, () => {
  console.log(`Dori.uz serveri ko'tarildi: http://localhost:${PORT}`);
});
