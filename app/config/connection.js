'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var Auth0Strategy = require('passport-auth0');
var orm = require('./orm.js');
var mysql = require('mysql');
var User = require ('../server/api/user.js');
var secret = require('../server/environment/app-secret.js');

exports.setup = function(connection, secret){
     connection = mysql.createConnection({
        host: secret.connection.host,
        user: secret.connection.user,
        password: secret.connection.password,
        database: secret.connection.database
    });
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}

exports.setup = function (User, secret) {
    passport.use(new GoogleStrategy({
            clientID: secret.google.clientID,
            clientSecret: secret.google.clientSecret,
            callbackURL: secret.google.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({googleId: profile.id}, function (err, user) {
                return done(err, user);
            });
        }));
};

exports.setup = function (User, secret){
    var strategy = new Auth0Strategy({
        domain:       process.env.AUTH0_DOMAIN,
        clientID:     process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:  process.env.AUTH0_CALLBACK_URL
    }, function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user

        function signinDb() {
            auth0.signin({
                connection: 'Username-Password-Authentication',
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            });
        return done(null, profile);
    });

    passport.use(strategy);
}

function Strategy(options, verify) {
    if (typeof options == 'function') {
        verify = options;
        options = {};
    }
    if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }

    this._usernameField = options.usernameField || 'username';
    this._passwordField = options.passwordField || 'password';

    passport.Strategy.call(this);
    this.name = 'local';
    this._verify = verify;
    this._passReqToCallback = options.passReqToCallback;
}

Strategy.prototype.authenticate = function(req, options) {
    options = options || {};
    var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
    var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);

    if (!username || !password) {
        return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
    }

    var self = this;

    function verified(err, user, info) {
        if (err) { return self.error(err); }
        if (!user) { return self.fail(info); }
        self.success(user, info);
    }

    try {
        if (self._passReqToCallback) {
            this._verify(req, username, password, verified);
        } else {
            this._verify(username, password, verified);
        }
    } catch (ex) {
        return self.error(ex);
    }
};


passport.use(new LocalStrategy(
    function(username, password, done) {
        function User(userObj) {
            this.username = userObj.username;
            this.password = bcrypt.hashSync(userObj.password, null, null);
        }
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true,
    session: false
}));

passport.authenticate('bearer', function(err, user, info) {
    if (err) return next(err);
    if (user) {
        req.user = user;
        return next();
    } else {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
    }
})(req, res, next);

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

    app.get('/message', function(req, res) {
        return res.json({
            status: 'ok',
            message: 'Congratulations ' + req.user.username + '. You have a token.'
        });
    });

    // Error handler middleware
    app.use(function(err, req, res, next) {
        console.error(err);
        return res.status(500).json({ status: 'error', code: 'unauthorized' });
    });

    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true },
            function (err, user, info) {
                if (err) return next(err);
                if (!user) {
                    return res.status(401).json({ status: 'error', code: 'unauthorized' });
                } else {
                    return res.json({ token: jwt.sign({id: user.id}, secret) });
                })(req, res, next);
    })

};
