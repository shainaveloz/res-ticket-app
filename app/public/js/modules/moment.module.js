'use strict';

(function(){

    angular
        .module('ticketApp', ['angularMoment'])
        .run(function(amMoment) {
        amMoment.changeLocale('de');
    });
})();
