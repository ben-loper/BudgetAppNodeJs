let express = require('express');
let router = express.Router();

let authMiddleware = require('../middleware/authMiddleware');

// Controller importing
let authContoller = require('../controllers/authController');
let homeContoller = require('../controllers/homeController');

// Home Controller routes
router.get('/', homeContoller.index);
router.get('/about', homeContoller.about);

// Auth Controller Routes
router.get('/login', authContoller.get_login);

// Testing Auth
router.get('/protected', authMiddleware, authContoller.get_login);

// Testing hitting the DB
router.get('/users', authContoller.get_users);

module.exports = router;
