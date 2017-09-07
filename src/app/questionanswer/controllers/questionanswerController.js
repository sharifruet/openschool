
'use strict';

define(['app'], function (app) {
    
	 var questionanswerController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, questionanswerService, menuService) {
		 
		var userInfo, promis;		
		$scope.questionanswer = {};
		
		$scope.parents = [];
		$scope.questionanswer.tags = [];
		
		$scope.resetfunction=function() {
			$scope.questionanswer = {};
		}

		//JS_CODE_FOR_CHILDREN_ADD//
		
		var processResponseDataBeforeView = function (questionanswer){			
					
					
					
		};
				
		var processInputDataBeforeSave = function (questionanswer){
			
		};
		
		$scope.saveQuestionanswer = function(questionanswer){
	
			if (questionanswerService.isEmpty()) {
				console.log('Empty');
				return;
         	}

			if(questionanswer.question == undefined || questionanswer.question == '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}

			//removing child componentId which was added UI rendering perspective
			processInputDataBeforeSave(questionanswer);

			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
	
			$scope.questionanswerObj = questionanswer;
	
			$scope.questionanswerObj.loginBean = userInfo;	
	
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.questionanswerObj.operation = constantService.Save;
			}else{
				$scope.questionanswerObj.operation = constantService.Update;
				$scope.questionanswerObj.componentId = $routeParams.componentId;
			}
		
			promis = questionanswerService.postObject($scope.questionanswerObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('questionanswer_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.questionanswer= {};
			});
		};
		
		$scope.goBackInQuestionanswerListPage = function(){
			navigationService.menuNavigation('questionanswers')
		};
		
		var getQuestionanswerByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =questionanswerService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_questionanswer_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//handle the date related conversion if needed
			processResponseDataBeforeView(data.data);
			
			$scope.questionanswer = data.data;
			
		});
	 };
	 
	 $scope.deleteQuestionanswer=function(questionanswer){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + questionanswer.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('questionanswer') + ' ' + questionanswer.uniqueCode +' ?';
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
				var questionanswerObj={loginBean:userInfo,operation: constantService.Delete,componentId:questionanswer.componentId}			
				promis = questionanswerService.postObject(questionanswerObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('questionanswer_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.questionanswer= {};
				});
         });
		};
		
		
		$scope.addTags = function(item){
			var found = false;
			angular.forEach($scope.questionanswer.tags, function(t){
				if(item.componentId == t.componentId){
					found = true;
				}
					
			});
			if(!found)
				$scope.questionanswer.tags.push(item);

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
		     
	 
		var init = function () {
			loadMenu();
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getQuestionanswerByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('questionanswerController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'questionanswerService','menuService', questionanswerController]);
   
	
});
