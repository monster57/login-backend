module.exports = {

   'facebookAuth' : {
       'clientID'      : '600403220127143', // your App ID
       'clientSecret'  : 'dbff04eeffd84c9940cd7fc146fa0381', // your App Secret
       'callbackURL'   : 'http://localhost:1339/auth/facebook/callback',
       'profileFields' : ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
   }
};