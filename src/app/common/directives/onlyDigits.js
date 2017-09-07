
'use strict';

define(['app'], function (app) {

    var onlyDigits = function () {        
        
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return;
                ngModel.$parsers.unshift(function (inputValue) {
                    var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                    ngModel.$viewValue = digits;
                    ngModel.$render();
                    return digits;
                });
            }
        };
    };

    app.directive('onlyDigits', [onlyDigits]);

});