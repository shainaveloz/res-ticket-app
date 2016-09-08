var express = require('express');
var bodyParser = require('body-parser');
var module = require('./app.module.js');
var routes = require('./app.routes.js');
var config = require('./app.config.js');
var connection = require('./config/connection.js');
var path = require('path');
var passport = require('passport');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('flash');
var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + './bower_components'));

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


// app.get('/', function(req, res){
//     res.send('index.html');
// });

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("Listening on %d", PORT);
});