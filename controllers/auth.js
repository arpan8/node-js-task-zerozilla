const User = require('../model/user');
const {success, error} = require('../response/macros');
const { hashPassword, verifyPassword} = require('../services/password');
const Jwt = require('@hapi/jwt');

module.exports = {
    userSignup,
    userLogin
}

async function userSignup(req, res){
    try {

        let hashesPassword = await hashPassword(req.payload.password);
        
        let userJson ={
            email: req.payload.email,
            password: hashesPassword
        }

        if(await User.findOne({
            email: req.payload.email
        }).exec()){
            return success({},'Email already exists');
        }

        await new User(userJson).save();

        return success({},'User created successfully')(res);

    } catch (error) {
        console.log(error);
    }
}

async function userLogin(req, res){
    try {
        
        let findUser = await User.findOne({
            email: req.payload.email
        }).exec();

        if(!findUser){
            return error({},'Wrong email', 500)(res);
        }

        
        let password = await verifyPassword(req.payload.password, findUser.password), token;

        if(password){

            findUser = findUser.toObject();

            delete findUser.password;

            token = Jwt.token.generate({ 
                expiresIn: 36000,
                aud: 'urn:audience:test',
                iss: 'urn:issuer:test',
                sub: false,
                maxAgeSec: 14400,
                timeSkewSec: 15,
                user: findUser
            }, process.env.SECRET);

            return success({token, user: findUser},'Login successfull')(res);
        }else{
            return error({},'Wrong password')(res);
        }


    } catch (error) {
        console.log(error)
    }
}