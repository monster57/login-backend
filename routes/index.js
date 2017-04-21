var express = require('express');
var router = express.Router();
var model = require('../models');
var fs = require('fs');
var UserController = require('../controller/user_controller');
var Music = model.Music;

/* GET home page. */


router.post('/signup', UserController.signup);


// router.get('/music', function(req, res){
//     res.set({'Content-Type': 'audio/mpeg'});
//     var filepath = "public/docs/a.mp3"
//     var readStream = fs.createReadStream(filepath);
//     readStream.pipe(res);
// })

// count all


module.exports = router;
