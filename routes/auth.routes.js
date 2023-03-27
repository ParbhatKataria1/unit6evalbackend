const express = require('express');
const { register, login } = require('../controller/auth.controller');
const auth = express.Router();

auth.post('/register', register)


auth.post("/login", login)


module.exports = {auth}