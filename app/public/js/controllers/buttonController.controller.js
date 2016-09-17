'use strict';

(function(){

    angular
        .module('ticketApp')
        .controller('buttonController', function($scope, CONST){

            // decorator takes a list of angular dependency names:
            $scope.range = function(n){
                var array = [];
                for(var i = 0 ; i < n ; i++)
                    array.push(i);
                return array;
            };

            $scope.buttonType = ['CONST'];

            $scope.updateButtons = function() {

                $scope.buttons.splice($scope.numOfButtons, $scope.buttons.length);
            }
        })
    }
)();
