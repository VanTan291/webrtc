const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken')

//controllers
const UserController = require('../app/controllers/UserController');
const MIDDLEWARE = require('../app/middleware/auth');

//router
router.post('/register', upload.none(),  UserController.register);
router.post('/login', upload.none(), UserController.login);


router.get('/api/home', MIDDLEWARE.authenticateToken, UserController.show);

module.exports = router;
