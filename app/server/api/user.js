'use strict';

var passport = require('passport');
var secret = require('../environment/app-secret.js');
var connection = require('../config/connection.js');

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
    google: {
        email: String,
        email_verified: true,
        name: String,
        given_name: String,
        family_name: String,
        picture: String,
        gender: String,
        locale: String,
        clientID: String
        updated_at: String,
        user_id: String
        nickname: String,
        identities: [
            {
                provider: "google-oauth2",
                user_id: String,
                connection: "google-oauth2",
                isSocial: true
            }
        ],
        created_at: String,
        sub: String
    }
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

exports.login = function (email, password, callback){
    var query = "SELECT id, nickname, email, password " +
        "FROM users WHERE email = ?";

    connection.query(query, [email], function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
        var user = results[0];

        bcrypt.compare(password, user.password, function (err, isValid) {
            if (err) {
                callback(err);
            } else if (!isValid) {
                callback(new WrongUsernameOrPasswordError(email));
            } else {
                callback({
                    id: user.id.toString(),
                    nickname: user.nickname,
                    email: user.email
                });
            }
        });
};

exports.create = function (user, callback) {
    var query = "INSERT INTO users SET ?";

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return callback(err);
        }
        var insert = {
            password: hash,
            email: user.email
        };
        connection.query(query, insert, function (err, results) {
            if (err) return callback(err);
            if (results.length === 0) return callback();
            callback(null);
        });
    });
};

exports.verify = function (email, callback) {

    var query = "UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = ? ";

    connection.query(query, email, function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();

        callback(null, results.length > 0);
    });

};

exports.changePassword = function (email, newPassword, callback) {
    var query = "UPDATE users SET password = ? WHERE email = ? ";

    bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
            callback(err);
        } else {
            connection.query(query, hash, email, function (err, results) {
                if (err) return callback(err);
                callback(null, results.length > 0);
            });
        }
    });
};

exports.getByEmail = function (name, callback) {
    var profile = {
        user_id:     "103547991597142817347",
        nickname:    "johnfoo",
        email:       "johnfoo@gmail.com",
        name:        "John Foo",
        given_name:  "John",
        family_name: "Foo"
    };

    callback(null, profile);
};

exports.remove = function (id, callback) {

    var query = 'DELETE FROM users WHERE id = ?';

    connection.query(query, [id], function (err) {
        if (err) return callback(err);
        callback(null);
    });

};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/auth/callback');
};

module.exports = User;