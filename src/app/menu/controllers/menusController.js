
'use strict';

define(['app'], function (app) {
    
	 var menusController = function ($rootScope, $scope, $log, $timeout,$filter, $route, _, localize, messageService, modalService,
			 dashboardService, constantService, navigationService, localStorageService, configurationService,
			 menuService, filterService, NgTableParams) {
		 
		var userInfo, promis,filteredResult;
	
		$scope.getLocalizedValue = function(key) {
			 return localize.getLocalizedString(key);
		}
		 
		$scope.goToMenuForEdit=function(menu){
			if(menu != undefined && menu != null){
				navigationService.showPageWithData('menus', menu.componentId);
			}
		}
			        
        $scope.gotoMenu=function(){
			navigationService.menuNavigation('menu');
		}	        					    	 
			
	    var getAllMenu = function() {
     	    var menuObj={operation : constantService.GetAll, loginBean : userInfo }
			promis = menuService.postObject(menuObj);
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
			 
		$scope.deleteMenu = function(menu){
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
					getAllMenu();
				});
            });
		};
				
		
	 	var init = function () {
	 		//TODO: need to fill up the userInfo from cookie store
	 		// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	 		userInfo = null ;
	 		getAllMenu();
	 		
	 	};
				
	 	init();
	 	
	};
	 
    app.register.controller('menusController', ['$rootScope', '$scope', '$log', '$timeout','$filter', '$route', '_' , 'localize', 'messageService','modalService','dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','menuService','filterService','NgTableParams', menusController]);
   	
});

