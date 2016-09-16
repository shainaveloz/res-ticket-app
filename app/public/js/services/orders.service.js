'use strict';

angular
    .module('ticketApp')
    .factory('OrdersSvc', function($http, $rootScope, moment, Auth) {

        var today = new Date();
        today = new Date(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

        // Add orders to the arrays
        var processOrderByTimes = function(){
            returnObj.todayOrders = [];

            for(var i in returnObj.allOrders){
                returnObj.allOrders[i].date = new Date (returnObj.allOrders[i].date);

                if(returnObj.allOrders[i].date.getTime() == today.getTime())
                    returnObj.todayOrders.push(returnObj.allOrders[i]);
                else if(returnObj.allOrders[i].date.getTime() == tomorrow.getTime())
                    returnObj.tomorrowOrders.push(returnObj.allOrders[i]);
            }
        };

        // Add or update item in the other arrays
        var socketsCallback = function(event, item){
            if(event == 'created'){
                if(item.date.getTime() == today.getTime())
                    returnObj.todayOrders.push(item);
                else if(item.date.getTime() == tomorrow.getTime())
                    returnObj.tomorrowOrders.push(item);
            }
            else{
                var itemInToday = _.find(returnObj.todayOrders, {_id: item._id});
                var itemInTomorrow = _.find(returnObj.tomorrowOrders, {_id: item._id});

                if(itemInToday){
                    var index = returnObj.todayOrders.indexOf(itemInToday);
                    returnObj.todayOrders.splice(index, 1, item);
                }
                else if(itemInTomorrow){
                    var index = returnObj.tomorrowOrders.indexOf(itemInTomorrow);
                    returnObj.tomorrowOrders.splice(index, 1, item);
                }
            }
        };

        var returnObj =  {

            allOrders: [],
            todayOrders: [],
            tomorrowOrders: [],
            prom: null,
            loaded: false,

            loadOrders: function(){
                Auth.isLoggedInAsync(function(loggedIn) {
                    if(loggedIn && Auth.isManager()){
                        if(!returnObj.prom || returnObj.prom.$$state.status === 0 || returnObj.allOrders.length === 0) {
                            returnObj.prom = $http.get('/api/orders/');
                            returnObj.prom.success(function (orders) {
                                returnObj.allOrders = orders;
                                processOrderByDates();
                                $rootScope.$broadcast('OrdersSvc:ordersLoaded');
                                if (!returnObj.loaded) {
                                    socket.syncUpdates('order', returnObj.allOrders, socketsCallback, 'date');
                                    returnObj.loaded = true;
                                }
                            });
                        }
                    }
                });
            },

            cleanOrders: function(){
                returnObj.allOrders = [];
                returnObj.todayOrders = [];
                returnObj.tomorrowOrders = [];
            }
        };



        returnObj.loadOrders();

        return returnObj

    });