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

        // Get list of orders
    //     exports.index = function(req, res) {
    //
    //     if(config.orders.indexOf(req.order) >= config.userRoles.indexOf('manager'))
    //         Order.find({}).limit(200).sort('-created_at').exec(function (err, orders) {
    //             if(err) { return handleError(res, err); }
    //             return res.json(200, orders);
    //         });
    //     else
    //         res.json(403, 'Forbidden');
    //
    // };

    // Get a single order
    exports.show = function(req, res) {

        console.log('SHOW!')

        // If it is manager or admin, go on
        if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('manager'))
            Order.findById(req.params.id).populate('_user').populate('_items').exec(function (err, order) {
                if(err) { return handleError(res, err); }
                if(!order) { return res.send(404); }

                var options = {
                    path: '_items._item',
                    model: 'Article'
                };

                Order.populate(order, options, function (err, result) {
                    if(err) { return handleError(res, err); }
                    return res.json(200, result);
                });
            });
        else // If it is a user, check if it is itself
            Order.findById(req.params.id).populate('_items').exec(function (err, order) {
                if(err) { return handleError(res, err); }
                if(!order._user || String(order._user) != String(req.user._id)) { return res.send(403); }
                if(!order) { return res.send(404); }

                var options = {
                    path: '_items._item',
                    model: 'Article'
                };

                Order.populate(order, options, function (err, result) {
                    if(err) { return handleError(res, err); }
                    return res.json(200, result);
                });
            });
    };


    // Get orders of a user
    exports.showPerUser = function(req, res) {

        console.log('SHOW PER USER!')

        // If it is manager or admin, go on
        if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('manager'))
            Order.find({ _user: req.params.userId }).limit(200).sort('-created_at').exec(function (err, orders) {
                if(err) { return handleError(res, err); }
                return res.json(200, orders);
            });
        else// Not allowed
            return res.json(403);
    };


    exports.showMine= function(req, res) {

        console.log('SHOW MINE!')

        // If it is manager or admin, go on
        Order.find({ _user: req.user._id }).limit(200).sort('-created_at').exec(function (err, orders) {
            if(err) { return handleError(res, err); }
            return res.json(200, orders);
        });
    };



    // Creates a new order in the DB.
    exports.create = function(req, res) {

        OrderLine.create(req.body._items, function(err){
            if(err) { return handleError(res, err); }
            var _lines = [];
            for (var i = 1; i < arguments.length; i++)
                _lines.push(arguments[i]._id);

            var _order = req.body;
            _order._items = _lines;

            Order.create(_order, function(err, order) {
                if(err) { return handleError(res, err); }

                order.populate();

                return res.json(201, order);
            });
        });


    };

    // Updates an existing order in the DB.
    exports.update = function(req, res) {
        if(req.body._id) { delete req.body._id; }
        Order.findById(req.params.id, function (err, order) {
            if (err) { return handleError(res, err); }
            if(!order) { return res.send(404); }
            var updated = _.merge(order, req.body);
            updated.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200, order);
            });
        });
    };

    // Deletes a order from the DB.
    exports.destroy = function(req, res) {
        Order.findById(req.params.id, function (err, order) {
            if(err) { return handleError(res, err); }
            if(!order) { return res.send(404); }
            order.remove(function(err) {
                if(err) { return handleError(res, err); }
                return res.send(204);
            });
        });
    };

    function handleError(res, err) {
        return res.send(500, err);
    }

};