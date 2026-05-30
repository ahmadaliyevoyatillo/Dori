// controllers/homeController.js - Bosh sahifa, Sevimlilar va Solishtirish boshqaruvchisi

const Medicine = require('../models/Medicine');
const Disease = require('../models/Disease');
const db = require('../models/db');

module.exports = {
  // 1. Bosh sahifa (GET)
  getHome: async (req, res) => {
    try {
      // Statistikalarni hisoblash
      const medsCount = await new Promise((resolve) => {
        db.get("SELECT COUNT(*) as count FROM medicines", (err, row) => resolve(row ? row.count : 0));
      });
      const disCount = await new Promise((resolve) => {
        db.get("SELECT COUNT(*) as count FROM diseases", (err, row) => resolve(row ? row.count : 0));
      });
      const searchesCount = await new Promise((resolve) => {
        db.get("SELECT COUNT(*) as count FROM search_history", (err, row) => resolve(row ? row.count + 3450 : 3450));
      });

      // Mashhur dorilarni olish (eng ko'p ko'rilgan 3 tasi)
      const trendingMeds = await Medicine.getAll({ sort: 'popular' });
      const slicedMeds = trendingMeds.slice(0, 3);

      // Mashhur kasalliklarni olish (eng ko'p ko'rilgan 3 tasi)
      const popularDis = await Disease.getAll();
      const slicedDis = popularDis.slice(0, 3);

      // Har bir dori va kasallik uchun isFavorite-ni tekshiramiz
      const user = req.session.user;
      const medsWithFavs = [];
      const disWithFavs = [];

      for (const m of slicedMeds) {
        const isFav = user ? await Medicine.isFavorite(user.email, m.id) : false;
        medsWithFavs.push({ ...m, isFavorite: isFav });
      }

      for (const d of slicedDis) {
        const isFav = user ? await Medicine.isFavorite(user.email, d.id, 'disease') : false;
        disWithFavs.push({ ...d, isFavorite: isFav });
      }

      res.render('home', {
        title: res.locals.t('nav_home'),
        medsCount,
        disCount,
        searchesCount,
        trendingMeds: medsWithFavs,
        popularDiseases: disWithFavs
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 2. Sevimlilar sahifasi (GET)
  getFavorites: async (req, res) => {
    const user = req.session.user;
    if (!user) {
      return res.redirect('/?login_required=true');
    }

    try {
      const favMeds = await Medicine.getFavorites(user.email, 'medicine');
      const favDiseases = await Medicine.getFavorites(user.email, 'disease');

      // isFavorite-ni har doim true qilib o'tkazamiz
      const meds = favMeds.map(m => ({ ...m, isFavorite: true }));
      const diseases = favDiseases.map(d => ({ ...d, isFavorite: true }));

      res.render('favorites', {
        title: res.locals.t('nav_favorites'),
        favMedicines: meds,
        favDiseases: diseases
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 3. Solishtirish sahifasi (GET)
  getCompare: async (req, res) => {
    const compareList = req.session.compareList || [];
    try {
      const meds = [];
      for (const id of compareList) {
        const med = await Medicine.getById(id);
        if (med) meds.push(med);
      }

      res.render('compare', {
        title: res.locals.t('nav_compare'),
        compareMedicines: meds
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 4. Solishtirish ro'yxatiga qo'shish/o'chirish (POST JSON)
  toggleCompare: async (req, res) => {
    const { id } = req.body;
    if (!req.session.compareList) {
      req.session.compareList = [];
    }

    const index = req.session.compareList.indexOf(id);
    let added = false;

    if (index > -1) {
      req.session.compareList.splice(index, 1);
    } else {
      if (req.session.compareList.length >= 3) {
        return res.status(400).json({ error: res.locals.lang === 'en' ? "You can compare up to 3 medicines!" : "Ko'pi bilan 3 ta dorini solishtirishingiz mumkin!" });
      }
      req.session.compareList.push(id);
      added = true;
    }

    // Solishtirilayotgan dori nomlarini olish (drawer-ni yangilash uchun)
    const compareItems = [];
    for (const itemPid of req.session.compareList) {
      const med = await Medicine.getById(itemPid);
      if (med) {
        compareItems.push({ id: med.id, name_uz: med.name_uz, name_en: med.name_en });
      }
    }

    return res.json({ success: true, added, compareList: req.session.compareList, compareItems });
  },

  // 5. Solishtirish ro'yxatini tozalash (POST JSON)
  clearCompare: (req, res) => {
    req.session.compareList = [];
    return res.json({ success: true });
  },

  // 6. Solishtirish ma'lumotlarini olish (GET JSON)
  getCompareData: async (req, res) => {
    const list = req.session.compareList || [];
    const compareItems = [];
    for (const itemPid of list) {
      const med = await Medicine.getById(itemPid);
      if (med) {
        compareItems.push({ id: med.id, name_uz: med.name_uz, name_en: med.name_en });
      }
    }
    return res.json({ compareList: list, compareItems });
  }
};
