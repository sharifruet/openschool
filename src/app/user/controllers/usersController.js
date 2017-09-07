
'use strict';

define(['app'], function (app) {
    
	 var usersController = function ($rootScope, $scope, $log, $timeout,$filter, $route, _, localize, messageService, modalService,
			 dashboardService, constantService, navigationService, localStorageService, configurationService,
			 userService, filterService,NgTableParams) {
		 
		 var userInfo, promis,filteredResult;
	
		 $scope.getLocalizedValue = function(key) {
			 return localize.getLocalizedString(key);
		 }
		 
		 $scope.goToUserForEdit=function(user){
			if(user != undefined && user != null){
				navigationService.showPageWithData('users', user.componentId);
			}
		 }
			        
	        $scope.gotoUser=function(){
				navigationService.menuNavigation('user');
			}
	        					    	 			
		    var getAllUser = function() {
         	    var userObj={operation : constantService.GetAll, loginBean : userInfo }
				promis = userService.postObject(userObj);
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
							messageService.showMessage(constantService.Danger,data.message);
							return;
						}
						messageService.showMessage(constantService.Success,data.message);
						getAllUser();
					});
	            });
			};
				
		
				
				
	       
		 	var init = function () {		 		
		 		getAllUser();
		 	};
		 	
	 	init();
	 	
	 };
	 
    app.register.controller('usersController', ['$rootScope', '$scope', '$log', '$timeout','$filter', '$route', '_' , 'localize', 'messageService','modalService','dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','userService','filterService','NgTableParams', usersController]);
   
	
});

