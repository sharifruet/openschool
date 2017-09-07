
'use strict';

define(['app'], function (app) {
    
	 var rolesController = function ($rootScope, $scope, $log, $timeout,$filter, $route, _, localize, messageService, modalService,
			 dashboardService, constantService, navigationService, localStorageService, configurationService,
			 roleService, filterService, NgTableParams) {
		 
		var userInfo, promis,filteredResult;
	
		$scope.getLocalizedValue = function(key) {
			 return localize.getLocalizedString(key);
		}
		 
		$scope.goToRoleForEdit=function(role){
			if(role != undefined && role != null){
				navigationService.showPageWithData('roles', role.componentId);
			}
		}
			        
	    $scope.gotoRole=function(){
			navigationService.menuNavigation('role');
		}
	        					    	 			
	     var getAllRole = function() {
         	    var roleObj={operation : constantService.GetAll, loginBean : userInfo }
				promis = roleService.postObject(roleObj);
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
			 
		$scope.deleteRole = function(role){
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
					getAllRole();
				});
            });
		};
						
	 	var init = function () {
	 		//TODO: need to fill up the userInfo from cookie store
	 		// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	 		userInfo = null ;
	 		getAllRole();	 		
	 	};
		 			
	 	init();
	 	
	 };
	 
    app.register.controller('rolesController', ['$rootScope', '$scope', '$log', '$timeout','$filter', '$route', '_' , 'localize', 'messageService','modalService','dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','roleService','filterService','NgTableParams', rolesController]);
   	
});

