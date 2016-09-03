var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tickets_app'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// angular.
// module('/').
// config(['$locationProvider', '$routeProvider',
//     function config($locationProvider, $routeProvider) {
//         $locationProvider.hashPrefix('!');
//
//         $routeProvider.
//         when('/', {
//             template: ''
//         }).
//     }
// ]);

var GOOGLE_CLIENT_ID = '932569619900-24714d0s0kddfcs5hebhnl6tj2qv87rc.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '0A8iooj3l2wMKx3Iv__NvYVv';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET, //AIzaSyBgZ7Ra5SBtsS6Drqa1IEY7SGYycmnpj0M (key)
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

// passport.use(new LocalStrategy({passReqToCallback:true}, function(req, username, password, done){
//     orm.findUser(username, function(err, user){
//         user = user[0];
//         if (err){
//             return done(err)
//         }
//         if (!user){
//             return done(null, false)
//         }
//         return done(null, user);
//     });
// }));

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

module.exports = function(app){

    app.get('/auth/google',
        passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

};


module.exports = connection;