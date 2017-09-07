
'use strict';

define(['app'], function (app) {

	var itemService = function ($resource, $q, configurationService) {
		
		var itemResource, delay ;
        
		itemResource = $resource(configurationService.itemRestUrl, {}, {
			postObject: 	 				        { method: 'POST'}
           
		
		});
				
		this.postObject = function (obj) {
            delay = $q.defer();
            itemResource.postObject(obj, function (data) {
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
    
    app.service('itemService', ['$resource', '$q', 'configurationService', itemService]);

});

