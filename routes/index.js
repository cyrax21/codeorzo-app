const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// Added Router for home (or root) url request
router.get('/', homeController.home);

// Added Router for user related routes
router.use('/users', require('./users'));

// Added Router for post related routes
router.use('/posts', require('./posts'));

// Added Router for comments related routes
router.use('/comments', require('./comments'));

module.exports = router;