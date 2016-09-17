'use strict';

(function(){

    angular
        .module('ticketApp')
        .controller('buttonController', function($scope, config){

            import inject from 'ng-inject';

            // decorator takes a list of angular dependency names:
            @inject('$scope', 'config')
            class buttonControllerr {

                constructor() {
                    // both `$scope` and `config` are injected via DI:
                    this.$scope.config = ;
                }

                otherMethod() {
                    this.$scope.value = 1;
                }

            }
        })
    }
)();
