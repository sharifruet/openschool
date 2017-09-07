'use strict';

define(['app'], function (app) {

    var autoComplete = function () {
    	return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    	};
    	
    };

    app.directive('autoComplete', [ autoComplete ]);


});

