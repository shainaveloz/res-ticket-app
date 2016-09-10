'use strict';

(function () {

    angular
        .module("ticketApp", ["ui.router"])
});


// (function () {
//     'use strict';
//
//     angular
//         .module('ticketApp', ['ngAnimate', 'ngRoute'])
//         .config(routeConfig);
//
//     routeConfig.$inject = ['$routeProvider'];
//
//         function routeConfig($routeProvider) {
//         $routeProvider
//             .when('/',{ templateUrl: './views/index.html', title: 'index'})
//             .when('/chefs',{ templateUrl: './views/chefs.html', title: 'chef', controller: 'controllers/chefs.js'})
//             .when('/expo',{ templateUrl: './views/expo.html', title: 'expo', controller: 'controllers/expo.js'})
//             .when('/fry',{ templateUrl: './views/fry.html', title: 'fry', controller: 'controllers/fry.js'})
//             .when('/pantry',{ templateUrl: './views/pantry.html', title: 'pantry', controller: 'controllers/pantry.js'})
//             .when('/prep',{ templateUrl: './views/prep.html', title: 'prep', controller: 'controllers/prep.js'})
//             .when('/servers',{ templateUrl: './views/servers.html', title: 'servers', controller: 'controllers/servers.js'})
//             .when('/login',{templateUrl: './directives/user-profile.directive.html', title:'login', controller: 'directives/user-profile.directive.js'})
//             .otherwise({ redirectTo: '/' });
//     }
// })();