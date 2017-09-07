
'use strict';

define(['app'], function (app) {
    
	 var menuController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, menuService) {
		 
		var userInfo, promis;		
		$scope.menu = {};
		
		$scope.resetfunction=function() {
			$scope.menu = {};
		}

		//JS_CODE_FOR_CHILDREN_ADD//
		
		var processResponseDataBeforeView = function (menu){			
					
					
					
		};
				
		var processInputDataBeforeSave = function (menu){
			
		};
		
		$scope.saveMenu = function(menu){
			if (menuService.isEmpty()) {
				return;
         	}
			
			if(menu.name == undefined || menu.name == '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}

			//removing child componentId which was added UI rendering perspective
			processInputDataBeforeSave(menu);
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.menuObj = menu;
			$scope.menuObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.menuObj.operation = constantService.Save;
			}else{
				$scope.menuObj.operation = constantService.Update;
				$scope.menuObj.componentId = $routeParams.componentId;
			}
			promis = menuService.postObject($scope.menuObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('menu_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.menu= {};
			});
		};
		
		$scope.goBackInMenuListPage = function(){
			navigationService.menuNavigation('menus')
		};
		
		var getMenuByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =menuService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_menu_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//handle the date related conversion if needed
			processResponseDataBeforeView(data.data);
			
			$scope.menu = data.data;
			
		});
	 };
	 
	 var loadParents = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation 	: constantService.GetByFilter,
			 loginBean 	: userInfo,
			 filter		: {isEnd:0}
		    };
		    promis =menuService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_menu_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			$scope.parents = data.data;
			
		});
	 };
	 
	 $scope.deleteMenu=function(menu){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + menu.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('menu') + ' ' + menu.uniqueCode +' ?';
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
				var menuObj={loginBean:userInfo,operation: constantService.Delete,componentId:menu.componentId}			
				promis = menuService.postObject(menuObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('menu_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.menu= {};
				});
         });
		};
	 
		var init = function () {
			loadParents();
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getMenuByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('menuController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'menuService', menuController]);
   
	
});
