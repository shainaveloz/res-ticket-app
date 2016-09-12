var express = require('express');
var bodyParser = require('body-parser');
var module = require('./public/js/app.module.js');
var routes = require('./public/js/app.routes.js');
var config = require('./public/js/app.config.js');
var connection = require('./config/connection.js');
var secret = require('./app-secret.js');
var path = require('path');
var passport = require('passport');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('flash');
var app = express();

app.use(express.static(__dirname + './views'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));
app.use('/public',  express.static( path.join(__dirname, '/public')));

// BodyParser interprets data sent to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// cookie parser for user authentication
app.use(cookieParser());
// session configuration
app.use(session({
    secret: 'resticket',
    cookie: { maxAge: 100000 },
    resave: true,
    saveUninitialized: true,
} ));

app.use(flash());

// use passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'mainIndex.html'));
});

app.get('/login', function(req,res){
    req.login(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + req.user.username);
    });
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['user:email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + req.user.username);
        });
        res.redirect('/');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
);

var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("Listening on %d", PORT);
});