var connection = require('../config/connection.js');

var orm = {

    viewAll: function(table) {
        return new Promise(function(resolve, reject) {
            //may need to do A.ID instead of A.Key format, 'SELECT * FROM ' + table + ' A LEFT JOIN skills B ON A.ID = B.ID'
            var queryString = 'SELECT * FROM ' + table + ' A LEFT JOIN scores B ON A.id = B.id';
            connection.query(queryString, function(err, result) {
                resolve(result);
            });
        });
    },

    addUserToDB: function (userObj, callback) {
        connection.query('INSERT INTO users_table SET ?', userObj, function(err, results) {
            if (err) return callback(false, err);
            callback(true, null);
        });
    },

    findUser: function(username, callback) {
        connection.query('SELECT * FROM users_table WHERE ?', {username: username}, function(err, user) {
            callback(err, user);
        })
    },

    addOrder: function(apps, entrees, fry, salad, dessert){
        return new Promise(function(resolve, reject){
            if(entrees == null){
                entrees = 'No'
            }else{
                entrees= 'Yes'
            }
            if(apps == null){
                apps = 'No'
            }else{
                apps = 'Yes'
            }
            if(fry == null){
                fry = 'No'
            }else{
                fry = 'Yes'
            }
            if(salad == null){
                salad = 'No'
            }else{
                salad = 'Yes'
            }
            if(dessert == null){
                dessert = 'No'
            }else{
                dessert = 'Yes'
            }
            var queryString = 'INSERT INTO ' + table + ' SET ?';
            connection.query(queryString,{username: username, entrees_id: entrees, app_id: apps, salad_id: salad, frys_id: fry, dessert_id: dessert}, function(err,result){
                if (err) throw err;
                resolve(result);
            });
        });
    }

};