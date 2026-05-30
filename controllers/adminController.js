// controllers/adminController.js - Ma'muriyat (Admin Dashboard) CRUD boshqaruvi

const Medicine = require('../models/Medicine');
const Disease = require('../models/Disease');
const User = require('../models/User');

module.exports = {
  // 1. Dashboard sahifasi (GET)
  getDashboard: async (req, res) => {
    const tab = req.query.tab || 'meds';
    try {
      const medicines = await Medicine.getAll({ sort: 'alpha' });
      const diseases = await Disease.getAll();
      const users = await User.getAll();

      res.render('admin', {
        title: res.locals.t('admin_title'),
        tab,
        medicines,
        diseases,
        users
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server xatoligi");
    }
  },

  // 2. Dorini saqlash (POST)
  saveMedicine: async (req, res) => {
    const {
      id, name_uz, name_en, type_uz, type_en, category, price,
      manufacturer_uz, manufacturer_en, description_uz, description_en,
      usage_uz, usage_en, dosage_uz, dosage_en, sideEffects_uz, sideEffects_en,
      warnings_uz, warnings_en, prescription
    } = req.body;

    try {
      const newMed = {
        name_uz, name_en, type_uz, type_en, category,
        price: parseInt(price),
        manufacturer_uz, manufacturer_en, description_uz, description_en,
        usage_uz, usage_en, dosage_uz, dosage_en, sideEffects_uz, sideEffects_en,
        warnings_uz, warnings_en,
        prescription: prescription === 'on' || prescription === true
      };

      if (id) {
        newMed.id = id;
      }

      await Medicine.save(newMed);
      res.redirect('/admin?tab=meds&saved=true');
    } catch (err) {
      console.error(err);
      res.redirect('/admin?tab=meds&error=true');
    }
  },

  // 3. Dorini o'chirish (POST/GET)
  deleteMedicine: async (req, res) => {
    const id = req.params.id;
    try {
      await Medicine.delete(id);
      res.redirect('/admin?tab=meds&deleted=true');
    } catch (err) {
      console.error(err);
      res.redirect('/admin?tab=meds&error=true');
    }
  },

  // 4. Kasallikni saqlash (POST)
  saveDisease: async (req, res) => {
    const {
      id, name_uz, name_en, description_uz, description_en,
      symptoms_uz, symptoms_en, causes_uz, causes_en,
      prevention_uz, prevention_en, treatment_uz, treatment_en
    } = req.body;

    try {
      const newDis = {
        name_uz, name_en, description_uz, description_en,
        symptoms_uz, symptoms_en, causes_uz, causes_en,
        prevention_uz, prevention_en, treatment_uz, treatment_en
      };

      if (id) {
        newDis.id = id;
      }

      await Disease.save(newDis);
      res.redirect('/admin?tab=diseases&saved=true');
    } catch (err) {
      console.error(err);
      res.redirect('/admin?tab=diseases&error=true');
    }
  },

  // 5. Kasallikni o'chirish (POST/GET)
  deleteDisease: async (req, res) => {
    const id = req.params.id;
    try {
      await Disease.delete(id);
      res.redirect('/admin?tab=diseases&deleted=true');
    } catch (err) {
      console.error(err);
      res.redirect('/admin?tab=diseases&error=true');
    }
  }
};
