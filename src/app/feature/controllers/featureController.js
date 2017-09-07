
'use strict';

define(['app'], function (app) {
    
	 var featureController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, featureService) {
		 
		var userInfo, promis;		
		
		
		$scope.resetfunction=function() {
			$scope.feature = '';
		    //document.getElementById("featureForm").reset();
		}

		$scope.saveFeature=function(feature){
			if (featureService.isEmpty()) {
				return;
         	}
			
			if(feature.uniqueCode == undefined || feature.uniqueCode == '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.featureObj = feature;
			$scope.featureObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.featureObj.operation = constantService.Save;
			}else{
				$scope.featureObj.operation = constantService.Update;
				$scope.featureObj.componentId = $routeParams.componentId;
			}
			promis = featureService.postObject($scope.featureObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('feature_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.feature= {};
			});
		};
		
		$scope.goBackInFeatureListPage = function(){
			navigationService.menuNavigation('features')
		};
		
		var getFeatureByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =featureService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_feature_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			$scope.feature = data.data;
		});
	 };
	 
	 $scope.deleteFeature=function(feature){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + feature.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('feature') + ' ' + feature.uniqueCode +' ?';
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
				var featureObj={loginBean:userInfo,operation: constantService.Delete,componentId:feature.componentId}			
				promis = featureService.postObject(featureObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('feature_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.feature= {};
				});
         });
		};
	 
		var init = function () {
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getFeatureByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('featureController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'featureService', featureController]);
   
	
});
