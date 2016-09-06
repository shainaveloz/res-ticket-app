(function () {
    'use strict';

    var controllerId = 'people';

    angular.module('ticketApp')
        .controller(controllerId, ['$scope', people]);

    function people($scope) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'people';

        activate();

        function activate() {
        }
    }
})();