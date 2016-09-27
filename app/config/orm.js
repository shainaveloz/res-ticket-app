'use strict';

var connection = require('./connection.js');
var _ = require('lodash');
var User = require('../public/js/controllers/user.controller');


var orm = {

    viewAll: function (table) {
        return new Promise(function (resolve, reject) {
            //may need to do A.ID instead of A.Key format, 'SELECT * FROM ' + table + ' A LEFT JOIN skills B ON A.ID = B.ID'
            var queryString = 'SELECT * FROM ' + table + ' A LEFT JOIN scores B ON A.id = B.id';
            connection.query(queryString, function (err, result) {
                resolve(result);
            });
        });
    },

    addUserToDB: function (userObj, callback) {
        connection.query('INSERT INTO users_table SET ?', userObj, function (err, results) {
            if (err) return callback(false, err);
            callback(true, null);
        });
    },

    findUser: function (username, callback) {
        connection.query('SELECT * FROM users_table WHERE ?', {username: username}, function (err, user) {
            callback(err, user);
        })
    },

     Order : function (){
        var query = ' What is your order?'
        connection.query(query, {order: answer.orders}, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Apps: " + res[i].app_name + " || Entree: " + res[i].entree_name + " || Dessert: " + res[i].dessert_name + "|| Salad: " + res[i].salad_name + "||fry: "+ res.[i].fry_name);
        }
    })},

    addOrder: function (apps, entrees, fry, salad, dessert) {
        var queryString = 'INSERT INTO ' + table + ' SET ?';
        connection.query(queryString, {
            username: username,
            entrees_id: entrees,
            app_id: apps,
            salad_id: salad,
            frys_id: fry,
            dessert_id: dessert
        }, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
        return new Promise(function (resolve,reject) {
            if (entrees === null) {
                entrees = 'No';
            } else {
                entrees = 'Yes';
            }
            if (apps ===  null) {
                apps = 'No';
            } else {
                apps = 'Yes';
            }
            if (fry ===  null) {
                fry = 'No';
            } else {
                fry = 'Yes';
            }
            if (salad ===  null) {
                salad = 'No';
            } else {
                salad = 'Yes';
            }
            if (dessert === null) {
                dessert = 'No';
            } else {
                dessert = 'Yes';
            }
        });
    },

// Deletes a order from the DB.
deleteOrder: function(order) {
    return new Promise(function (resolve, reject) {
        Orders.findById(req.params.id, function (err, order) {
            if (err) {
                return handleError(res, err);
            }
            if (!order) {
                return res.send(404);
            }
            connection.query("DELETE FROM orders WHERE ?", {
                entree_id: "",
                app_id:"",
                salad_id:"",
                frys_id:"",
                dessert_id:""
            }, function(err, res) {});
            });
        });
    }
};
