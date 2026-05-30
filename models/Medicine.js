// models/Medicine.js - Dorilar bilan ishlovchi ma'lumotlar modeli (Promise-based)

const db = require('./db');

class Medicine {
  // 1. Dorilarni filtrlash va saralash bilan olish
  static getAll(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM medicines WHERE 1=1";
      const params = [];

      // A. Qidiruv
      if (filters.search) {
        query += " AND (name_uz LIKE ? OR name_en LIKE ? OR description_uz LIKE ? OR description_en LIKE ?)";
        const val = `%${filters.search}%`;
        params.push(val, val, val, val);
      }

      // B. Kategoriya
      if (filters.category && filters.category !== 'all') {
        query += " AND category = ?";
        params.push(filters.category);
      }

      // C. Retsept holati
      if (filters.prescription && filters.prescription !== 'all') {
        const needsRx = filters.prescription === 'rx' ? 1 : 0;
        query += " AND prescription = ?";
        params.push(needsRx);
      }

      // D. Saralash
      if (filters.sort) {
        if (filters.sort === 'popular') {
          query += " ORDER BY views DESC";
        } else if (filters.sort === 'price_asc') {
          query += " ORDER BY price ASC";
        } else if (filters.sort === 'price_desc') {
          query += " ORDER BY price DESC";
        } else if (filters.sort === 'rating') {
          query += " ORDER BY rating DESC";
        } else if (filters.sort === 'alpha') {
          query += " ORDER BY name_uz ASC";
        }
      } else {
        query += " ORDER BY views DESC";
      }

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // 2. ID bo'yicha olish
  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM medicines WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // 3. Ko'rishlar sonini bittaga oshirish
  static incrementViews(id) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE medicines SET views = views + 1 WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  // 4. Dorini saqlash (Qo'shish yoki Tahrirlash)
  static save(m) {
    return new Promise((resolve, reject) => {
      if (m.id) {
        // Tahrirlash (Update)
        db.run(`
          UPDATE medicines SET
            name_uz = ?, name_en = ?, type_uz = ?, type_en = ?, category = ?, price = ?,
            manufacturer_uz = ?, manufacturer_en = ?, description_uz = ?, description_en = ?,
            usage_uz = ?, usage_en = ?, dosage_uz = ?, dosage_en = ?, sideEffects_uz = ?, sideEffects_en = ?,
            warnings_uz = ?, warnings_en = ?, prescription = ?
          WHERE id = ?
        `, [
          m.name_uz, m.name_en, m.type_uz, m.type_en, m.category, m.price,
          m.manufacturer_uz, m.manufacturer_en, m.description_uz, m.description_en,
          m.usage_uz, m.usage_en, m.dosage_uz, m.dosage_en, m.sideEffects_uz, m.sideEffects_en,
          m.warnings_uz, m.warnings_en, m.prescription ? 1 : 0, m.id
        ], function(err) {
          if (err) reject(err);
          else resolve(m);
        });
      } else {
        // Yangi dori qo'shish (Insert)
        const newId = "med-" + Date.now();
        const today = new Date().toISOString().split('T')[0];
        
        db.run(`
          INSERT INTO medicines (
            id, name_uz, name_en, type_uz, type_en, category, price,
            manufacturer_uz, manufacturer_en, description_uz, description_en,
            usage_uz, usage_en, dosage_uz, dosage_en, sideEffects_uz, sideEffects_en,
            warnings_uz, warnings_en, prescription, views, rating, createdDate
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 5.0, ?)
        `, [
          newId, m.name_uz, m.name_en, m.type_uz, m.type_en, m.category, m.price,
          m.manufacturer_uz, m.manufacturer_en, m.description_uz, m.description_en,
          m.usage_uz, m.usage_en, m.dosage_uz, m.dosage_en, m.sideEffects_uz, m.sideEffects_en,
          m.warnings_uz, m.warnings_en, m.prescription ? 1 : 0, today
        ], function(err) {
          if (err) {
            reject(err);
          } else {
            m.id = newId;
            resolve(m);
          }
        });
      }
    });
  }

  // 5. Dorini bazadan butunlay o'chirish
  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM medicines WHERE id = ?", [id], function(err) {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  // 6. Sharhlarni olish
  static getReviews(medicineId) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM reviews WHERE medicine_id = ? ORDER BY id DESC", [medicineId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // 7. Sharh qo'shish va o'rtacha reytingni qayta hisoblash
  static addReview(medicineId, username, rating, comment) {
    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().split('T')[0];
      
      db.serialize(() => {
        // Sharhni yozish
        db.run("INSERT INTO reviews (medicine_id, username, rating, comment, date) VALUES (?, ?, ?, ?, ?)",
          [medicineId, username, parseInt(rating), comment, today]
        );

        // O'rtacha reytingni qayta hisoblab yangilash
        db.get("SELECT AVG(rating) as avgRating FROM reviews WHERE medicine_id = ?", [medicineId], (err, row) => {
          if (row && row.avgRating) {
            const avg = parseFloat(row.avgRating.toFixed(1));
            db.run("UPDATE medicines SET rating = ? WHERE id = ?", [avg, medicineId], (updateErr) => {
              if (updateErr) reject(updateErr);
              else resolve({ medicineId, username, rating, comment, date: today });
            });
          } else {
            resolve({ medicineId, username, rating, comment, date: today });
          }
        });
      });
    });
  }

  // 8. Sevimlilar boshqaruvi
  static toggleFavorite(email, itemId, itemType = 'medicine') {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM favorites WHERE user_email = ? AND item_type = ? AND item_id = ?", 
        [email.toLowerCase(), itemType, itemId], 
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            // Bor bo'lsa o'chiramiz
            db.run("DELETE FROM favorites WHERE user_email = ? AND item_type = ? AND item_id = ?",
              [email.toLowerCase(), itemType, itemId],
              (delErr) => {
                if (delErr) reject(delErr);
                else resolve(false); // O'chirildi
              }
            );
          } else {
            // Yo'q bo'lsa qo'shamiz
            db.run("INSERT INTO favorites (user_email, item_type, item_id) VALUES (?, ?, ?)",
              [email.toLowerCase(), itemType, itemId],
              (insErr) => {
                if (insErr) reject(insErr);
                else resolve(true); // Qo'shildi
              }
            );
          }
        }
      );
    });
  }

  static getFavorites(email, itemType = 'medicine') {
    return new Promise((resolve, reject) => {
      let query = "";
      if (itemType === 'medicine') {
        query = `
          SELECT m.* FROM medicines m
          JOIN favorites f ON m.id = f.item_id
          WHERE f.user_email = ? AND f.item_type = 'medicine'
        `;
      } else {
        query = `
          SELECT d.* FROM diseases d
          JOIN favorites f ON d.id = f.item_id
          WHERE f.user_email = ? AND f.item_type = 'disease'
        `;
      }

      db.all(query, [email.toLowerCase()], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static isFavorite(email, itemId, itemType = 'medicine') {
    return new Promise((resolve, reject) => {
      if (!email) return resolve(false);
      db.get("SELECT 1 FROM favorites WHERE user_email = ? AND item_type = ? AND item_id = ?",
        [email.toLowerCase(), itemType, itemId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row !== undefined);
        }
      );
    });
  }
}

module.exports = Medicine;
