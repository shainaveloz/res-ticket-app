// 'use strict';
//
// (function() {
//     angular
//         .module('ticketApp')
//         .service('buttonSrvc', function (switchElem, select) {
//
//             switchElem = element(by.css('[ng-switch]'));
//             select = element(by.model('selection'));
//
//             it('should start on a button', function () {
//                 expect(switchElem.getText()).toMatch(/buttons/);
//             });
//             it('should change face of buttons to food names', function () {
//                 select.all(by.css('option')).get(1).click();
//                 expect(switchElem.getText()).toMatch(/CONST/);
//             });
//         });
// });
