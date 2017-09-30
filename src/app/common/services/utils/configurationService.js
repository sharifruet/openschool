
'use strict';

define(['app'], function (app) {

    var configurationService = function ($rootScope) {
    	
    	this.server = 'localhost';
        this.port = ':8080';
        
        // Local Host
        this.app = 'rest/';
        
        // Cloud Foundry
    	//this.app = '/rest/';
        this.loginCookieStoreKey = 'user.info.cookie.store.key';
        this.baseUrl = 'http://' + this.server + this.port + this.app;
    	this.wsBaseUrl = 'ws://' + this.server + this.port +'/openschool/';
    	this.loginMetaData = 'loginMetaData';
		this.dashboard = this.app + 'dashboard';
		this.login = this.app + 'security/useraccess';
		this.userRestUrl = this.app + 'user/post';
		this.roleRestUrl = this.app + 'role/post';
		this.featureRestUrl = this.app + 'feature/post';
		
		this.studentRestUrl = this.app + 'student/post';
		this.employeeRestUrl = this.app + 'employee/post';
		this.questionanswerRestUrl = this.app + 'questionanswer';
		this.mcqRestUrl = this.app + 'mcq';
		this.menuRestUrl = this.app + 'menu';
		this.articleRestUrl = this.app + 'article';
		
		this.itemRestUrl = this.app + 'item';
		
				
    };
    
    app.service('configurationService', ['$rootScope', configurationService]);

});


