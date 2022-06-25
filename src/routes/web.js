const express = require('express');
require('express-group-routes');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({storage: storage});
const validate = require('../app/validator/validate')

//controllers
const UserController = require('../app/controllers/UserController');
const PostController = require('../app/controllers/PostController');
const Middleware = require('../app/middleware/auth');

//router
router.post('/register', upload.none(), validate.register, UserController.register);
router.post('/login', upload.none(), validate.login, UserController.login);

//route group
router.group('/api/', (router) => {
    router.use(Middleware.authenticateToken);
    router.get('/home', UserController.show);
    router.group('/post/', (router) => {
        router.get('', PostController.show);
        router.get('/create', upload.single('file'), validate.post, PostController.create);
    });
    
});

module.exports = router;
