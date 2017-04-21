var models = require('../models');
var User = models.User;

var AuthFunctions = {};

AuthFunctions.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())  // <-- typo here
        return next();
    return res.apiLoginError( {loggedIn: false });
}


module.exports = AuthFunctions;