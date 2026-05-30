// routes/diseaseRoutes.js - Kasalliklar bilan bog'liq marshrutlar

const express = require('express');
const router = express.Router();
const diseaseController = require('../controllers/diseaseController');

router.get('/diseases', diseaseController.getCatalog);
router.get('/disease/:id', diseaseController.getDetails);

module.exports = router;
