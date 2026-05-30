// routes/authRoutes.js - Avtorizatsiya va profil marshrutlari

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireLogin } = require('../middleware/auth');

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/auth/logout', authController.logout);

router.get('/profile', requireLogin, authController.getProfile);
router.post('/profile/update', requireLogin, authController.updateProfile);
router.post('/profile/clear-history', requireLogin, authController.clearHistory);

module.exports = router;
