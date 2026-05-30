// routes/homeRoutes.js - Bosh sahifa, Sevimlilar va Solishtirish marshrutlari

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { requireLogin } = require('../middleware/auth');

router.get('/', homeController.getHome);
router.get('/favorites', requireLogin, homeController.getFavorites);
router.get('/compare', homeController.getCompare);
router.post('/compare/toggle', homeController.toggleCompare);
router.post('/compare/clear', homeController.clearCompare);
router.get('/compare/data', homeController.getCompareData);

module.exports = router;
