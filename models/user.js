var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
    }

});
var User = module.exports = mongoose.model('User', user);

module.exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
