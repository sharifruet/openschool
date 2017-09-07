'use strict';

define([ 'app' ], function(app) {

	var userlistController = function($scope, $route,$location, $filter, $log, $modal, constantService, 
			localStorageService, confirmationService, messageService,projectService,employeeService,ngProgress,navigationService,ngTableParams,LoadService,userService,modalService) {

		var promis, userInfo;
		
	

		  var init = function(){
	    	    userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	    	   
			};
		
		init();
	};
	app.register.controller('userlistController', [ '$scope','$route', '$location', '$filter', '$log', '$modal',
	                                                'constantService', 'localStorageService', 'confirmationService', 'messageService','projectService','employeeService','ngProgress','navigationService','ngTableParams','LoadService','userService','modalService', userlistController ]);

	
	 	
});
