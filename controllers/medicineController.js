// controllers/medicineController.js - Dorilar katalogi va tafsilotlari boshqaruvi

const Medicine = require('../models/Medicine');
const db = require('../models/db');

module.exports = {
  // 1. Dorilar katalogi (GET)
  getCatalog: async (req, res) => {
    const { category, prescription, sort, search } = req.query;
    try {
      const filters = {
        category: category || 'all',
        prescription: prescription || 'all',
        sort: sort || 'popular',
        search: search || ''
      };

      const medicines = await Medicine.getAll(filters);

      // Agar foydalanuvchi tizimga kirgan bo'lsa, har bir dorining sevimliligini tekshiramiz
      const user = req.session.user;
      const medsWithFavs = [];

      for (const m of medicines) {
        const isFav = user ? await Medicine.isFavorite(user.email, m.id) : false;
        medsWithFavs.push({ ...m, isFavorite: isFav });
      }

      res.render('medicines', {
        title: res.locals.t('nav_medicines'),
        medicines: medsWithFavs,
        filters
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 2. Dori batafsil tafsilotlari (GET)
  getDetails: async (req, res) => {
    const id = req.params.id;
    const user = req.session.user;
    try {
      const med = await Medicine.getById(id);
      if (!med) {
        return res.status(404).render('404', { title: "404 - Topilmadi" });
      }

      // Ko'rishlarni oshirish
      await Medicine.incrementViews(id);

      // Oxirgi ko'rilganlarga saqlash (faqat kirgan bo'lsa)
      if (user) {
        db.run(
          "INSERT INTO recently_viewed (user_email, item_type, item_id, viewed_at) VALUES (?, 'medicine', ?, ?)",
          [user.email, id, Date.now()]
        );
      }

      const isFav = user ? await Medicine.isFavorite(user.email, id) : false;
      const reviews = await Medicine.getReviews(id);

      // O'xshash dorilarni olish (bir xil kategoriyadagi)
      const similar = await Medicine.getAll({ category: med.category, sort: 'popular' });
      const filteredSimilar = similar.filter(m => m.id !== med.id).slice(0, 3);

      res.render('medicine-details', {
        title: med[`name_${res.locals.lang}`],
        med,
        isFav,
        reviews,
        similar: filteredSimilar
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 3. Fikr-mulohaza yozish (POST)
  postReview: async (req, res) => {
    const medicineId = req.params.id;
    const { username, rating, comment } = req.body;
    try {
      await Medicine.addReview(medicineId, username, rating, comment);
      return res.json({ success: true, message: res.locals.lang === 'en' ? "Thank you, your review was submitted!" : "Sharhingiz qabul qilindi, rahmat!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Sharh yozishda xatolik yuz berdi" });
    }
  },

  // 4. Sevimlilarga qo'shish/o'chirish (POST JSON)
  toggleFav: async (req, res) => {
    const { itemId, itemType } = req.body;
    const user = req.session.user;
    
    if (!user) {
      return res.status(401).json({ error: "Tizimga kiring!" });
    }

    try {
      const added = await Medicine.toggleFavorite(user.email, itemId, itemType);
      return res.json({ success: true, added });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Xatolik yuz berdi" });
    }
  }
};
