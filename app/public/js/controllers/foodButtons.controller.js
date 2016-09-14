'use strict';

(function(){

    angular
        .controller('ticketApp', foodButtonData);

    /**@ngInject*/

    function foodButtonData(CONST){
        var vm = this;
        vm.inputEntree = CONST.inputEntreeData;
        vm.inputCheese = CONST.inputCheeseData;
        vm.inputCook = CONST.inputCookData;
        vm.inputApps = CONST.inputAppData;
        vm.inputSalad = CONST.inputSaladData;
        vm.inputDessert = CONST.inputDessertData;

    }

})();
