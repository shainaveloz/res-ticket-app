// constants.js


(function() {
    'use strict';

    angular
        .module('ticketApp')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('CONST', {
            inputEntreeData:{
                'burgerButton': 'Burger',
                'shepardButton': 'Shepards Pie',
                'chickSanButton': 'Chicken Sandwich'
        })
        .constant('CONST', {
            inputCheeseData:{
                'cheddarButton': 'Cheddar',
                'americanButton': 'American',
                'swissButton': 'Swiss',
                'provoloneButton': 'Provolone'
            }
        })
        .constant('CONST', {
            inputCookData:{
                'rareButton': 'Rare',
                'medRareButton': 'Medium Rare',
                'mediumButton': 'Medium',
                'medWellButton': 'Medium Well',
                'wellButton': 'Well Done'
            }
        })
        .constant('CONST', {
            inputAppData:{
                'wingsButton': 'Wings',
                'friesButton': 'Fries'
            }
        })
        .constant('CONST', {
            inputSaladData:{
                'chickSaladButton': 'Chicken Salad',
                'houseSaladButton': 'House Salad'
            }
        })
        .constant('CONST', {
            inputDessertData:{
                'iceCreamButton': 'Ice cream',
                'brownieButton': 'Brownie'
            }
        })

})
})();
