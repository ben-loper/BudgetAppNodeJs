let express = require('express');
let router = express.Router();

// Controller importing
let authContoller = require('../controllers/authController');
let homeContoller = require('../controllers/homeController');

// Home Controller routes
router.get('/', homeContoller.index);
router.get('/about', homeContoller.about);

// Auth Controller Routes
router.get('/login', authContoller.get_login);

module.exports = router;
