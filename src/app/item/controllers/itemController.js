
'use strict';

define(['app'], function (app) {
    
	 var itemController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, itemService) {
		 
		var userInfo, promis;		
		$scope.item = {};
		
		$scope.resetfunction=function() {
			$scope.item = {};
		}

		//JS_CODE_FOR_CHILDREN_ADD//
		
		var processResponseDataBeforeView = function (item){			
					
					
					
		};
				
		var processInputDataBeforeSave = function (item){
			
		};
		
		$scope.saveItem = function(item){
			if (itemService.isEmpty()) {
				return;
         	}
			/*
			if(item.uniqueCode == undefined || item.uniqueCode == '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}*/

			//removing child componentId which was added UI rendering perspective
			processInputDataBeforeSave(item);
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.itemObj = item;
			$scope.itemObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.itemObj.operation = constantService.Save;
			}else{
				$scope.itemObj.operation = constantService.Update;
				$scope.itemObj.componentId = $routeParams.componentId;
			}
			promis = itemService.postObject($scope.itemObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('item_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.item= {};
			});
		};
		
		$scope.goBackInItemListPage = function(){
			navigationService.menuNavigation('items')
		};
		
		var getItemByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =itemService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_item_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//handle the date related conversion if needed
			processResponseDataBeforeView(data.data);
			
			$scope.item = data.data;
			
		});
	 };
	 
	 $scope.deleteItem=function(item){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + item.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('item') + ' ' + item.uniqueCode +' ?';
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
				var itemObj={loginBean:userInfo,operation: constantService.Delete,componentId:item.componentId}			
				promis = itemService.postObject(itemObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('item_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.item= {};
				});
         });
		};
	 
		var init = function () {
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getItemByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('itemController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'itemService', itemController]);
   
	
});
