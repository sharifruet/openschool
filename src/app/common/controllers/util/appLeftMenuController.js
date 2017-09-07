
'use strict';

define(['app'], function (app) {
    
	 var appLeftMenuController = function ($rootScope, $scope, $log,$location, $route, navigationService, 
			 configurationService, localStorageService,constantService,localize,signInService) {

		 var userInfo, promis;
		
		 $scope.clickTopItem = function(item){
				var isActive = $("#"+item.id).hasClass('active');
				if(item.child.length > 0)
				{
					if (isActive) 
					{
		                $("#"+item.id).removeClass('active');		               
		                $("#"+item.id).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
		                $("#"+item.id).children('ul.treeview-menu').slideUp("fast","swing");
		            } 
					else 
					{
		                
		                angular.forEach($scope.menu, function(itm, index) {
							if(itm.child.length > 0){
								$("#"+itm.id).removeClass('active');
								 $("#"+itm.id).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
					            $("#"+itm.id).children('ul.treeview-menu').slideUp("fast","swing");
							}
			            });
		                
		                $("#"+item.id).addClass('active');
		                $("#"+item.id).children('a').children("i.fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
		                $("#"+item.id).children('ul.treeview-menu').slideDown("fast","swing");
		            }
				}
				else 
				{
					angular.forEach($scope.menu, function(itm, index) {
						if(itm.child.length > 0){
							$("#"+itm.id).removeClass('active');
							 $("#"+itm.id).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
				            $("#"+itm.id).children('ul.treeview-menu').slideUp("fast","swing");
						}
						/*if(itm.child.length == 0){
							$("#"+itm.id).removeClass('active');
						}*/
		            });
					$("#"+item.id).addClass('active');
					navigationService.menuNavigation(item.url);
				}
			}
		 
		 $scope.clickLeftMenu = function(menuId){
			 
			 pageLoadInfo = localStorageService.getValue(constantService.defaultValueCookieStoreKey);
		     if(pageLoadInfo != undefined && pageLoadInfo != null){
		     	localStorageService.setValue(constantService.defaultValueCookieStoreKey, null);
		     }
		    
			 if (menuId==='profile') {
				 $scope.showProfile($scope.loggedinUserInfo.employeeID);
				 return;
			}
			navigationService.menuNavigation(menuId);
		}
		
		$scope.clickChildItem = function(childMenuItem){
			navigationService.menuNavigation(childMenuItem.url);
		}
		 
		$scope.showProfile = function(employeeID){  
        	navigationService.showPageWithData('profile',$scope.loggedinUserInfo.employeeID);
		};

  
  $rootScope.layout = constantService.getAppLayout();
	
  $scope.$on('switch', function(event, userObj) { 
			
 	 	userObj.operation = 'switchrole';
			promis = signInService.switchRole(userObj);
			promis.then(function(data) {
				if (!data.success) {
					messageService.showMessage(constantService.Danger, 'Unable to switch role');
					return;
				}
			$scope.menu = JSON.parse(data.data.menuJSON);
			$rootScope.$broadcast( "changed",data.data );
			
		});
  });

  $scope.$on('primary', function(event, userObj) { 
	 	userObj.operation = 'switchrole';
			promis = signInService.switchRole(userObj);
			promis.then(function(data) {
				if (!data.success) {
					//messageService.showMessage(constantService.Danger, 'Unable to switch role');
					return;
				}
			$scope.menu = JSON.parse(data.data.menuJSON);			
			$rootScope.$broadcast( "backtoprimary",data.data );			
			
			
		});
  });
		var init = function () {
			userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	     	$scope.loggedinUserInfo = userInfo;
	     	$scope.menu = JSON.parse(userInfo.menuJSON);	     	
			$('#side-menu').metisMenu();			
	    }; 

	    
	    
	    init();
		 
	 };    
	 
	 app.controller('appLeftMenuController', ['$rootScope', '$scope', '$log','$location', '$route', 'navigationService', 
         'configurationService', 'localStorageService','constantService', 'localize','signInService', appLeftMenuController]);
	
});

