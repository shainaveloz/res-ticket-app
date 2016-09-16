'use strict';

(function(){
    angular
        .module('ticketApp')
        .controller('foodButtonClickController', ['$scope', function($scope){
            $scope.order = function(){
                if(foodButton == false){
                    $scope.showHide = function(){
                        $scope.IsVisible = $scope.IsVisible ? false : true;
                    }
                }
            }
        }]);
})();