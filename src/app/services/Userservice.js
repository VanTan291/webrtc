const User = require('../models/User');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

class UserService {
    async createUser(params)
    {
        try {
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(params.password, salt);
            
            const userAc = new User({
                author: params.author,
                name: params.username,
                email: params.email,
                password: password,
                date: Date.now(),
                createdAt: Date.now(),
                updatedAt: Date.now()
            });

            userAc.save();

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dog2912000@gmail.com',
                    pass: '2912000tan'
                }
            });
                
            let mailOptions = {
                from: 'dog2912000@gmail.com',
                to: 'lamvantan03@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
                
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return userAc;
        } catch (error) {
            return false
        }
    }
}

module.exports = new UserService;