'use strict';

(function(){

    angular
        .module('ticketApp')
        .controller('moment', amStartOf);

    function amStartOf(){
        moment().startOf('second');
    }

})();