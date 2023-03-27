

const bcrypt = require('bcrypt');
const { AuthModel } = require('../model/auth.model');
const jwt = require('jsonwebtoken');


const register = async(req, res)=>{
    console.log(req.body)
    let {email} = req.body;
    let data = await AuthModel.findOne({email});
    try {
        console.log(data)
        const {password, name, email, gender,age, city, is_married} = req.body
        if(data){
            res.status(200).send({"msg":"User already exist with current EmailId, please login in different email id"});
        }
        else {

            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err)res.status(400).send({"msg":"not able to generate hash for the user"});
                if(hash){
                    let user = new AuthModel({name, email, gender, age, city, is_married,password:hash});
                    await user.save();
                    res.status(200).send({"msg":"User is registered"})
                }
                // Store hash in your password DB.
            });
            
        }
    } catch (error) {
        res.status(400).send({"msg":"user is not able to register"})
    }
}

const login = async(req, res)=>{
    try {
        const {password, name, email, gender,age, city, is_married} = req.body;
        let {password:hash,_id} = await AuthModel.findOne({name, email, gender,age, city, is_married});
        bcrypt.compare(password, hash, function(err, result) {
            // result == false
            if(err)res.status(400).send({"msg":"login details are wrong or not able to compare the hash"});
            if(result)res.status(200).send({"msg":"user is logged in ","token":jwt.sign({ userId: _id }, 'masai')})
        });
    } catch (error) {
        res.status(400).send({"msg":"not able to login"})
    }
}

module.exports = {login,register }