
'use strict';

define(['app'], function (app) {
    
	 var mcqController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, mcqService, menuService) {
		 
		var userInfo, promis;		
		$scope.mcq = {};
		
		$scope.parents = [];
		$scope.mcq.tags = [];
		
		$scope.resetfunction=function() {
			$scope.mcq = {};
		}
		
		$scope.search = {"name":"", "isEnd":"1"};

		//JS_CODE_FOR_CHILDREN_ADD//
		
		var processResponseDataBeforeView = function (mcq){			
					
					
					
		};
				
		var processInputDataBeforeSave = function (mcq){
			
		};
		
		$scope.saveMcq = function(mcq){
	
			if (mcqService.isEmpty()) {
				
				return;
         	}

			if(mcq.question == undefined || mcq.question == '' 
				|| mcq.optiona == undefined || mcq.optiona == '' 
					|| mcq.optionb == undefined || mcq.optionb == '' 
						|| mcq.optionc == undefined || mcq.optionc == '' 
							|| mcq.optiond == undefined || mcq.optiond == ''
								|| mcq.answer == undefined || mcq.answer == '' 
				){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
		
			//removing child componentId which was added UI rendering perspective
			processInputDataBeforeSave(mcq);
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.mcqObj = mcq;
			$scope.mcqObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.mcqObj.operation = constantService.Save;
			}else{
				$scope.mcqObj.operation = constantService.Update;
				$scope.mcqObj.componentId = $routeParams.componentId;
			}
			promis = mcqService.postObject($scope.mcqObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('mcq_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.mcq= {};
				$scope.mcq.tags=[];
			});
		};
		
		$scope.goBackInMcqListPage = function(){
			navigationService.menuNavigation('mcqs')
		};
		
		$scope.addTags = function(item){
			var found = false;
			angular.forEach($scope.mcq.tags, function(t){
				if(item.componentId == t.componentId){
					found = true;
				}
					
			});
			if(!found)
				$scope.mcq.tags.push(item);

		};
		
		$scope.removeTags = function(item){
			
			var idx = 0;
			var found = true;
			angular.forEach($scope.mcq.tags, function(t){
				if(item.componentId == t.componentId){
					found = true;
				}
				if(!found){
					idx++;
				}
					
			});
			if(found)
				$scope.mcq.tags.splice(idx, 1);
		};
		
		var getMcqByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =mcqService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_mcq_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//handle the date related conversion if needed
			processResponseDataBeforeView(data.data);
			
			$scope.mcq = data.data;
			
			if($scope.mcq.tags == undefined || $scope.mcq.tags == null)
				$scope.mcq.tags = [];
			
		});
	 };
	 
	    var loadMenu = function() {
      	    var menuObj = {operation : constantService.GetAll, loginBean : userInfo }
			promis = menuService.postObject(menuObj);
            promis.then(function (data) {
	          	if (!data.success) {return;}
	          	$scope.menu = data.data;
	          	
	          	angular.forEach(data.data, function(value, key){
	                if(value.isEnd==0){
	                	$scope.parents[value.componentId] = value;
	                }
	             });
	          	
	          	
            });
							
	     };
	 
	 $scope.deleteMcq=function(mcq){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + mcq.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('mcq') + ' ' + mcq.uniqueCode +' ?';
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
				var mcqObj={loginBean:userInfo,operation: constantService.Delete,componentId:mcq.componentId}			
				promis = mcqService.postObject(mcqObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('mcq_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.mcq= {};
				});
         });
		};
	 
		var init = function () {
			loadMenu();
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getMcqByID();
	 		
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('mcqController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'mcqService', 'menuService', mcqController]);
   
	
});
