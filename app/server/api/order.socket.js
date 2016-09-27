'use strict';

var Order = require('../public/js/services/orders.service.js');
var socket = require('./app.js');

exports.register = function(socket) {
    Order.post('save', function (doc) {
        onSave(socket, doc);
    });
    Order.post('remove', function (doc) {
        onRemove(socket, doc);
    });
};

socket.on('orders', function (data) {
    console.log(data);
    socket.emit('orders', { my: 'data' });

function onSave(socket, doc, cb) {
    socket.emit('order:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('order:remove', doc);
}});