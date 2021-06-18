const User = require('../../../model/user');
const jwt = require('jsonwebtoken');
const env =  require('../../../config/environment');
module.exports.createSession = async function (req, res) {

    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: 'Invalid username or password'
            });
        }

        return res.status(200).json({
            message: 'sign in successfully done, here is your token keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret_key, {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log("****", err);
        res.status(500).json({
            message: "Internal Server Error !"
        })
        return;
    }
};