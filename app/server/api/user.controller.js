'use strict';

var User = require('../server/api/user.js');
var orm = require('../config/orm.js');
var jwt = require('jsonwebtoken');
var secret = require('../environment/app-secret');

// sign with default (HMAC SHA256)
var token = jwt.sign({ algorithm: 'HS256' }, 'shhhhh');
//backdate a jwt 30 seconds
var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

var cert = fs.readFileSync('public.pem');  // get public key
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {
    // if subject mismatch, err == invalid subject
});
// sign asynchronously
jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
});

var payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
};

// encode
jwt.encode(secret, payload, function (err, token) {
    if (err) {
        return console.error(err.name, err.message);
    } else {
        console.log(token);

        // decode
        jwt.decode(secret, token, function (err_, decode) {
            if (err) {
                return console.error(err.name, err.message);
            } else {
                console.log(decode);
            }
        });
    }
});

var validationError = function(res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function (err, users) {
        if(err) return res.send(500, err);
        res.json(200, users);
    });
};


/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({id: user.id }, session.secret, { expiresInMinutes: 60*5 });
        res.json({ token: token });
    });
};

/**
 * Get a single user
 */
exports.orm = function (req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if(user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

exports.changeName = function(req, res, next) {
    var userId = req.user._id;
    var name = String(req.body.name);

    User.findById(userId, function (err, user) {
        user.name = name;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
        });
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) {
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};