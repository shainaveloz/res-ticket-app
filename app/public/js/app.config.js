// (function () {
//     'use strict';
//
//     angular
//         .module('ticketApp')
//         .config('orm',[''],function ($scope, $http) {
//
//
//             viewAll: function(table) {
//                 return new Promise(function(resolve, reject) {
//                     //may need to do A.ID instead of A.Key format, 'SELECT * FROM ' + table + ' A LEFT JOIN skills B ON A.ID = B.ID'
//                     var queryString = 'SELECT * FROM ' + table + ' A LEFT JOIN scores B ON A.id = B.id';
//                     connection.query(queryString, function(err, result) {
//                         resolve(result);
//                     });
//                 });
//             }
// });