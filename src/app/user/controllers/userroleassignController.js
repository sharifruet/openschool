
'use strict';

define(['app'], function (app) {
    
	 var userroleassignController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, userService, roleService, filterFilter) {
		 
		var userInfo, promis;
		$scope.users = [];
		$scope.roles = [];		
		$scope.selectedUserId = null;
				
	    // helper method
	    $scope.selectedRoles = function selectedRoles() {
	      return filterFilter($scope.roles, { selected: true });
	    };

	    
		$scope.selectUserChange = function() {
			console.log('selected-id:' + $scope.selectedUserId);
			if($scope.selectedUserId == undefined || $scope.selectedUserId == null || $scope.selectedUserId == ''){
				return;
			}			
			getUserRolesByID($scope.selectedUserId);
		}
		
		$scope.resetfunction = function() {
			$scope.selectedUserId = null;
			angular.forEach($scope.roles, function(role) {				
				role.selected = false;
				console.log("role.id: " + role.componentId + ";role.selected = " + role.selected);
			});
		}

		$scope.saveUserRole = function(){									
			if (userService.isEmpty()) {
				return;
         	}
						
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.userroles = {};
			$scope.userroles.componentId = $scope.selectedUserId;
			$scope.userroles.roles = [];
			angular.forEach($scope.roles, function(role) {				
				if(role.selected){
					$scope.userroles.roles.push(role.componentId);
				}
			});				
			
			$scope.userroles.loginBean = userInfo;
			$scope.userroles.operation = constantService.RoleAssign;
			
			promis = userService.postObject($scope.userroles);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('userrole_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
			});
			
		};
		
		$scope.goBackInUserListPage = function(){
			navigationService.menuNavigation('users')
		};
		
		var getUserRolesByID = function(userId) {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
					operation : constantService.GetUserRolesByID,
					loginBean : userInfo,
					componentId : userId
		    };

			//making all false first
			angular.forEach($scope.roles, function(role) {
				role.selected = false;
			});
			
		    promis = userService.postObject(Obj);
		    promis.then(function(data) {
				if (!data.success) {
					localizedMsg = localize.getLocalizedString('unable_to_load_userrole_information');
					messageService.showMessage(constantService.Danger, localizedMsg);
					return;
				}

				angular.forEach($scope.roles, function(role) {
					angular.forEach(data.data, function(assignedRole) {
						if(assignedRole.componentId == role.componentId){
							role.selected = true;
						}																
					});
				});
												
		    });
		};
	 

	     var getAllUser = function() {
      	    var userObj = {operation : constantService.GetAll, loginBean : userInfo }
			promis = userService.postObject(userObj);
            promis.then(function (data) {
	          	if (!data.success) {return;}
	          	$scope.users = data.data;
            });
							
	     };

	     var getAllRole = function() {
      	    var roleObj = {operation : constantService.GetAll, loginBean : userInfo }
			promis = roleService.postObject(roleObj);
            promis.then(function (data) {
	          	if (!data.success) {return;}
	          	$scope.roles = data.data;
            });
								
	     };

	 
		var init = function () {
			//loading all users 
			getAllUser();	
			
			//load all roles
			getAllRole();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('userroleassignController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'userService', 'roleService', 'filterFilter', userroleassignController]);
   	
});
