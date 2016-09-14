'use strict';

(function(){

    angular
        .module('moment')
        .controller('ticketApp', amStartOf);

    function amStartOf(){
        moment().startOf('second');
    }

})();