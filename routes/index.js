const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// Added Router for home (or root) url request
router.get('/', homeController.home);

router.use('/users', require('./users'));

module.exports = router;