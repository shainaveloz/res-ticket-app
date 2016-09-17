'use strict';

(function(){

    angular
        .module('ticketApp', ['ngAnimate'])
        .service('buttonSrvc')
        .controller('buttonController', function($scope){
            $scope.items = ['foodButtonController', 'OrdersCtrl', 'Home', 'Login','Logout']
            $scope.selection = $scope.items[0];
        });
    }
)();
