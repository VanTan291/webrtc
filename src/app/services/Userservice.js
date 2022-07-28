const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class UserService {
    register(params)
    {
        return new Promise(async (resolve, reject) => {
			const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(params.password, salt);

            const user = await new User({
                author: params.author,
                name: params.username,
                email: params.email,
                password: password,
                date: Date.now(),
                createdAt: Date.now(),
                updatedAt: Date.now()
            });

            let newUser = await user.save();

            if (newUser) {
                return resolve({ 
                    message: 'Tao tai khoan thanh cong',
                    data: newUser
                });
            } else {
                return reject({
                    message: 'Tao tai khoan that bai',
                });
            }
		})
    }

    login(params) 
    {
        return new Promise(async (resolve, reject) => {
			const { email, password } = await params;
            const user = await User.findOne({email}).lean();

            if (user && await bcrypt.compare(password, user.password)) {
                const token = await jwt.sign({ user }, 'my_sercet_key', { expiresIn: '24h' });
                return resolve({ status: true, token: token });
            } else {
                return reject({message: 'Sai email hoac password'});
            }
		})
    }

    async show(params)
    {
        console.log(params)
        return new Promise(async (resolve, reject) => {
            if (params) {
                return resolve({ status: true, params: params });
            } else {
                return reject({message: 'khong co data'});
            }
		})
    }
}

module.exports = new UserService;