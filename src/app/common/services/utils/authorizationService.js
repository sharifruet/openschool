
'use strict';

define(['app', 'common/services/utils/configurationService', 'common/services/utils/navigationService',
        'common/services/utils/languageService', 'common/services/utils/localStorageService'], function (app) {

    var authorizationService = function ($location, $rootScope, $route, $window, $http, $cookieStore,
    		configurationService, navigationService, languageService, localStorageService,constantService,signInService) {
    	var promis;
    	
    	this.setLoginInfo = function (data) {
            $rootScope.loginInfo = data;
        };

        this.getLoginInfo = function () {
            return $rootScope.loginInfo;
        };

        $rootScope.isLoggedIn = function () {
            return ($rootScope.loginInfo != null);
        };
            
       this.signOut = function () {
    	    delete $rootScope.user;
    		delete $http.defaults.headers.common['X-Auth-Token'];
    		$cookieStore.remove('user');
            localStorageService.setValue(constantService.userInfoCookieStoreKey, null);
            $location.path('/');
        };
        
        this.authorizeLeftMenu = function (leftMenuId) {
            
    	    var userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
           	var menuJson = JSON.parse(userInfo.menuJSON);  
        	
            for (var topMenuIndex = 0; topMenuIndex < menuJson.length; topMenuIndex++) {
                var leftMenuList = menuJson[topMenuIndex].child;
                if(leftMenuList.length > 0){
                	for (var leftMenuIndex = 0; leftMenuIndex < leftMenuList.length; leftMenuIndex++) {
                		if (leftMenuId == leftMenuList[leftMenuIndex].url) {
                			return true;
                		}
                	}
                }else{
                	if(menuJson[topMenuIndex].id == leftMenuId){
                		return true;
                	}
                }
            }
          
            return false;
        };
        
        this.signIn = function (data) {
        	this.setLoginInfo(data);
        }
        
        this.setAccessPageInfo = function (data) {
            $rootScope.accessPageInfo = data;
        };

        this.getAccessPageInfo = function () {
            return $rootScope.accessPageInfo;
        };
        this.checkAccess=function(){
        	var userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
        	var obj={};
        	 obj.sessionId=userInfo.sessionId;
        	 obj.loginId=userInfo.loginId;
			 obj.operation = constantService.CheckUserSession;
			 promis = signInService.CheckUserSession(obj);
			 promis.then(function (data) {
				 if (!data.success) {
					 delete $rootScope.user;
			    		delete $http.defaults.headers.common['X-Auth-Token'];
			    		$cookieStore.remove('user');
			            localStorageService.setValue(constantService.userInfoCookieStoreKey, null);
			            $location.path('/');
					 return;
				 }
				
			 });
        }
    	
    };
    
    app.service('authorizationService', ['$location', '$rootScope', '$route', '$window', '$http', '$cookieStore', 
          'configurationService', 'navigationService', 'languageService', 'localStorageService','constantService','signInService', authorizationService]);

});
