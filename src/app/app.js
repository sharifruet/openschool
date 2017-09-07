
'use strict';

define(['common/services/utils/routeResolver'], function () {

	var app = angular.module('myApp', ['localization', 'ngRoute', 'ngAnimate', 'ngResource', 
              'ngCookies', 'ui.bootstrap', 'ui', 'highcharts-ng', 'ngTable', 'routeResolverServices', 'underscore',
              'wc.Directives', 'wc.Animations','ngProgress', 'textAngular']);

	app.run(['$rootScope', '$route', '$http', '$location', '$cookieStore', 'constantService','signInService','loadService','localStorageService','localize','$document','$timeout','authorizationService',
	         function ($rootScope, $route, $http, $location, $cookieStore, constantService,signInService,loadService,localStorageService,localize,$document,$timeout,authorizationService) {
		
		// for auto log out after session timeout
		    var promis,userInfo;
			var min=1000*60;
		    var TimeOutTimerValue =min*20;
		    var TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
		    var bodyElement = angular.element($document);

		    angular.forEach(['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'], 
		    function(EventName) {
		         bodyElement.bind(EventName, function (e) { TimeOut_Resetter(e) });  
		    });

		    function LogoutByTimer(){
		    	var obj={};
		        userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
		        obj=userInfo;
		        obj.operation = constantService.userlogout;
	        	promis = signInService.doSignOut(obj);
	            promis.then(function (data) {
	            	console.log(data);
	            	if (!data.success) {
						return;
					}
	                localStorageService.setValue(constantService.userInfoCookieStoreKey, null);
	                loadService.hideDialog();
	                $location.path('/');
	            });
		    }

		    function TimeOut_Resetter(e){
		        $timeout.cancel(TimeOut_Thread);
		        TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
		    }
		 //end   
		localize.setLanguage('en-US');
		$rootScope.isMobile = false;
		$rootScope.messagePageLocation = 'app/common/partials/message.html';
		
		$rootScope.goHome=function(){
		      constantService.navigateToRespectiveDashboard();
	    }
		
		$rootScope.$on("$routeChangeStart", function (oldPath, newPath) {
			
		   userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
	        if(userInfo === undefined || userInfo === null){
	            $rootScope.layout = constantService.getWebLayout();
	            authorizationService.signOut();
	            $location.path('/');
	            return;
	        }
			$rootScope.pageTitle = newPath.$$route.title;
	        if (newPath.$$route == undefined || newPath.$$route.isWeb) {
	            $rootScope.layout = constantService.getWebLayout();
	            return;
	        }
	        else
	        {   
	        	authorizationService.checkAccess();
	        	$location.replace();
	        	$rootScope.layout = constantService.getAppLayout();	        	
	        	$rootScope.currLeftMenuId = newPath.$$route.leftMenuId;
	        	$rootScope.currTopMenuId = newPath.$$route.menuId;
	        }
	     
	       if(!authorizationService.authorizeLeftMenu(newPath.$$route.leftMenuID)){
	        	authorizationService.signOut();
	        	return;
	        }
	       
	    });
    
	}]); 

	app.config(['$routeProvider','routeResolverProvider','$controllerProvider', '$compileProvider', 
	            '$filterProvider', '$provide', '$locationProvider', '$httpProvider',  
	         function ($routeProvider,routeResolverProvider, $controllerProvider, $compileProvider, 
	        	$filterProvider, $provide, $locationProvider, $httpProvider) {
    
		app.register =
	    {
	        controller: $controllerProvider.register,
	        //directive: $compileProvider.directive,
	        filter: $filterProvider.register,
	        //factory: $provide.factory,
	        //service: $provide.service
	    };
		
		// Provider-based service.
        app.service = function( name, constructor ) {
            $provide.service( name, constructor );
            return( this );
        };
        
        // Provider-based factory.
        app.factory = function( name, factory ) {
            $provide.factory( name, factory );
            return( this );
        };
        
        // Provider-based directive.
        app.directive = function( name, factory ) {
            $compileProvider.directive( name, factory );
            return( this );
        };
     
		var route = routeResolverProvider.route;
		$routeProvider

	  //url                                //page and controller name prefix,       dir path, 			title, 				       leftMenuId		               isWeb
		.when('/',                             route.resolve('signin',            'security/',          'Signin',             		 '',                           true))
		.when('/changePassword/:employeeID',   route.resolve('changePassword', 	  'security/', 		    'Password Change',       'dashboard',	               	   false))
		.when('/admin',                        route.resolve('admin',    	      'admin/',     	    'Administration',        'admin',                 	       false))
        .when('/dashboard',                    route.resolve('dashboard',    	  'dashboard/',     	'Dashboard',             'dashboard',                 	   false))

        .when('/users', 			  	   	   route.resolve('users', 	  	      'user/',     	        'Users',		 	 	 'users',		           	       false))
        .when('/user', 	   				       route.resolve('user', 	  	      'user/',   		    'User',		 	 	     'users',		           	       false))
        .when('/users/:componentId', 	       route.resolve('user', 	  	      'user/',   		    'User',		 	 	     'users',		           	       false))        
        .when('/roles', 			  	   	   route.resolve('roles', 	  	      'role/',     	        'Roles',		 	 	 'roles',		           	       false))
        .when('/role', 	   				       route.resolve('role', 	  	      'role/',   		    'Role',		 	 	     'roles',		           	       false))
        .when('/roles/:componentId', 	       route.resolve('role', 	  	      'role/',   		    'Role',		 	 	     'roles',		           	       false))
        .when('/userroleassign', 			   route.resolve('userroleassign', 	  'user/',     	        'User Role Assignment',	 'userroleassign',		           false))
        
        .when('/features', 			  	   	   route.resolve('features', 	  	  'feature/',     	    'Features',		 	 	 'features',		           	   false))
        .when('/feature', 	   				   route.resolve('feature', 	  	  'feature/',   		'Feature',		 	 	 'features',		           	   false))
        .when('/features/:componentId', 	   route.resolve('feature', 	  	  'feature/',   		'Feature',		 	 	 'features',		           	   false))
        .when('/rolefeatureassign', 		   route.resolve('rolefeatureassign', 'role/',     	        'Role Feature Assignment','rolefeatureassign',		       false))
        .when('/questionanswers', 			 	route.resolve('questionanswers', 	'questionanswer/',  	'Questionanswers',	'questionanswers',		           	       false))
        .when('/questionanswer', 	   			route.resolve('questionanswer', 	'questionanswer/', 		'Questionanswer',	'questionanswers',		           	       false))
        .when('/questionanswers/:componentId',	route.resolve('questionanswer',		'questionanswer/', 		'Questionanswer',	'questionanswers',		           	       false))
 
        .when('/mcqs', 			  	   	   		route.resolve('mcqs', 	  	      	'mcq/',     	        'Mcqs',		 	 	 'mcqs',		           	       false))
        .when('/mcq', 	   				  	 	route.resolve('mcq', 	  	        'mcq/',   		        'Mcq',		 	 	 'mcqs',		           	       false))
        .when('/mcqs/:componentId', 	       	route.resolve('mcq', 	  	        'mcq/',   		        'Mcq',		 	 	 'mcqs',		           	       false))
        
        .when('/menus', 			  	   		route.resolve('menus', 	  	      	'menu/',     	        'Menus',		 	'menus',		           	       false))
        .when('/menu', 	   				   		route.resolve('menu', 	  	        'menu/',   		        'Menu',		 	 	'menus',		           	       false))
        .when('/menus/:componentId', 	       	route.resolve('menu', 	  	        'menu/',   		        'Menu',		 	 	'menus',    					 	false))		           	    
		
		.when('/articles', 			  	   		route.resolve('articles', 	  	    'article/',     	    'Articles',			'articles',		           	       false))
        .when('/article', 	   					route.resolve('article', 	  	    'article/',   		  	'Article',		 	'articles',		           	       false))
        .when('/articles/:componentId', 		route.resolve('article', 	  	    'article/',   		   	'Article',		 	'articles',		           	       false))
 

        .when('/items', 			  	   	   route.resolve('items', 	  	      'item/',     	        'Items',		 	 	 'items',		           	       false))
        .when('/item', 	   				   route.resolve('item', 	  	          'item/',   		        'Item',		 	 	 'items',		           	       false))
        .when('/items/:componentId', 	       route.resolve('item', 	  	          'item/',   		        'Item',		 	 	 'items',		           	       false))
 

    
    
		
		
        .otherwise({ redirectTo: '/' });
	
	}]);

	return app;

});



    
    
    
    
    