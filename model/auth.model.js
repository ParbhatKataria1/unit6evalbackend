const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    "name": String,
    "email": String,
    gender: String,
    password: String,
    age : Number,
    city : String,
    is_married : Boolean
}, {
    versionKey:false
})

const AuthModel = mongoose.model('auth',authSchema );
module.exports = {AuthModel}