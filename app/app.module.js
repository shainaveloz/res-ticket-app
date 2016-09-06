(function () {
    'use strict';

    angular
        .module('app', ['ngAnimate', 'ngRoute'])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/',{ templateUrl: 'views/index.html', title: 'index'})
            .when('/chefs',{ templateUrl: 'views/chefs.html', title: 'chef'})
            .when('/expo',{ templateUrl: 'views/expo.html', title: 'expo'})
            .when('/fry',{ templateUrl: 'views/fry.html', title: 'fry'})
            .when('/pantry',{ templateUrl: 'views/pantry.html', title: 'pantry'})
            .when('/prep',{ templateUrl: 'views/prep.html', title: 'prep'})
            .otherwise({ redirectTo: '/' });
    }
})();