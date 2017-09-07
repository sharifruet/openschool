
'use strict';

define(['app'], function (app) {

	var questionanswerService = function ($resource, $q, configurationService) {
		
		var questionanswerResource, delay ;
        
		questionanswerResource = $resource(configurationService.questionanswerRestUrl, {}, {
			postObject: 	 				        { method: 'POST'}
           
		
		});
				
		this.postObject = function (obj) {
            delay = $q.defer();
            questionanswerResource.postObject(obj, function (data) {
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
    
    app.service('questionanswerService', ['$resource', '$q', 'configurationService', questionanswerService]);

});

