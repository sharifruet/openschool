
'use strict';


define(['app', 'common/services/utils/constantService'], function (app) {

    var languageService = function ($rootScope, constantService) {
    	
    	this.languageChange = function () {
            $rootScope.$broadcast(constantService.LanguageChange, constantService.LanguageChange);
        };
    	
    };
    
    app.service('languageService', ['$rootScope', 'constantService', languageService]);

});


