var UserController = {};
var models = require('../models');
var User = models.User;

UserController.signup = function(req, res) {
    var requiredField = [ 'password', 'email', 'confirm_password'];

    requiredField.forEach(function(field) {
        if (Object.keys(req.body).indexOf(field) < 0) {
            message = 'Please provide ' + field.replace('_', ' ');
            throw Error (message);
        }
    });

    if (req.body.password != req.body.confirm_password) {
        return res.apiError("Password does not match");
    }

    return User.findOne({ email: req.body.email })
        .then((existingUser) => {
        	console.log(existingUser , 'this is existing user')
            if (existingUser) {
                throw Error ('User already exists...');
            }

            return User.create({
                name: req.body.name,
                email: req.body.email,
                password: User.generateHash(req.body.password)
            });
        })
        .then(function(user) {
            return res.apiSuccess({ user: user }, 'Registration completed.');
        })
        .catch(function(error) {
            res.apiError(error);
        });
};

module.exports = UserController;
