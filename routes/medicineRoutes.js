// routes/medicineRoutes.js - Dorilar bilan bog'liq marshrutlar

const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { requireLogin } = require('../middleware/auth');

router.get('/medicines', medicineController.getCatalog);
router.get('/medicine/:id', medicineController.getDetails);
router.post('/medicine/:id/review', medicineController.postReview);

// Sevimlilarni toggler qilish
router.post('/favorites/toggle', requireLogin, medicineController.toggleFav);

module.exports = router;
