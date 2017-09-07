
'use strict';

define(['app', 'common/services/utils/modalService'], function (app) {

    var modalService = function ($modal) {
    	
    	var modalDefaults = {
    	        backdrop: true,
    	        keyboard: true,
    	        modalFade: true,
    	        templateUrl: 'app/common/partials/modal.html'
    	    };

    	    var modalOptions = {
    	        closeButtonText: 'Close',
    	        actionButtonText: 'OK',
    	        headerText: 'Proceed?',
    	        bodyText: 'Perform this action?'
    	    };

    	    this.showModal = function (customModalDefaults, customModalOptions) {
    	        if (!customModalDefaults) customModalDefaults = {};
    	        customModalDefaults.backdrop = 'static';
    	        return this.show(customModalDefaults, customModalOptions);
    	    };
    	    

    	    this.show = function (customModalDefaults, customModalOptions) {
    	        //Create temp objects to work with since we're in a singleton service
    	        var tempModalDefaults = {};
    	        var tempModalOptions = {};

    	        //Map angular-ui modal custom defaults to modal defaults defined in service
    	        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

    	        //Map modal.html $scope custom properties to defaults defined in service
    	        angular.extend(tempModalOptions, modalOptions, customModalOptions);

    	        if (!tempModalDefaults.controller) {
    	            tempModalDefaults.controller = function ($scope, $modalInstance) {
    	                $scope.modalOptions = tempModalOptions;
    	                $scope.modalOptions.ok = function (result) {
    	                    $modalInstance.close(result);
    	                };
    	                $scope.modalOptions.close = function (result) {
    	                    $modalInstance.dismiss('cancel');
    	                };
    	                $scope.modalOptions.allCheckUncheck = function (result,bool) {
    	                	angular.forEach(result, function(cList,cIndx){
    	                		if(!bool){
    	                			cList.selected = false;
    	                		}else{
    	                			cList.selected = true;
    	                		}
    	                		angular.forEach(cList.domains, function(dList,dIndx){
    	                			if(!bool){
    	                				dList.selected = false;
        	                		}else{
        	                			dList.selected = true;
        	                		}
    	                			angular.forEach(dList.areas, function(aList,aIndx){
    	                				if(!bool){
    	                					aList.selected = false;
            	                		}else{
            	                			aList.selected = true;
            	                		}
    	    	                	});
        	                	});
    	                	});
    	                };
    	                $scope.modalOptions.checkCategory = function (result, id) {
    	                	angular.forEach(result, function(cList,cIndx){
    	                		if(cList.oid == id){
	    	                		if(!cList.selected){
	    	                			cList.selected = false;
	    	                			angular.forEach(cList.domains, function(dList, dIndx){
	    	                				dList.selected = false;
	    	                				angular.forEach(dList.areas, function(aList, aIndx){
		    	                				aList.selected = false;
	    	                			});
    	                			});
	    	                		}else{
	    	                			cList.selected = true;
	    	                			angular.forEach(cList.domains, function(dList, dIndx){
		    	                				dList.selected = true;
		    	                				angular.forEach(dList.areas, function(aList, aIndx){
			    	                				aList.selected = true;
		    	                			});
	    	                			});
	    	                		}
    	                		}
			                });
    	                };
    	                $scope.modalOptions.checkDomain = function (result,id) {
    	                	angular.forEach(result, function(cList,cIndx){
	    	                	angular.forEach(cList.domains, function(dList, dIndx){
	    	                		if(dList.oid == id){
			                			if(!dList.selected){
			                				dList.selected = false;
			                				angular.forEach(dList.areas, function(aList, aIndx){
			    	                			aList.selected = false;
			                				});
		    	                		}else{
		    	                			dList.selected = true;
		    	                			if(!cList.selected){
		    	                				cList.selected = true;
		    	                			}
			                				angular.forEach(dList.areas, function(aList, aIndx){
			    	                			aList.selected = true;
			                				});
		    	                		}
	    	                		}
	    	                	});
	                		});
    	                };
    	                $scope.modalOptions.checkArea = function (result,id) {
    	                	angular.forEach(result, function(cList,cIndx){
    	                		angular.forEach(cList.domains, function(dList, dIndx){
		    	                	angular.forEach(dList.areas, function(aList, aIndx){
		    	                		if(aList.oid == id){
				                			if(!aList.selected){
				                				aList.selected = false;
			    	                		}else{
			    	                			aList.selected = true;
			    	                			if(!cList.selected){
			    	                				cList.selected = true;
			    	                			}
			    	                			if(!dList.selected){
			    	                				dList.selected = true;
			    	                			}
			    	                		}
		    	                		}
			                		});
    	                		});
    	                	});
    	                };
    	            }
    	        }

    	        return $modal.open(tempModalDefaults).result;
    	    };
    	    
    	    this.showReviewModal = function (customModalDefaults, customModalOptions) {
    	        //Create temp objects to work with since we're in a singleton service
    	        var tempModalDefaults = {};
    	        var tempModalOptions = {};

    	        //Map angular-ui modal custom defaults to modal defaults defined in service
    	        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

    	        //Map modal.html $scope custom properties to defaults defined in service
    	        angular.extend(tempModalOptions, modalOptions, customModalOptions);

    	        if (!tempModalDefaults.controller) {
    	            tempModalDefaults.controller = function ($scope, $modalInstance) {
    	                $scope.modalOptions = tempModalOptions;
    	                $scope.modalOptions.ok = function (result) {
    	                	result.result = 'save';
    	                    $modalInstance.close(result);
    	                };
    	                $scope.modalOptions.submit = function (result) {
    	                	result.result = 'submit';
    	                    $modalInstance.close(result);
    	                };
    	                $scope.modalOptions.create = function (result) {
    	                	result.result = 'create';
    	                    $modalInstance.close(result);
    	                };
    	                $scope.modalOptions.close = function (result) {
    	                    $modalInstance.dismiss('cancel');
    	                };
    	                $scope.modalOptions.login = function (result) {
    	                    $modalInstance.dismiss('cancel');
    	                };
    	            }
    	        }

    	        return $modal.open(tempModalDefaults).result;
    	    };
        
    };
    
    app.service('modalService', ['$modal',modalService]);

});