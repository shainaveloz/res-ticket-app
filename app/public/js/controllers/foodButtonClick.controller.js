'use strict';

(function(){
    angular
        .module('ticketApp')
        .controller('foodButtonClickController', ['$scope', function($scope){
            $scope.order = function(){
                    this.selected.favoriteDessert = dessert;
                    this._mdPanelRef && this._mdPanelRef.close().then(function() {
                        angular.element(document.querySelector('.demo-menu-open-button')).focus();

                }
            }
        }]);
})();