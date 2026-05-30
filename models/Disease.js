// models/Disease.js - Kasalliklar bilan ishlovchi ma'lumotlar modeli (Promise-based)

const db = require('./db');

class Disease {
  // 1. Kasalliklarni qidiruv bilan olish
  static getAll(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM diseases WHERE 1=1";
      const params = [];

      if (filters.search) {
        query += " AND (name_uz LIKE ? OR name_en LIKE ? OR description_uz LIKE ? OR description_en LIKE ? OR symptoms_uz LIKE ? OR symptoms_en LIKE ?)";
        const val = `%${filters.search}%`;
        params.push(val, val, val, val, val, val);
      }

      query += " ORDER BY views DESC";

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // 2. ID bo'yicha olish
  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM diseases WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // 3. Ko'rishlar sonini oshirish
  static incrementViews(id) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE diseases SET views = views + 1 WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  // 4. Tavsiya etilgan dorilar ro'yxatini olish
  static getRecommendedMedicines(diseaseId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT m.* FROM medicines m
        JOIN recommended_medicines rm ON m.id = rm.medicine_id
        WHERE rm.disease_id = ?
      `;
      db.all(query, [diseaseId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // 5. Kasallikni saqlash (Qo'shish yoki Tahrirlash)
  static save(d) {
    return new Promise((resolve, reject) => {
      if (d.id) {
        // Tahrirlash (Update)
        db.run(`
          UPDATE diseases SET
            name_uz = ?, name_en = ?, description_uz = ?, description_en = ?,
            symptoms_uz = ?, symptoms_en = ?, causes_uz = ?, causes_en = ?,
            prevention_uz = ?, prevention_en = ?, treatment_uz = ?, treatment_en = ?
          WHERE id = ?
        `, [
          d.name_uz, d.name_en, d.description_uz, d.description_en,
          d.symptoms_uz, d.symptoms_en, d.causes_uz, d.causes_en,
          d.prevention_uz, d.prevention_en, d.treatment_uz, d.treatment_en, d.id
        ], function(err) {
          if (err) reject(err);
          else resolve(d);
        });
      } else {
        // Yangi kasallik qo'shish (Insert)
        const newId = "dis-" + Date.now();
        
        db.run(`
          INSERT INTO diseases (
            id, name_uz, name_en, description_uz, description_en,
            symptoms_uz, symptoms_en, causes_uz, causes_en,
            prevention_uz, prevention_en, treatment_uz, treatment_en, views
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
        `, [
          newId, d.name_uz, d.name_en, d.description_uz, d.description_en,
          d.symptoms_uz, d.symptoms_en, d.causes_uz, d.causes_en,
          d.prevention_uz, d.prevention_en, d.treatment_uz, d.treatment_en
        ], function(err) {
          if (err) {
            reject(err);
          } else {
            d.id = newId;
            resolve(d);
          }
        });
      }
    });
  }

  // 6. O'chirish
  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM diseases WHERE id = ?", [id], function(err) {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = Disease;
