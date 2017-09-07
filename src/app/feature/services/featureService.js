
'use strict';

define(['app'], function (app) {

	var featureService = function ($resource, $q, configurationService) {
		
		var featureResource, delay ;
        
		featureResource = $resource(configurationService.featureRestUrl, {}, {
			postObject: 	 				        { method: 'POST'}
           
		
		});
				
		this.postObject = function (obj) {
            delay = $q.defer();
            featureResource.postObject(obj, function (data) {
                delay.resolve(data);
            }, function () {
            	//TODO: need to localize the this message
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.isEmpty = function(){
        	var b = new Boolean(true);
        	var uniqueCode = $('#uniqueCode').val();
        	if (uniqueCode === ''){
        		$("#validaTionUniqueCode").show();
           		b = false;
        	}else{
        		$("#validaTionUniqueCode").hide();
        	}        	
        };
    };
    
    app.service('featureService', ['$resource', '$q', 'configurationService', featureService]);

});

