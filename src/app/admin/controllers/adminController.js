
'use strict';

define(['app'], function (app) {
    
		var adminController = function ($rootScope, $scope, $log, $timeout, $route, _, messageService, 
			 constantService, navigationService, localStorageService, 
			 configurationService ) {
		 
		var userInfo, promis;
		
	
		$scope.adminLinks = [
								{
			                    	"id" : "users", 
			                    	"url" : "users", 
			                    	"linkText" : "Users", 
			                    	"description" : "User Management" 
								},
								{
									"id" : "roles", 
			                    	"url" : "roles", 
			                    	"linkText" : "Roles", 
			                    	"description" : "Role Management" 
								},
								{
									"id" : "features", 
			                    	"url" : "features", 
			                    	"linkText" : "Features", 
			                    	"description" : "Feature Management" 
								},
								{
									"id" : "userroleassign", 
			                    	"url" : "userroleassign", 
			                    	"linkText" : "User Role Assignment", 
			                    	"description" : "User Role Assignment" 
								},
								{
									"id" : "rolefeatureassign", 
			                    	"url" : "rolefeatureassign", 
			                    	"linkText" : "Role Feature Assignment", 
			                    	"description" : "Role Feature Assignment" 
								}																					                      
		                    ];
						
		$scope.performClickAction = function(menuId){			
			navigationService.menuNavigation(menuId);
		}
		
	 	var init = function () {
	 		$scope.user = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('adminController', ['$rootScope', '$scope', '$log', '$timeout', '$route', '_',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService', adminController]);
   	
});

