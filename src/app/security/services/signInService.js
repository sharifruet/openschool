
'use strict';

define(['app', 'common/services/utils/configurationService'], function (app) {

    var signInService = function ($resource, $q, configurationService,localStorageService,constantService,messageService) {
    	
    	var signInResource, delay ,userInfo;
    	
        signInResource = $resource(configurationService.login, {}, {
        	
            signin						: 	{ method : 'POST'},
            signout						:   { method : 'POST'},
            doChangePassword 			:   { method : 'POST'},
            sendPasswordResetMail 		:   { method : 'POST'},
            getUserInfoByEmailID 		:   { method : 'POST'},
            getAllLogin 				:   { method : 'POST'},
            getAllLoginForEmployee 		:   { method : 'POST'},
            switchRole 					:   { method : 'POST'},
            encryptPassword				:   { method : 'POST'},
            getAllItems					:	{ method : 'POST'},
            getAllReviewers				:	{ method : 'POST'},
            getDecryptedPassword		:	{ method : 'POST'},
            changeDatabaseConfiguration	:	{ method : 'POST'},
            checkLoginStaus				:	{ method : 'POST'},
            updateLoginStaus			:	{ method : 'POST'},
            CheckUserSession			:	{ method : 'POST'},
            getAllLoginId				:	{ method : 'POST'}
        });
      
        this.doSignIn = function (obj) {
        	delay = $q.defer();
            signInResource.signin(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.doSignOut = function (obj) {
            delay = $q.defer();
            signInResource.signout(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.doChangePassword = function(obj){
        	 delay = $q.defer();
        	 signInResource.doChangePassword(obj, function (data) {
        		 delay.resolve(data);
             }, function () {
                 delay.reject('Unable to fetch..');
             });
             return delay.promise;
        };
        
        this.changeDatabaseConfiguration = function(obj){
       	 delay = $q.defer();
       	 signInResource.changeDatabaseConfiguration(obj, function (data) {
       		 delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
       };
              
         this.isBlank=function() {
        	
        	var b = new Boolean(true);
        	
        	var oldPwd = $('#txtOnldPassword').val();
        	
        	if (oldPwd === '') {
        		$("#validaTionOldPassword").show();
        		$("#validationInvalidOldPassword").hide();
        		b = false;
        		
        	} else {
        		$("#validaTionOldPassword").hide();
        	}
        	var newPwd = $('#txtNewPassword').val();
        	
        	if (newPwd === '') {
        		$("#validaTionNewPassword").show();
        		$("#validaTionNewPasswordLength").hide();
        		b = false;
        	} else {
        		$("#validaTionNewPassword").hide();
        	}
        	
        	var confrimPwd = $('#txtConfirmPassword').val();
        	
        	if (confrimPwd === '') {
        		$("#validationConfirmPassword").show();
        		$("#validationNewPwdAndConfirmPwd").hide();
        		b = false;
        	} else {
        		$("#validationConfirmPassword").hide();
        	}
        	return b;
        } 
         
         this.isNotSame =function(){
        	 var b = new Boolean(true);
        	
        	 	var newPwd =  $('#txtNewPassword').val();
        	    var conPwd =  $('#txtConfirmPassword').val();
        	 
        	 if (newPwd !== conPwd) {
         		$("#validationNewPwdAndConfirmPwd").show();
         		$("#validationConfirmPassword").hide();
         		b = false;
 		    }
        	 else {
         		$("#validationNewPwdAndConfirmPwd").hide();
         	}
        	 return b;
         }
       
			 this.checkOldPwd =function(){
	        	 var b = new Boolean(true);
	        	 userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	        	 var oldPwd = $('#txtOnldPassword').val();
	        	 
	        	 if (userInfo.password !== oldPwd) {
	         		$("#validationInvalidOldPassword").show();
	         		$("#validaTionOldPassword").hide();
	         		b = false;
	 		    }
	        	 else {
	         		$("#validationInvalidOldPassword").hide();
	         	}
	        	 return b;
	         }
        this.isSameValue = function(){
        	
        	var newPwd =  $('#txtNewPassword').val();
        	var oldPwd =  $('#txtOnldPassword').val();
        	if(oldPwd==newPwd){
        		messageService.showMessage(constantService.Danger, 'You can not use Old Password as New Password ');
        		return false;
        	}
        	
        	return true;
        	
        }
        
        
        this.sendPasswordResetMail = function(obj)
        {
        	delay = $q.defer();
            signInResource.sendPasswordResetMail(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        	
        };
        
        this.getUserInfoByEmailID = function(obj)
        {	
        	delay = $q.defer();
            signInResource.getUserInfoByEmailID(obj, function (data) {
            	 delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        	
        };
        
       this.getAllLogin = function (obj) {
        	
            delay = $q.defer();
            signInResource.getAllLogin(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.getAllLoginForEmployee = function (obj) {
        	
            delay = $q.defer();
            signInResource.getAllLoginForEmployee(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
       
        this.switchRole = function(obj){
       	 delay = $q.defer();
       	 signInResource.switchRole(obj, function (data) {
       		 delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
       };
       
       this.encryptPassword = function(obj){
         	 delay = $q.defer();
         	 signInResource.encryptPassword(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
         this.getAllItems = function(obj){
        	 delay = $q.defer();
         	 signInResource.getAllItems(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
         this.getAllReviewers = function(obj){
        	 delay = $q.defer();
         	 signInResource.getAllReviewers(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
         this.getDecryptedPassword = function(obj){
        	 delay = $q.defer();
         	 signInResource.getDecryptedPassword(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
         this.checkLoginStaus = function(obj){
        	 delay = $q.defer();
         	 signInResource.checkLoginStaus(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
         this.updateLoginStaus = function(obj){
        	 delay = $q.defer();
         	 signInResource.updateLoginStaus(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         this.CheckUserSession = function(obj){
        	 delay = $q.defer();
         	 signInResource.CheckUserSession(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
         this.getAllLoginId = function(obj){
        	 delay = $q.defer();
         	 signInResource.getAllLoginId(obj, function (data) {
         		 delay.resolve(data);
              }, function () {
                  delay.reject('Unable to fetch..');
              });
              return delay.promise;
         };
         
     
    };
    
    app.service('signInService', ['$resource', '$q', 'configurationService','localStorageService','constantService','messageService', signInService]);

});







