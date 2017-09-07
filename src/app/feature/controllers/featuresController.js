
'use strict';

define(['app'], function (app) {
    
	 var featuresController = function ($rootScope, $scope, $log, $timeout,$filter, $route, _, localize, messageService, modalService,
			 dashboardService, constantService, navigationService, localStorageService, configurationService,
			 featureService, filterService, NgTableParams) {
		 
		var userInfo, promis,filteredResult;
	
		$scope.getLocalizedValue = function(key) {
			return localize.getLocalizedString(key);
		}
		 
		$scope.goToFeatureForEdit=function(feature){
			if(feature != undefined && feature != null){
				navigationService.showPageWithData('features', feature.componentId);
			}
		}
					
        $scope.gotoFeature=function(){
			navigationService.menuNavigation('feature');
		}
	        					    	 			
	    var getAllFeature = function() {
     	    var featureObj={operation : constantService.GetAll, loginBean : userInfo }
			promis = featureService.postObject(featureObj);
            promis.then(function (respdata) {
             	if (!respdata.success) {return;}

             	var data = respdata.data;
             	
				$scope.tableParams = new NgTableParams({
					count: 5,
					sorting: { uniqueCode: "asc" } 
				  }, { 
					getData: function(params) {
						var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : pageData;
						var filteredData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;			
						params.total(filteredData.length);
						var pageData = filteredData.slice((params.page() - 1) * params.count(), params.page() * params.count());
						return pageData;		
					}
				});				                    	                
	                            
            });
							
	    };
			 
		$scope.deleteFeature = function(feature){
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
					getAllFeature();
				});
            });
		};
				
	 	var init = function () {
	 		//TODO: need to fill up the userInfo from cookie store
	 		// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	 		userInfo = null ;
	 		getAllFeature();	 	
	 	};
		 	
	 	init();
	 	
	};
	 
    app.register.controller('featuresController', ['$rootScope', '$scope', '$log', '$timeout','$filter', '$route', '_' , 'localize', 'messageService','modalService','dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','featureService','filterService','NgTableParams', featuresController]);
 	
});

