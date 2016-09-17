'use strict';

(function(){
    angular
        .module('ticketApp')
        .controller('foodButtonController', ['$scope', function($scope){

            $scope.range = function(n){
                var array = [];
                for(var i = 0 ; i < n ; i++)
                    array.push(i);
                return array;
            };


            $scope.buttonType = ['CONST'];

            $scope.updateButtons = function() {

            $scope.buttons.splice($scope.numOfButtons, $scope.buttons.length);
            };
        }]);
})();