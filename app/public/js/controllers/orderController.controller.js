'use strict';

(function(){
    angular
        .module('ticketApp')
        .controller('OrdersCtrl', function ($scope, $state, $filter, $http, moment, Auth, Config, UIHandler) {

            var Time = new Date();
            var today = new Date(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

            // Order data
            $scope.order = {
                date: new Date(),
                time: '',
                username: null,
                name: '',
                items: []
            };

            $scope.loggedIn = Auth.isLoggedIn();
            if($scope.loggedIn) {
                $scope.order.username = angular.copy(Auth.getCurrentUser());
                $scope.order.name = $scope.order.username.name;
            }


            // Attach user
            if(Auth.isLoggedIn())
                $scope.order.username = Auth.getCurrentUser()._id;

            // Attach orders
            if($scope.orders) {
                $scope.order.date = new Date($scope.dish.date.getTime());
                $scope.order.items.push({ amount: $scope.dish.amount, item: $scope.dish.order._id });
            }


            // Form
            $scope.PerformOrder = function(form){
                $scope.submitted = true;

                if(form.$valid){

                    // Build up object
                    var objRequest = angular.copy($scope.order);

                    if(!Auth.isLoggedIn())
                        delete objRequest.username;

                    // Attach time
                    objRequest.date = new Date($scope.selectedDate.date.getTime());
                    objRequest.time = objRequest.time.replace('.', ':');

                    $http.post('/api/orders/', objRequest).success(function(order) {

                        console.log(order);
                        var header = 'Order booked!';
                        var msg = '<p>Your order has been booked successfully!!</p>' +
                            '<h4 class="text-center">' + $scope.selectedDate.str + ' at ' + order.time;

                        UIHandler.DialogConfirm(header, msg, 'success', {backdrop: 'static', callback: $scope.redirect});
                    }).error(function(err){
                        var msg = "Something wrong happened, please try again";
                        UIHandler.DialogConfirm('Error', msg, 'error');
                    });
                }
            };


            //times
            $scope.times = [];

            $scope.times.push({ str: 'Today, ' + $filter('date')(today, 'EEEE dd'), time: new Time(today.getTime())});
            today.setDate(today.getDate() + 1);

            for(var i=0; i < Config.itemsToDisplay - 2; i++){
                today.setDate(today.getDate() + 1);
                $scope.dates.push({ str: $filter('date')(today, 'EEEE dd'), date: new Date(today.getTime()) });
            }

            for(var i in $scope.dates)
                if($scope.dates[i].date.getTime() == $scope.order.date.getTime())
                    $scope.selectedDate = $scope.dates[i];


        });
})();