const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class UserService {
    async register(params)
    {
        try {
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(params.password, salt);
            
            const user = new User({
                author: params.author,
                name: params.username,
                email: params.email,
                password: password,
                date: Date.now(),
                createdAt: Date.now(),
                updatedAt: Date.now()
            });

            let newUser = user.save();

            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'dog2912000@gmail.com',
            //         pass: '2912000tan'
            //     }
            // });
                
            // let mailOptions = {
            //     from: 'dog2912000@gmail.com',
            //     to: 'lamvantan03@gmail.com',
            //     subject: 'Sending Email using Node.js',
            //     text: 'That was easy!'
            // };
                
            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });

            return newUser;
        } catch (error) {
            return false
        }
    }

    async login(params) 
    {
        const { email, password } = await params;
        const user = await User.findOne({email}).lean();

        if (!user) {
            return false;
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = await jwt.sign({ user }, 'my_sercet_key', { expiresIn: '24h' });

            return { status: true, token: token };
        } 

        return {staus: 'error', error: 'sai email hoac password'};
    }

    async show(params)
    {
        return params;
    }
}

module.exports = new UserService;