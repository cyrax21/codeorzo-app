const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timeline_controller');

router.all('/', timelineController.timeline);

module.exports = router;