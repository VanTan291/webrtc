//mongoDB
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://minigame:g8MGCfczXKhsftah@cluster0.tk8sy.mongodb.net/minigame?retryWrites=true&w=majority', function(err){
            if(err) {
                console.log('mogodb error:' + err);
            } else {
                console.log('successfully');
            }
        });
    } catch (error) {
        console.log('mogodb error:' + err);
    }
}

module.exports = { connectDB };
