
'use strict';

define(['app'], function (app) {

    var filterService = function ($scope,$rootScope,$cookieStore,localStorageService,navigationService,NgTableParams) {
    	
    	
		 this.intFilter  = function() {
		    $scope.isFilterOff = false;
		    $scope.btnOff = false;
		    $scope.btnOn = true;
		    $scope.linkText="enable?";
		    $scope.btnFilterText = "Filtering is disabled, ";
		 }
	
		
	    this.filterOn  = function() {
  	    	$scope.linkText="disable?";
  	    	$scope.btnFilterText = "Filtering is enabled, ";
  	        $scope.isFilterOff = true;
  	        $scope.btnOff = true;
  	        $scope.btnOn = false;
  	    };
  	    
  	    this.filterOff = function() {
  	    	$scope.linkText="enable?";
  	    	$scope.btnFilterText = "Filtering is disabled, ";
  	    	$scope.isFilterOff = false;
  	    	$scope.btnOff = false;
    	    $scope.btnOn = true;
  	      };
  	      
      this.searchIcon=function(){
	    	function tog(v){return v?'addClass':'removeClass';} 
			  $(document).on('input', '.clearable', function(){
				$(this)[tog(this.value)]('x');
			  }).on('mousemove', '.x', function( e ){
				$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
			  }).on('touchstart click', '.onX', function( ev ){
				ev.preventDefault();
				$(this).removeClass('x onX').val('').change();
			  });
	    };
    };
    app.service('filterService', ['$rootScope', '$cookieStore','localStorageService','navigationService','NgTableParams', filterService]);

});
