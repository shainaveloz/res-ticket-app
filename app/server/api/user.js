'use strict';

var passport = require('passport');
var secret = require('../environment/app-secret.js');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
    return res.json(422, err);
};


var User = {
    first_name: String,
    last_name:String,
    email: { type: String, lowercase: true },
    role: {
        type: String,
        default: 'user'
    },
    hashedPassword: String,
    provider: String,
    salt: String,
    google: {},
}


User.create({
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        role: 'chef',
        name: 'Chef',
        email: 'chef@chef.com',
        password: 'chef'
    },{
        role: 'expo',
        name: 'Expo',
        email: 'expo@expo.com',
        password: 'expo'
    },{
        role: 'server',
        name: 'Server',
        email: 'server@server.com',
        password: 'server'
    }, {
        role: 'fry',
        name: 'Fry',
        email: 'fry@fry.com',
        password: 'fry'
    },{
        role: 'pantry',
        name: 'Pantry',
        email: 'pantry@pantry.com',
        password: 'pantry'
    },{
        role: 'prep',
        name: 'prep',
        email: 'prep@prep.com',
        password: 'prep'
    },
    function() {
        console.log('finished populating users');
    }
);
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
    //noinspection JSUnresolvedFunction
    var newUser = new User(req.body);
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id }, secret.session.secret , { expiresInMinutes: 60*5 });
        res.json({ token: token });
    });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
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

module.exports = User;