// controllers/authController.js - Tizimga kirish, chiqish va profil boshqaruvi

const User = require('../models/User');
const db = require('../models/db');
const bcrypt = require('bcryptjs');

module.exports = {
  // 1. Tizimga kirish (Login POST)
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ error: res.locals.lang === 'en' ? "Incorrect email or password!" : "Elektron pochta yoki parol xato!" });
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res.status(400).json({ error: res.locals.lang === 'en' ? "Incorrect email or password!" : "Elektron pochta yoki parol xato!" });
      }

      // Sessiyani sozlash
      req.session.user = {
        email: user.email,
        name: user.name,
        role: user.role,
        joinedDate: user.joinedDate
      };

      return res.json({ success: true, message: res.locals.lang === 'en' ? "Successfully logged in!" : "Tizimga muvaffaqiyatli kirdingiz!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server xatoligi" });
    }
  },

  // 2. Ro'yxatdan o'tish (Register POST)
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const exists = await User.findByEmail(email);
      if (exists) {
        return res.status(400).json({ error: res.locals.lang === 'en' ? "User with this email already exists!" : "Ushbu elektron pochta manzili bilan ro'yxatdan o'tgan foydalanuvchi mavjud!" });
      }

      const newUser = await User.create(name, email, password);
      
      // Sessiyani sozlash
      req.session.user = {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        joinedDate: newUser.joinedDate
      };

      return res.json({ success: true, message: res.locals.lang === 'en' ? "Registration completed successfully!" : "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server xatoligi" });
    }
  },

  // 3. Tizimdan chiqish (Logout GET)
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) console.error(err);
      res.redirect('/');
    });
  },

  // 4. Profil sahifasi (GET)
  getProfile: async (req, res) => {
    const user = req.session.user;
    try {
      // Qidiruv tarixi
      const history = await new Promise((resolve) => {
        db.all("SELECT query FROM search_history WHERE user_email = ? ORDER BY id DESC LIMIT 8", [user.email], (err, rows) => {
          resolve(rows ? rows.map(r => r.query) : []);
        });
      });

      // Oxirgi ko'rilganlar
      const viewed = await new Promise((resolve) => {
        db.all("SELECT item_type, item_id FROM recently_viewed WHERE user_email = ? ORDER BY viewed_at DESC LIMIT 5", [user.email], async (err, rows) => {
          const items = [];
          if (rows) {
            for (const r of rows) {
              if (r.item_type === 'medicine') {
                db.get("SELECT id, name_uz, name_en FROM medicines WHERE id = ?", [r.item_id], (mErr, mRow) => {
                  if (mRow) items.push({ type: 'medicine', ...mRow });
                });
              } else {
                db.get("SELECT id, name_uz, name_en FROM diseases WHERE id = ?", [r.item_id], (dErr, dRow) => {
                  if (dRow) items.push({ type: 'disease', ...dRow });
                });
              }
            }
          }
          // Kichik vaqt kutish (asinxron bog'liqliklar uchun)
          setTimeout(() => resolve(items), 100);
        });
      });

      res.render('profile', { title: res.locals.t('profile_title'), history, viewed });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 5. Profilni yangilash (POST)
  updateProfile: async (req, res) => {
    const { name, password } = req.body;
    const user = req.session.user;
    try {
      await User.updateProfile(user.email, name, password || null);
      
      // Sessiyani yangilash
      req.session.user.name = name;
      
      res.redirect('/profile?saved=true');
    } catch (err) {
      console.error(err);
      res.redirect('/profile?error=true');
    }
  },

  // 6. Tarixni tozalash (POST)
  clearHistory: (req, res) => {
    const user = req.session.user;
    db.run("DELETE FROM search_history WHERE user_email = ?", [user.email], (err) => {
      if (err) return res.status(500).json({ error: "Xatolik" });
      res.json({ success: true });
    });
  }
};
