var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require("../config");

var user = new mongoose.Schema({
    name: {
        type: String
    },
    password:{
    	type:String,
        select:false
    },
    email:{
    	type:String
    },
    login_platform:{
        type:String
    },
    facebook_id:{
        type:String,
        default:null
    }

});
var User = module.exports = mongoose.model('User', user);

module.exports.generateHash = (password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports.generateJwt = (user) => {
    return new Promise(resolve => {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        resolve(jwt.sign({
            _id: user._id,
            email: user.email,
            name: user.name,
            exp: parseInt(expiry.getTime() / 1000),
        }, config.jwtSecret));
    });
}
