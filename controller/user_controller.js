var UserController = {};
var models = require('../models');
var User = models.User;


UserController.signup = function(req, res) {
    console.log(req.body , "this is body")
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
            if (existingUser) {
                throw Error ('User already exists...');
            }

            return User.create({
                name: req.body.name,
                email: req.body.email,
                password: User.generateHash(req.body.password),
                login_platform:'local'
            });
        })
        .then(function(user) {
            return res.apiSuccess({ user: user }, 'Registration completed.');
        })
        .catch(function(error) {
            res.apiError(error);
        });
};

UserController.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.apiError("Login Failed! try again");
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.apiSuccess({ user: req.user }, "Successfully logged in");
        });
    })(req, res, next);
}

UserController.facebookLogin = function(req, res){
    return User.findOne({_id:req.user._id}).then(function(user){
        let jsonUser = user.toJSON();
        return User.generateJwt(user).then(function(token){
            jsonUser.token = token
            return res.apiSuccess({ user: jsonUser })    
        })
        
    })
}

module.exports = UserController;
