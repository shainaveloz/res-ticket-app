var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var secret = ('./app-secret.js');

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


var GOOGLE_CLIENT_ID = '932569619900-24714d0s0kddfcs5hebhnl6tj2qv87rc.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '0A8iooj3l2wMKx3Iv__NvYVv';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
}));

var gapi = gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
        client_id: 'GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        fetch_basic_profile: false,
        scope: 'profile'
    });

    // Sign the user in, and then retrieve their ID.
    auth2.signIn().then(function() {
        console.log(auth2.currentUser.get().getId());
    });
});



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
        passport.authenticate('google', { scope: ['profile'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });
    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true })
    );

};

module.exports = connection;