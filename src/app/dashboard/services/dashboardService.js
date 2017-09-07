
'use strict';

define(['app'], function (app) {

	var dashboardService = function ($rootScope, $resource, $q, $cookieStore, constantService, configurationService) {
		
		var dashboardPartnerDataResource, delay, getDashboardPartnerData;
	    
		dashboardPartnerDataResource = $resource(configurationService.dashboard+'/getdashboard', {}, {
			getDashboardPartnerData: { method: 'GET' }
		});
	    
		
		this.getDashboardPartnerData = function () {
		        delay = $q.defer();
		        dashboardPartnerDataResource.getDashboardPartnerData(function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		    });
		    return delay.promise;
		};
		
	
    };
    
    app.service('dashboardService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 
           'configurationService', dashboardService]);

});

