
'use strict';

define(['app'], function (app) {
    
	 var rolefeatureassignController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, roleService, featureService, filterFilter) {
		 
		var userInfo, promis;
		
		$scope.roles = [];
		$scope.features = [];
		$scope.selectedRoleId = null;
				
	    // helper method
	    $scope.selectedFeatures = function selectedFeatures() {
	      return filterFilter($scope.features, { selected: true });
	    };

	    
		$scope.selectRoleChange = function() {
			console.log('selected-id:' + $scope.selectedRoleId);
			if($scope.selectedRoleId == undefined || $scope.selectedRoleId == null || $scope.selectedRoleId == ''){
				return;
			}			
			getRoleFeaturesByID($scope.selectedRoleId);
		}
		
		$scope.resetfunction = function() {
			$scope.selectedRoleId = null;
			angular.forEach($scope.features, function(feature) {				
				feature.selected = false;
				console.log("feature.id: " + feature.componentId + ";feature.selected = " + feature.selected);
			});
		}

		$scope.saveRoleFeature = function(){									
			if (roleService.isEmpty()) {
				return;
         	}
						
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.rolefeatures = {};
			$scope.rolefeatures.componentId = $scope.selectedRoleId;
			$scope.rolefeatures.featureIds = [];
			angular.forEach($scope.features, function(feature) {				
				if(feature.selected){
					$scope.rolefeatures.featureIds.push(feature.componentId);
				}
			});				
			
			$scope.rolefeatures.loginBean = userInfo;
			$scope.rolefeatures.operation = constantService.FeatureAssign;
			
			promis = roleService.postObject($scope.rolefeatures);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('rolefeature_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
			});
			
		};
		
		$scope.goBackInRoleListPage = function(){
			navigationService.menuNavigation('roles')
		};
		
		var getRoleFeaturesByID = function(roleId) {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
					operation : constantService.GetRoleFeaturesByID,
					loginBean : userInfo,
					componentId : roleId
		    };

			//making all false first
			angular.forEach($scope.features, function(feature) {
				feature.selected = false;
			});
			
		    promis = roleService.postObject(Obj);
		    promis.then(function(data) {
				if (!data.success) {
					localizedMsg = localize.getLocalizedString('unable_to_load_rolefeature_information');
					messageService.showMessage(constantService.Danger, localizedMsg);
					return;
				}

				angular.forEach($scope.features, function(feature) {
					angular.forEach(data.data, function(assignedFeature) {
						if(assignedFeature.componentId == feature.componentId){
							feature.selected = true;
						}																
					});
				});
												
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

	     var getAllFeature = function() {
	      	    var featureObj = {operation : constantService.GetAll, loginBean : userInfo }
				promis = featureService.postObject(featureObj);
	            promis.then(function (data) {
		          	if (!data.success) {return;}
		          	$scope.features = data.data;
	            });
								
		     };

	 
		var init = function () {			
			//load all roles
			getAllRole();
			
			//loading all features 
			getAllFeature();	

	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('rolefeatureassignController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'roleService', 'featureService', 'filterFilter', rolefeatureassignController]);
   	
});
