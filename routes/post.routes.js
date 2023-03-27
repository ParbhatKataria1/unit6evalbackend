const express = require('express');
const { addPost, getPosts, getTopData, updateData, deleteData } = require('../controller/posts.controller');
const posts = express.Router();

const { verifyUser } = require('../middleware/posts.middleware');
// {addPost,getPosts,  getTopData, updateData, deleteData}

posts.use(verifyUser)

posts.post('/add', addPost )

posts.get('/', getPosts )

posts.get('/top', getTopData )

posts.patch('/update/:_id', updateData )

posts.delete('/delete/:_id', deleteData )


module.exports = {posts}
