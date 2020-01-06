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
router.post('/login', authContoller.log_in_user);
router.get('/success', authContoller.success);

router.get('/register', authContoller.get_register_page);
router.post('/register', authContoller.register_new_user);

// Testing Auth
router.get('/protected', authMiddleware, authContoller.get_login);

// Testing hitting the DB
router.get('/users', authContoller.get_users);

// Handle unknown routes
router.all('*', homeContoller.route_unknown);

module.exports = router;
