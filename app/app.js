var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./config/connection.js');
var jwt = require('express-jwt');
var path = require('path');
var fs = require('fs');
var secret = require('./server/environment/app-secret');
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
    secret: secret.session.secret,
    cookie: { maxAge: 100000 },
    resave: true,
    saveUninitialized: true,
} ));

app.use(flash());

// use passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());

var io = require('socket.io')(app);
function handler (req, res) {
    fs.readFile(__dirname + '/orders.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading orders.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

    io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('orders', function (data) {
        console.log(data);
    });
});



app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'mainIndex.html'));
});

app.get('/chef', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'chefs.html'));
});

app.get('/expo', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'expo.html'));
});

app.get('/fry', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'fry.html'));
});

app.get('/pantry', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'pantry.html'));
});

app.get('/prep', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'prep.html'));
});

app.get('/servers', function(req,res){
    res.sendFile(path.join(__dirname, './views', 'servers.html'));
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname,'./views', 'login.html'));
});

app.get('/orders', function(req,res){
    res.sendFile(path.join(__dirname,'./views', 'orders.html'));
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

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