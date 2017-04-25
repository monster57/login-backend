var express = require('express');
var router = express.Router();
var model = require('../models');
var fs = require('fs');
var passport = require('passport');
var UserController = require('../controller/user_controller');
require('../lib/passport')(passport);
/* GET home page. */


router.post('/signup', UserController.signup);


router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));


router.get('/profile',UserController.facebookLogin)
router.post('/login',UserController.login)

router.get('/user/profile/:id' , UserController.userProfile);
module.exports = router;
