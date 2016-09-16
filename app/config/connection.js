var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var orm = require('./orm.js');
var mysql = require('mysql');
var secret = ('./app-secret.js');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'tickets_app'
// });

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});


// var GOOGLE_CLIENT_ID = '932569619900-24714d0s0kddfcs5hebhnl6tj2qv87rc.apps.googleusercontent.com';
// var GOOGLE_CLIENT_SECRET = '0A8iooj3l2wMKx3Iv__NvYVv';

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

// function Strategy(options, verify) {
//     if (typeof options == 'function') {
//         verify = options;
//         options = {};
//     }
//     if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }
//
//     this._usernameField = options.usernameField || 'username';
//     this._passwordField = options.passwordField || 'password';
//
//     passport.Strategy.call(this);
//     this.name = 'local';
//     this._verify = verify;
//     this._passReqToCallback = options.passReqToCallback;
// }
//
// Strategy.prototype.authenticate = function(req, options) {
//     options = options || {};
//     var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
//     var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
//
//     if (!username || !password) {
//         return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
//     }
//
//     var self = this;
//
//     function verified(err, user, info) {
//         if (err) { return self.error(err); }
//         if (!user) { return self.fail(info); }
//         self.success(user, info);
//     }
//
//     try {
//         if (self._passReqToCallback) {
//             this._verify(req, username, password, verified);
//         } else {
//             this._verify(username, password, verified);
//         }
//     } catch (ex) {
//         return self.error(ex);
//     }
// };
//
//
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         function User(userObj) {
//             this.username = userObj.username
//             this.password = bcrypt.hashSync(userObj.password, null, null)
//         }
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (!user.verifyPassword(password)) { return done(null, false); }
//             return done(null, user);
//         });
//     }
// ));
//
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'passwd',
//     passReqToCallback: true,
//     session: false
// }));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

module.exports.saveUser = function(userObj, callback){
    orm.addUserToDB(userObj, function(status, err){
        if (err) return callback(false);
        callback(true);
    });
};

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