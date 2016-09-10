// constants.js

/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('ticketApp')
        .constant('toastr', toastr)
        .constant('moment', moment);
        .constant('CONST', {
            inputButtonData: {

                ['cheeseButton': 'American', 'Swiss', 'Provolone', 'Cheddar'],
                ['cookButton': 'Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'],
                'burgerButton': 'Burger',
                'shepardButton': 'Shepards Pie',
                'friesButton': 'Fries',
                'cheddarButton': 'Cheddar',
                'americanButton': 'American',
                'swissButton': 'Swiss',
                'provoloneButton': 'Provolone',
                'rareButton': 'Rare',
                'medRareButton': 'Medium Rare',
                'mediumButton': 'Medium',
                'medWellButton': 'Medium Well',
                'wellButton': 'Well Done',
                'wingsButton': 'Wings',
                'chickSaladButton': 'Chicken Salad',
                'houseSaladButton': 'House Salad',
                'iceCreamButton': 'Ice cream',
                'brownieButton': 'Brownie',
                'chickSanButton': 'Chicken Sandwich'
    });
})();
