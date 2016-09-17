'use strict';

(function(){
    angular
        .module('ticketApp')
        .controller('OrdersCtrl', function ($scope, $state, $filter, $http, moment, Auth, Config, UIHandler) {

            var now = new Date();
            var today = new Date(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

            // Order data
            $scope.order = {
                date: new Date(),
                time: '',
                amount: 0,
                _user: null,
                name: '',
                _items: []
            };

            $scope.loggedIn = Auth.isLoggedIn();
            if($scope.loggedIn) {
                $scope.order._user = angular.copy(Auth.getCurrentUser());
                $scope.order.name = $scope.order._user.name;
            }


            // Attach user
            if(Auth.isLoggedIn())
                $scope.order._user = Auth.getCurrentUser()._id;

            // Attach orders
            if($scope.orders) {
                $scope.order.date = new Date($scope.dish.date.getTime());
                $scope.order._items.push({ amount: $scope.dish.amount, _item: $scope.dish._order._id });
            }


            // Form
            $scope.PerformOrder = function(form){
                $scope.submitted = true;

                if(form.$valid){

                    // Build up object
                    var objRequest = angular.copy($scope.order);

                    if(!Auth.isLoggedIn())
                        delete objRequest._user;

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

            $scope.redirect = function(){
                ArticlesSvc.resetSelection();
                $state.go('articles');
            };


            //times
            $scope.times = [];

            $scope.times.push({ str: 'Today, ' + $filter('date')(today, 'EEEE dd'), time: new Time(today.getTime())});
            today.setDate(today.getDate() + 1);
            $scope.dates.push({ str: 'Tomorrow, ' + $filter('date')(today, 'EEEE dd'), date: new Date(today.getTime()) });

            for(var i=0; i < Config.itemsToDisplay - 2; i++){
                today.setDate(today.getDate() + 1);
                $scope.dates.push({ str: $filter('date')(today, 'EEEE dd'), date: new Date(today.getTime()) });
            }

            for(var i in $scope.dates)
                if($scope.dates[i].date.getTime() == $scope.order.date.getTime())
                    $scope.selectedDate = $scope.dates[i];


        });
})();