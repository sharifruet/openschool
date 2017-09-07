
'use strict';

define(['app'], function (app) {

    var startFromFilter = function () {
    	 return function(input, start) {
    	        if(input) {
    	            start = +start; //parse to int
    	            return input.slice(start);
    	        }
    	        return [];
    	    }
    };

    app.filter('startFromFilter', startFromFilter);

});
