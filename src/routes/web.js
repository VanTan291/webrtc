const express = require('express');
const router = express.Router();

//controllers
const indexController = require('../app/controllers/IndexController');

//router
router.get('/', indexController.index);
router.get('/:slug', indexController.show);

module.exports = router;
