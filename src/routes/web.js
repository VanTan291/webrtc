const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

//controllers
const UserController = require('../app/controllers/UserController');

//router
router.post('/register', upload.none(), UserController.register);
router.get('/:slug', UserController.show);

module.exports = router;
