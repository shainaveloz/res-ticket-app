'use strict';

(function(){

    angular
        .module('ticketApp', ['ui.router'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('index', {
                    url: "/",
                    templateUrl: "../views/mainIndex.html"
                })
                .state('chef', {
                    url: "/chefs",
                    templateUrl: "../views/chefs.html"
                })
                .state('expo', {
                    url: "/expo",
                    templateUrl: "../views/expo.html"
                })
                .state('fry', {
                    url: "/fry",
                    templateUrl: "../views/fry.html"
                })
                .state('pantry', {
                    url: "/pantry",
                    templateUrl: "../views/pantry.html"
                })
                .state('server', {
                    url: "/server",
                    templateUrl: "../views/server.html"
                })
                .state('prep', {
                    url: "/prep",
                    templateUrl: "../views/prep.html"
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "../views/login.html",
                    controller: function($scope){
                        $scope.UserService();
                    }
                })
                .state('auth', {
                url: "/auth/google",
                templateUrl: "http://localhost:8080/auth/google/callback"
                 })
                .state('logout', {
                    url:"/logout",
                    templateUrl:"../views/mainIndex.html",
                    controller: function($scope){
                        $scope.UserService();
                    }
                });
        });
})();

