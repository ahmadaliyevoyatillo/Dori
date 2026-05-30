// routes/adminRoutes.js - Ma'muriy boshqaruv paneli marshrutlari (Admin only)

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');

// Barcha admin yo'nalishlarini requireAdmin middleware bilan himoyalaymiz
router.use(requireAdmin);

router.get('/admin', adminController.getDashboard);

router.post('/admin/medicine/save', adminController.saveMedicine);
router.get('/admin/medicine/delete/:id', adminController.deleteMedicine);

router.post('/admin/disease/save', adminController.saveDisease);
router.get('/admin/disease/delete/:id', adminController.deleteDisease);

module.exports = router;
