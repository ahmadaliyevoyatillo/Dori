// controllers/diseaseController.js - Kasalliklar katalogi va batafsil ma'lumotlar boshqaruvi

const Disease = require('../models/Disease');
const Medicine = require('../models/Medicine');
const db = require('../models/db');

module.exports = {
  // 1. Kasalliklar ro'yxati (GET)
  getCatalog: async (req, res) => {
    const { search } = req.query;
    try {
      const filters = { search: search || '' };
      const diseases = await Disease.getAll(filters);

      // Har bir kasallikning sevimliligini tekshiramiz
      const user = req.session.user;
      const disWithFavs = [];

      for (const d of diseases) {
        const isFav = user ? await Medicine.isFavorite(user.email, d.id, 'disease') : false;
        
        // Tavsiya etilgan dorilar sonini olish
        const recommendedMeds = await Disease.getRecommendedMedicines(d.id);

        disWithFavs.push({ ...d, isFavorite: isFav, recommendedCount: recommendedMeds.length });
      }

      res.render('diseases', {
        title: res.locals.t('nav_diseases'),
        diseases: disWithFavs,
        searchVal: filters.search
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 2. Kasallik batafsil sahifasi (GET)
  getDetails: async (req, res) => {
    const id = req.params.id;
    const user = req.session.user;
    try {
      const dis = await Disease.getById(id);
      if (!dis) {
        return res.status(404).render('404', { title: "404 - Topilmadi" });
      }

      // Ko'rishlarni oshirish
      await Disease.incrementViews(id);

      // Oxirgi ko'rilganlarga saqlash (faqat kirgan bo'lsa)
      if (user) {
        db.run(
          "INSERT INTO recently_viewed (user_email, item_type, item_id, viewed_at) VALUES (?, 'disease', ?, ?)",
          [user.email, id, Date.now()]
        );
      }

      const isFav = user ? await Medicine.isFavorite(user.email, id, 'disease') : false;

      // Tavsiya qilinadigan dorilarni bazadan olish
      const recommendedMeds = await Disease.getRecommendedMedicines(id);

      res.render('disease-details', {
        title: dis[`name_${res.locals.lang}`],
        dis,
        isFav,
        recommendedMeds
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  }
};
