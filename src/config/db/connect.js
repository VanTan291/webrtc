//mongoDB
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://root:root123@chat.erodo.mongodb.net/chat?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('successfully');
    } catch (error) {
        console.log('mogodb error:' + err);
    }
}

module.exports = { connectDB };
