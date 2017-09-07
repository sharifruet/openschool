
'use strict';

define(['app'], function (app) {

	var roleService = function ($resource, $q, configurationService) {
		
		var roleResource, delay ;
        
		roleResource = $resource(configurationService.roleRestUrl, {}, {
			postObject: 	 				        { method: 'POST'}
           
		
		});
				
		this.postObject = function (obj) {
            delay = $q.defer();
            roleResource.postObject(obj, function (data) {
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
    
    app.service('roleService', ['$resource', '$q', 'configurationService', roleService]);

});

