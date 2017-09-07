
'use strict';

define(['app'], function (app) {
    
	 var userController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, userService) {
		 
		var userInfo, promis;		
		
		
		$scope.resetfunction=function() {
			$scope.user = '';
		    //document.getElementById("userForm").reset();
		}

		$scope.saveUser=function(user){
			if (userService.isEmpty()) {
				return;
         	}
			
			if(user.uniqueCode == undefined || user.uniqueCode == '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.userObj = user;
			$scope.userObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.userObj.operation = constantService.Save;
			}else{
				$scope.userObj.operation = constantService.Update;
				$scope.userObj.componentId = $routeParams.componentId;
			}
			promis = userService.postObject($scope.userObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('user_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.user= {};
			});
		};
		
		$scope.goBackInUserListPage = function(){
			navigationService.menuNavigation('users')
		};
		
		var getUserByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =userService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				localizedMsg = localize.getLocalizedString('unable_to_load_user_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			$scope.user = data.data;
		});
	 };
	 
	 $scope.deleteUser=function(user){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + user.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('user') + ' ' + user.uniqueCode +' ?';
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
				var userObj={loginBean:userInfo,operation: constantService.Delete,componentId:user.componentId}			
				promis = userService.postObject(userObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					localizedDeleteSuccessMsg = localize.getLocalizedString('user_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.user= {};
				});
         });
		};
	 
		var init = function () {
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getUserByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('userController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'userService', userController]);
   
	
});
