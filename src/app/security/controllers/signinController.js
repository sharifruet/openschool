
'use strict';

define(['app'], function (app) {
    
	 var signinController = function ($rootScope, $scope, _, $log, $timeout, $http, $cookieStore, signInService, 
		 navigationService, localStorageService, configurationService, constantService, authorizationService, 
		 messageService,modalService) {
		 
		 var promis;
		 
		 //$scope.user = { loginId : 'admin', password : 'admin' };
		 /*
		 $scope.login33=function(logObj){
			 var id = document.getElementById("loginId");
			 logObj.loginId = id.value;
			 var obj={};
			 obj.loginId = logObj.loginId;
			 obj.operation = constantService.GetLogonStatus;
			 promis = signInService.checkLoginStaus(obj);			
			 var modalOptions = {
	                    headerText: 'Dupliacte Session !',
	                    bodyText: 'Are you Sure to kill previous session ?',
	                    closeButtonText:'Cancel',
	                    actionButtonText:'OK'
	                };

             var modalDefaults = {
                 templateUrl: 'app/common/partials/confirmation.html'
             };
			 promis.then(function (data) {
				 if (data.val=="LoggedIn") {
		                modalService.showModal(modalDefaults, modalOptions).then(function () {
		                	updateLoginstatus(logObj);
			         });
				 }else {
					 $scope.signIn(logObj)
				}
			 });
			
				
			}
		 */
		 var updateLoginstatus=function(logObj){
			 var obj={};
			 obj.loginId=logObj.loginId;
			 obj.operation = constantService.UpdateLoginStatus;
			 promis = signInService.updateLoginStaus(obj);
			 promis.then(function (data) {
				 if (!data.success) {
					 return;
				 }
				 $scope.signIn(logObj) 
			 });
		 }

		 $scope.checkIfEnterKeyWasPressed = function ($event, login){
			 var keyCode = $event.which || $event.keyCode;
			 if (keyCode === 13) {
				 // Do that thing you finally wanted to do
				 $scope.login(login);
			 }
		 };
		 
		 $scope.login = function (login) {

			 if(!checkLoginForm(login))
			 {
			 	return;
			 } 
			/* if(!checkPasswordComplexity(login.password)){
				 messageService.showMessage(constantService.Danger,"Must have use Alphanumaric charecters ");
				 return;
			 }*/
			 
			 login.operation = constantService.userlogin;
			 promis = signInService.doSignIn(login);
			 promis.then(function (data) {
				 
				 if (!data.success) {
					 if(data.message == 'Invalid login ID')
						 {
						 	$("#validationinvalidloginid").show();
						 	return;
						 }
					 if(data.message == 'Invalid Password')
						 {
						 	$("#validationinvalidpassword").show();
						 	return;
						 }
					 if(data.message == 'your Account is Locked')
					 {
						messageService.showMessage(constantService.Danger,data.message);
					 	return;
					 }
					 if(data.message =='Expired')
					 {
						 messageService.showMessage(constantService.Danger,"Your Password have been expired");
					 	return;
					 }
					 if(data.data == 'invalid')
					 {
					 	$scope.ivdUsr = true;
					 	return;
					 }
					 return;
				 }
				
				 localStorageService.setValue(constantService.userInfoCookieStoreKey, data.data);				
				 
				 navigationService.menuNavigation("dashboard");
				
				    /* if(data.data.roleID == 'Employee'){
					 	 navigationService.menuNavigation("admindashboard");
					}else if (data.data.roleID == 'Maker') {
						 navigationService.menuNavigation("makerdashboard");
					}else if (data.data.roleID == 'Checker') {
						navigationService.menuNavigation("checkerdashboard");
					}else {
						navigationService.menuNavigation("dashboard");
					} */
				 
			 });
		};

		 $scope.clearCache = function () {
		 	authorizationService.signOut();
		 };
			
	/*	 $scope.signOut = function(){
	        	var userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	        	userInfo.operation = constantService.userlogout;
	        	promis = signInService.doSignOut(userInfo);
	            promis.then(function (data) {
	                localStorageService.setValue(constantService.userInfoCookieStoreKey, null);
	                $location.path('/');
	            });
	        };*/
		 
		 $scope.checkloginid = function(loginid)
			{
				if (loginid == '' || loginid == undefined) {
					$("#validationloginid").show();
					$("#validationinvalidloginid").hide();
					
				} else {
					$("#validationloginid").hide();
				}
		};
		 
		$scope.checkloginpwd = function(loginpwd)
			{
				if (loginpwd == '' || loginpwd == undefined) {
					$("#validationloginpwd").show();
					$("#validationinvalidpassword").hide();
					
				} 
				else 
				{
					$("#validationloginpwd").hide();
				}
			};
			
			
			
			$scope.divOn  = function() {
				$scope.isforgetPassword = true;	
				
			};
		    
		    $scope.cancelDiv  = function() {
		    	$("#validationemailid").hide();
		    	$scope.usermailinfo={};
		        $scope.isforgetPassword = false;
		        
		  };
		    
		  $scope.getUserInfoByEmailID = function(mObj){ 
			  	$scope.Info = '';
			    mObj.operation='GetByEmailID';
		    	promis = signInService.getUserInfoByEmailID(mObj);
		    	
		    	promis.then(function(data){
		    		
		    	if(!data.success)
		    	{	
		    		$scope.success = false;
		    		$scope.failled = true;
		    		return;
		    	}  
		    	$scope.usermailinfo.emailID = '';
		    	$scope.failled = false;
		    	$scope.success = true;
		    	$scope.Info = data.data; 
		    	$scope.sendMessageToMail($scope.Info);
		    	})
		    	
		    };
		   
			 var isEmailIDEmpty=function(Obj)
			  {
				 
				  $scope.usermailinfo=Obj;
				  if($scope.usermailinfo.emailID== null || $scope.usermailinfo.emailID== undefined){
		        		$("#validationemailid").show();
						 return true;
					 } 
				  return false;
				  
			  };
		      
		    $scope.sendMessageToMail=function(userObj)
		    { 
		      
			   
			   if($scope.Info.password!=null)
				{
				   $scope.Info.operation ='sendMailToResetPassword';
				   promis = signInService.sendPasswordResetMail($scope.Info);
		           promis.then(function (data) {
		        	   if (!data.success) 
		            	{
			    	    	$scope.Info ='';
		                    return;
		                }
		            	  
		            	  $scope.Info ='';
			     })
				}
			   
			   else if(!isEmailIDEmpty(userObj)&& ($scope.Info.password==null ||$scope.Info.password==undefined))
		       {
				  $scope.getUserInfoByEmailID(userObj);
		    	 
		       }	
		};
		  
		var checkLoginForm=function(login) {

			var b = new Boolean(true);
     	
     	if(login == null || login == undefined){
     		$("#validationloginid").show();
     		$("#validationloginpwd").show();
				 return;
			 }
     	
     	if (login.loginId === '' || login.loginId === undefined || login.loginId === null) {
     		
     		$("#validationloginid").show();
     		b = false;
     		
     	} else {
     		$("#validationloginid").hide();
     	}
     	
     	if (login.password === '' || login.password === undefined || login.password === null ) {
     		
     		$("#validationloginpwd").show();
     		b = false;
     	} else {
     		$("#validationloginpwd").hide();
     	}
     	
     	
     	return b;
     }; 
     
     $scope.loginIds = [];
     
     var getAllLoginId = function(){
		 var obj={};
		 obj.operation = constantService.getAllLoginId;
		 promis = signInService.getAllLoginId(obj);
		 promis.then(function (data) {
			 if (!data.success) {
				 return;
			 }
			 var loginIdArray = [];
			 angular.forEach(data.data, function(value, key){
			      var id = value.loginId;
			      loginIdArray.push(id);
			 });
			 
			 var input = document.getElementById("loginId");
			 var awesomplete = new Awesomplete(input);
			 awesomplete.list = loginIdArray;
		 });
	 }
     
 	var init = function () {
 		$(".right-side").addClass("strech");
        $('.left-side').addClass("collapse-left");
         $scope.clearCache();
         getAllLoginId();
 	};

 	init();
        
       
		 
 	};

 	
    app.register.controller('signinController', ['$rootScope', '$scope', '_','$log', '$timeout', '$http', '$cookieStore', 
        'signInService', 'navigationService', 'localStorageService', 'configurationService','constantService', 
        'authorizationService', 'messageService','modalService', signinController]);
   
	
});



