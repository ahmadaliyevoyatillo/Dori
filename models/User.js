// models/User.js - Foydalanuvchi ma'lumotlari modeli (Promise-based)

const db = require('./db');
const bcrypt = require('bcryptjs');

class User {
  // 1. Email orqali topish
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email.toLowerCase()], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // 2. Yangi foydalanuvchi yaratish
  static create(name, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(password, 10);
        const today = new Date().toISOString().split('T')[0];
        
        db.run(
          "INSERT INTO users (email, name, passwordHash, role, joinedDate) VALUES (?, ?, ?, ?, ?)",
          [email.toLowerCase(), name, hash, 'user', today],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ email, name, role: 'user', joinedDate: today });
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // 3. Profilni tahrirlash (Ism yoki parol o'zgarishi)
  static updateProfile(email, name, newPassword = null) {
    return new Promise(async (resolve, reject) => {
      try {
        if (newPassword) {
          const hash = await bcrypt.hash(newPassword, 10);
          db.run(
            "UPDATE users SET name = ?, passwordHash = ? WHERE email = ?",
            [name, hash, email.toLowerCase()],
            function(err) {
              if (err) reject(err);
              else resolve(true);
            }
          );
        } else {
          db.run(
            "UPDATE users SET name = ? WHERE email = ?",
            [name, email.toLowerCase()],
            function(err) {
              if (err) reject(err);
              else resolve(true);
            }
          );
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // 4. Barcha foydalanuvchilarni olish (Admin uchun)
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT email, name, role, joinedDate FROM users ORDER BY joinedDate DESC", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = User;
