var models = require('../models');
var User = models.User;
var SuperUser = models.SuperUser
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookConfig = require("../config/facebook");
var passport = require('passport');
module.exports = function(passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            return user;
        }).asCallback(done);
    });

    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            return User.findOne({ email: email,  login_platform:'local'}).select('+password').then(function(user) {
                if (user && User.comparePassword(password, user.password)) {
                    return user;
                }
            }).asCallback(done);
        }));

    passport.use(new FacebookStrategy({
        clientID : FacebookConfig.facebookAuth.clientID,
        clientSecret : FacebookConfig.facebookAuth.clientSecret,
        callbackURL : FacebookConfig.facebookAuth.callbackURL,
        profileFields : FacebookConfig.facebookAuth.profileFields
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({facebook_id:profile.id  , login_platform:'facebook'}).then(function(user){
            if(user){
                return done(null, user)
            }
            User.create({
                name: profile.displayName,
                email: profile.facebook_id,
                facebook_id:profile.id,
                login_platform:'facebook'
            }).then(function(user){
                return done(null, user);   
            });
            
        })
    }));


}
