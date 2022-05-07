const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken')
const validate = require('../app/validator/validate')

//controllers
const UserController = require('../app/controllers/UserController');
const Middleware = require('../app/middleware/auth');

//router
router.post('/register', upload.none(), validate.register, UserController.register);
router.post('/login', upload.none(), UserController.login);


router.get('/api/home', Middleware.authenticateToken, UserController.show);
router.get('/api/test', UserController.test);

module.exports = router;
