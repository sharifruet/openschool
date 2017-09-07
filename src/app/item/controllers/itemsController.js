
'use strict';

define(['app'], function (app) {
    
	 var itemsController = function ($rootScope, $scope, $log, $timeout,$filter, $route, _, localize, messageService, modalService,
			 dashboardService, constantService, navigationService, localStorageService, configurationService,
			 itemService, filterService, NgTableParams) {
		 
		var userInfo, promis,filteredResult;
	
		$scope.getLocalizedValue = function(key) {
			 return localize.getLocalizedString(key);
		}
		 
		$scope.goToItemForEdit=function(item){
			if(item != undefined && item != null){
				navigationService.showPageWithData('items', item.componentId);
			}
		}
			        
        $scope.gotoItem=function(){
			navigationService.menuNavigation('item');
		}	        					    	 
			
	    var getAllItem = function() {
     	    var itemObj={operation : constantService.GetAll, loginBean : userInfo }
			promis = itemService.postObject(itemObj);
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
			 
		$scope.deleteItem = function(item){
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
					getAllItem();
				});
            });
		};
				
		
	 	var init = function () {
	 		//TODO: need to fill up the userInfo from cookie store
	 		// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	 		userInfo = null ;
	 		getAllItem();
	 		
	 	};
				
	 	init();
	 	
	};
	 
    app.register.controller('itemsController', ['$rootScope', '$scope', '$log', '$timeout','$filter', '$route', '_' , 'localize', 'messageService','modalService','dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','itemService','filterService','NgTableParams', itemsController]);
   	
});

