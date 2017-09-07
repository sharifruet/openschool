
'use strict';

define(['app'], function (app) {
    
    var configurationController = function ($scope, $location, $filter, $log, $modal,$routeParams, constantService, 
		localStorageService, confirmationService, messageService,navigationService,signInService) {
    
    	var userInfo, promis;
    	$scope.passwordChangeObj = { };
       	$scope.PageTitle= 'Password Change Form';
    	$scope.buttonText = ' Change Password';
    	var letter = /[a-zA-Z]/; 
	    var number = /[0-9]/;
	    
	    var date = new Date();
	    var key=0;
     	var mydate=moment(new Date()).format('YYYY-MMM-d HH:mm:ss').toString();
    	$scope.oldPasswordInSession;
    
		$scope.changePassword = function(passwordChangeObj){
	    		userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	    		if (!signInService.isBlank()) {
	         		return; 
	         	}
	    	    else if (!signInService.isNotSame()) {
	         		return; 
	         	}
	    		else if(!signInService.isSameValue()){
	    			return;
	    		}
    			var obj = 		
			 		{
					 operation 							: constantService.changeDatabaseConfiguration,
					 password							: userInfo.password,
					 loginId							: userInfo.loginId,
					 newPassword						: passwordChangeObj.newPassword,
					 oldPassword						: passwordChangeObj.oldPassword
					 };
    			
			 	promis = signInService.changeDatabaseConfiguration(obj);
	            promis.then(function (data) {
	            	if (!data.success) {
	            		messageService.showMessage(constantService.Danger, data.message);
	   	                return;
	                }
	            	messageService.showMessage(constantService.Success, data.message);
	             	localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
	            });   
		 };
		 
		 $scope.goHome = function(){
	    	 constantService.navigateToRespectiveDashboard();
	     };
		 
		 $scope.checkOldPassword = function(oldPassword)
			{
				if (oldPassword == '' || oldPassword == undefined) {
					$("#validaTionOldPassword").show();
					$("#validationInvalidOldPassword").hide();
				} else {
					$("#validaTionOldPassword").hide();
				}
			};
		 
		 $scope.checkNewPassword = function(newPassword)
			{
				if (newPassword == '' || newPassword == undefined) {
					$("#validaTionNewPassword").show();
					$("#validaTionNewPasswordLength").hide();
				} 
				else {
					$("#validaTionNewPassword").hide();
				}
			};
			
			var inputMixedValidate=function(newPassword){
				var valid=number.test(newPassword) && letter.test(newPassword);
				if(!valid){
					return false;
				}
				return true;
			}
			
			$scope.checkPasswordLength = function(newPassword){
				
				 if(newPassword.length<6){
						$("#validaTionNewPasswordLength").show();
						$("#validaTionNewPassword").hide();
						$("#validaTionAlphaNumaric").hide();
					}
				 else if(!inputMixedValidate(newPassword)){
						$("#validaTionAlphaNumaric").show();
						$("#validaTionNewPassword").hide();
						$("#validaTionNewPasswordLength").hide();
					}else {
						$("#validaTionNewPasswordLength").hide();
						$("#validaTionAlphaNumaric").hide();
					}
			};
			
			$scope.checkOldPwd = function(oldPassword){
				userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
				if(userInfo.password!==oldPassword){
					$("#validationInvalidOldPassword").show();
					$("#validaTionOldPassword").hide();
				}else {
					$("#validationInvalidOldPassword").hide();
				}
			};
			
			$scope.checkConfirmPassword = function(confirmPassword)
			{
				if (confirmPassword == '' || confirmPassword == undefined) {
					$("#validationConfirmPassword").show();
					$("#validationNewPwdAndConfirmPwd").hide();
				} else {
					$("#validationConfirmPassword").hide();
				}
			};
			
          var init = function () {
           	  userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
           /*	  for(var i=1;i<8;i++){
           		  console.log(i);
           	  }*/
          	/* var h=userInfo.passwordHistory;
           	 var p=JSON.parse(h);;
           	 console.log(p.length);*/
	    	};   
	    	
        init();
        
    };  
    app.register.controller('configurationController', ['$scope', '$location', '$filter', '$log', '$modal','$routeParams',
           'constantService', 'localStorageService', 'confirmationService', 'messageService','navigationService','signInService',
           configurationController]);

});


