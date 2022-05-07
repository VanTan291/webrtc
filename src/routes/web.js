const express = require('express');
require('express-group-routes');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const validate = require('../app/validator/validate')

//controllers
const UserController = require('../app/controllers/UserController');
const Middleware = require('../app/middleware/auth');

//router
router.post('/register', upload.none(), validate.register, UserController.register);
router.post('/login', upload.none(), UserController.login);

//route group
router.group('/api/', (router) => {
    router.use(Middleware.authenticateToken);
    router.get('/home', UserController.show);
    router.get('/test', UserController.test);
});

module.exports = router;
