const express = require('express');
const { connection } = require('./db');
const { auth } = require('./routes/auth.routes');
const { posts } = require('./routes/post.routes');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/users', auth);
app.use('/posts', posts)

app.listen(process.env.port, async(req, res)=>{
    try {
        await connection;
        console.log('database is running ');
    } catch (error) {
        console.log('database is not running ');
    }
})

