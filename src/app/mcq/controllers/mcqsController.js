
'use strict';

define(['app'], function (app) {
    
	 var mcqsController = function ($rootScope, $scope, $log, $timeout,$filter, $route, _, localize, messageService, modalService,
			 dashboardService, constantService, navigationService, localStorageService, configurationService,
			 mcqService, filterService, NgTableParams) {
		 
		var userInfo, promis,filteredResult;
	
		$scope.getLocalizedValue = function(key) {
			 return localize.getLocalizedString(key);
		}
		
		$scope.menu = [];
		 
		$scope.goToMcqForEdit=function(mcq){
			if(mcq != undefined && mcq != null){
				navigationService.showPageWithData('mcqs', mcq.componentId);
			}
		}
			        
        $scope.gotoMcq=function(){
			navigationService.menuNavigation('mcq');
		}	        					    	 
			
	    var getAllMcq = function() {
     	    var mcqObj={operation : constantService.GetAll, loginBean : userInfo }
			promis = mcqService.postObject(mcqObj);
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
						//params.total(100);
						var pageData = filteredData.slice((params.page() - 1) * params.count(), params.page() * params.count());
						return pageData;		
					}
				 });	
				
            });
							
	    };
	    
	    $scope.pageChanged = function() {
	    	//alert('aaa');
	    	//getAllMcq();
	      };
	      

			 
		$scope.deleteMcq = function(mcq){
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
					getAllMcq();
				});
            });
		};
				
		
	 	var init = function () {
	 		//TODO: need to fill up the userInfo from cookie store
	 		// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	 		userInfo = null ;
	 		getAllMcq();
	 		
	 		
	 	};
				
	 	init();
	 	
	};
	 
    app.register.controller('mcqsController', ['$rootScope', '$scope', '$log', '$timeout','$filter', '$route', '_' , 'localize', 'messageService','modalService','dashboardService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','mcqService','filterService','NgTableParams', mcqsController]);
   	
});

