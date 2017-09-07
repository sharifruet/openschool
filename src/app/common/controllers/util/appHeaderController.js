
'use strict';

define(['app'], function (app) {
    
	 var appHeaderController = function ($rootScope,$http, $scope,$location, localStorageService, constantService,navigationService,signInService,modalService,authorizationService) {
		 
		 var userInfo,promis,encryptedPWD;
		 $scope.pass = '' ;
		 
        $scope.collapseAppLeftMenu = function () {
        	$rootScope.layout.leftPanel.isVisible = !$rootScope.layout.leftPanel.isVisible;
        	$rootScope.isMobile = !$rootScope.isMobile;
        };
        
        $scope.userToggle = function () {
            $('#userToggle').toggleClass('open', 500);
        };
           
        $scope.switchRole = function(pass) {
        	var modalOptions = {
    				closeButtonText		: 'Cancel',
      	            actionButtonText	: 'Login',
      	            headerText			: 'Switch To Secondary Role',
      	            rolejson			: JSON.parse(userInfo.roleJSON),
      	            pass				: pass
      	    };
        	
        	var modalDefaults = {
        	        templateUrl: 'app/views/security/switchRole.html'
        	};
        	modalService.showModal(modalDefaults, modalOptions).then(function (result) {         	    	
         	userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
         	userInfo.secondaryRole = result.secondaryRole;
             	userInfo.switchPassword=result.password;
             	userInfo.password = result.password;            	
             	getEncryptedPassword(userInfo);
             	switchDashboard(userInfo);   
             	result.password = '';
         	});
        };
        
       var getEncryptedPassword = function(Obj){ 
    	   Obj.operation='GetEntryptedPWD';
    	   promis = signInService.encryptPassword(Obj); 
	    	promis.then(function(data){
	    	if(!data.success)
	    		{
	    		  messageService.showMessage(constantService.Danger,'Failed to encrypt password ');
	    		  return;
	    		}  
	    	    encryptedPWD = data.data; 
	    	})
    	   
	    };
        
     var switchDashboard = function (userObj) {
    	$rootScope.$broadcast( "switch",userObj );       
    	};

	   $scope.$on('changed', function(event, userObj) {
		userInfo.menuJSON = userObj.menuJSON;
		localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
		$scope.loggedinUserInfo.secondaryRole = userObj.secondaryRole;
		if(userInfo.secondaryRole=="Admin")
		{
		  navigationService.menuNavigation("admindashboard");
		}
    	else if(userInfo.secondaryRole=="Employee")
		{
		  navigationService.menuNavigation("businessdashboard");
		}else if(userInfo.secondaryRole=="Checker")
		{
		  navigationService.menuNavigation("checkerdashboard");
		}else if(userInfo.secondaryRole=="Maker")
		{
			  navigationService.menuNavigation("makerdashboard");
			}
    	else
		{
		  navigationService.menuNavigation("dashboard");
		}

		});
		
		$scope.$on('backtoprimary', function(event, userObj) {
			userInfo.menuJSON = userObj.menuJSON;
			userInfo.secondaryRole = userInfo.primaryRole;
			localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
			$scope.loggedinUserInfo.secondaryRole = userObj.secondaryRole;
			 if(userInfo.roleID =="Maker")
			 {
				 navigationService.menuNavigation("makerdashboard");
			 }
			 if(userInfo.roleID =="Employee")
			 {
				 navigationService.menuNavigation("makerdashboard");
			 }
	
		});
        
		$scope.goToPrimaryRole = function(){
			var userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo.secondaryRole = userInfo.primaryRole;
			 
			 localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
			 $scope.loggedinUserInfo = userInfo;
			 
			 $rootScope.$broadcast( "primary",userInfo );
			 
	    };
        
        $scope.showProfile = function(employeeID){
           	navigationService.showPageWithData('profile',$scope.loggedinUserInfo.employeeID);
        };
        
        $scope.showChangePasswordPage = function(employeeID){
        	navigationService.showPageWithData('changePassword',employeeID);
        };
        
        $scope.signOut = function(){
        	var userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
        	userInfo.operation = constantService.userlogout;
        	promis = signInService.doSignOut(userInfo);
            promis.then(function (data) {
                localStorageService.setValue(constantService.userInfoCookieStoreKey, null);
                $location.path('/');
            });
        };
        
        var checkSecondayRole = function(){
			if (userInfo.roleJSON == '' || userInfo.roleJSON == undefined || userInfo.roleJSON == null) {
				$("#switchrole").hide();
			}
			else {
				$("#switchrole").show();
			}
		};
	
		
		 $('[data-toggle="tooltip"]').tooltip();
		 
		 $scope.switchToSecondary = function(){ 
			 if (userInfo.switchPassword != null || userInfo.switchPassword != undefined){
				 $scope.switchRole(userInfo.switchPassword)
				 return;
			 }
			 userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			 var dcrptObj = {
		         		operation 	: constantService.GetDecryptedPWD, 
		         		password 	: userInfo.password
		     };
			 promis = signInService.getDecryptedPassword(dcrptObj); 
			 promis.then(function(data){
				 if(!data.success)
		    		{
		    		  messageService.showMessage(constantService.Danger,'Failed to decrypt password ');
		    		  return;
		    		}
	    	    $scope.decryptedPWD = data.data; 
	    	    $scope.switchRole($scope.decryptedPWD.decrypted)
	    	})
    	};
    	
        var init = function() {
          	userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
          	if(userInfo == null || userInfo == undefined){
          		$location.path('/');
          	}
        	userInfo.primaryRole=userInfo.roleID;
            localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
        	$scope.loggedinUserInfo = userInfo;        	
        	// checkSecondayRole();
		};

		init();
		 
    };

    app.controller('appHeaderController', ['$rootScope','$http', '$scope','$location','localStorageService','constantService','navigationService','signInService','modalService','authorizationService', appHeaderController]);
   
	
});














