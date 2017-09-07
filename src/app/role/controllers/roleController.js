
'use strict';

define(['app'], function (app) {
    
	 var roleController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, roleService) {
		 
		var userInfo, promis;		
		
		
		$scope.resetfunction=function() {
			$scope.role = '';
		    //document.getElementById("roleForm").reset();
		}

		$scope.saveRole=function(role){
			if (roleService.isEmpty()) {
				return;
         	}
			
			if(role.uniqueCode == undefined || role.uniqueCode == '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.roleObj = role;
			$scope.roleObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.roleObj.operation = constantService.Save;
			}else{
				$scope.roleObj.operation = constantService.Update;
				$scope.roleObj.componentId = $routeParams.componentId;
			}
			promis = roleService.postObject($scope.roleObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('role_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.role= {};
			});
		};
		
		$scope.goBackInRoleListPage = function(){
			navigationService.menuNavigation('roles')
		};
		
		var getRoleByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =roleService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_role_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			$scope.role = data.data;
		});
	 };
	 
	 $scope.deleteRole=function(role){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + role.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('role') + ' ' + role.uniqueCode +' ?';
		 	var btnCancelText = localize.getLocalizedString('btn_cancel');
		 	var btnOkText = localize.getLocalizedString('btn_ok');
		 	
		 	
			var modalOptions = {
                 headerText: localizedHeaderText,
                 bodyText: localizedBodyText,
                 closeButtonText: btnCancelText,
                 actionButtonText: btnOkText
             };

             var modalDefaults = {
                 templateUrl: 'app/common/partials/confirmation.html'
             };
             modalService.showModal(modalDefaults, modalOptions).then(function () {	           	
				var roleObj={loginBean:userInfo,operation: constantService.Delete,componentId:role.componentId}			
				promis = roleService.postObject(roleObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('role_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.role= {};
				});
         });
		};
	 
		var init = function () {
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getRoleByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('roleController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'roleService', roleController]);
   
	
});
