'use strict';

(function () {

    angular
        .module('ticketApp')
        .controller('buttons', buttons);

    /** @ngInject */

    function buttons (CONST) {
        var vm = this;
        vm.inputButtons = CONST.inputButtonData;
    }
})();
