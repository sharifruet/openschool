
'use strict';

define(['app'], function (app) {
    
	 var dashboardController = function ($rootScope, $scope, $log, $timeout, $route, _, messageService, 
			 dashboardService, constantService, navigationService, localStorageService, 
			 configurationService) {
		 
		var userInfo, promis;
		$scope.totalItems = 120;
		
	 	var init = function () {
	 		
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('dashboardController', ['$rootScope', '$scope', '$log', '$timeout', '$route', '_',
          'messageService', 'dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService', dashboardController]);
   
	
});

