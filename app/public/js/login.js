'use strict';

(function (){
    angular
        .controller('loginCtrl', ['$scope', 'googleService', function ($scope, googleService) {

            $scope.login = function () {
                googleService.login().then(function (data) {

                    console.log(data.email);
                }, function (err) {
                    console.log('Failed: ' + err);
                });
            };
        }]);

})();