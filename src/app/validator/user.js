const { check, validationResult } = require('express-validator');
const User = require('../models/User');

let checkErr = (req, res, next) => {
    const errorFormatter = ({ msg, param}) => {
        return `${param}: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    } else {
        next();
    }
}

module.exports = {
	register: [
		check('username', 'Truong Username khong duoc trong').not().isEmpty(),
		check('email', 'Truong email khong duoc trong').not().isEmpty(),
        check('email', 'Sai dia chi email').isEmpty().normalizeEmail().isEmail(),
        check('email').custom(async (email) => {
            const existingUser =
                await User.findOne({ email })
                 
            if (existingUser) {
                throw new Error('Email da ton tai')
            }
        }),
        check('date', 'Truong date khong duoc trong').not().isEmpty(),
        check('password', 'Truong password khong duoc trong').not().isEmpty(),
        check('password', 'Truong password qua ngan, it nhat 6 ky tu').isLength({ min:6 }),
		checkErr,
	],
}