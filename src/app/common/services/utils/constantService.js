
'use strict';

define(['app'], function (app) {

    var constantService = function ($rootScope, $cookieStore,localStorageService,navigationService) {
    	
        this.getAppLayout = function () {
            var layout = {
                header: { location: 'app/common/views/layout/app/Header.html', isVisible: true },
                leftPanel: { location: 'app/common/views/layout/app/LeftPanel.html', isVisible: true},
                footer: { location: 'app/common/views/layout/app/Footer.html', isVisible: true },
            };
            return layout;
        };

        this.getWebLayout = function () {
            var layout = {
                header: { location: 'app/common/views/layout/web/Header.html', isVisible: false },
                leftPanel: { location: 'app/common/views/layout/web/LeftPanel.html', isVisible: false },
                footer: { location: 'app/common/views/layout/web/Footer.html', isVisible: false },
            };
            return layout;
        };
        
        this.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        this.userInfoCookieStoreKey = 'user.info.cookie.store.key';
        this.systemInfoCookieStoreKey = 'system.info.cookie.store.key';
        
        this.AlertMessage = 'AlertMessage';
        
        this.userlogin = 'Login';
        this.userlogout = 'Logout';
        this.GetLogonStatus='GetLogonStatus';
        this.UpdateLoginStatus='UpdateLoginStatus';
        this.CheckUserSession='CheckUserSession';
               
    	
        this.Unlocked = 1;
        this.Locked =0;
        this.StateChange = 'stateChange';
        
        this.StatusYes = 'Yes';
        this.StatusNo = 'No';

        
        this.GetAll ='GetAll';
        this.Save = 'Save';
        this.RoleAssign = 'RoleAssign';
        this.GetUserRolesByID = 'GetUserRolesByID';
        this.Update = 'Update';
        this.Delete = 'Delete';
        this.GetByOId = 'GetByOId';
        this.GetById = 'GetById';
        this.GetByFilter = 'GetByFilter';
        this.getAllLoginId = 'getAllLoginId';
        this.GetRoleFeaturesByID = 'GetRoleFeaturesByID';
        this.FeatureAssign = 'FeatureAssign';
        
        
        this.fileSourcePath='\\192.168.0.27\cbrm';
        this.fileDestinationPath='D:\CBRM';
        this.copyDataFile='copyDataFile';
        
      
        
        this.GetOldPassword ="GetOldPassword";
        this.ChangePassword ="ChangePassword";
        this.changeDatabaseConfiguration = 'changeDatabaseConfiguration';
        this.GetDecryptedPWD = 'GetDecryptedPWD';
        
      
        this.Danger = 'danger';
        this.Success = 'success';
        this.Info = 'info';
        this.Warning = 'warning';
        this.Row = "Item Number";
        this.GetFileredItem ='getFileredItem';
        
        this.monthlist = [
	        	           {
	        	        	   "monthId" : "01", 
	        	        	   "monthName" : "January"
		        		   },
	        	           {
		        			   "monthId" : "02", 
	        	        	   "monthName" : "February" 
	    				   },
	        	           {
	    					   "monthId" : "03", 
	        	        	   "monthName" : "March"
						   },
	        	           {
	    					   "monthId" : "04", 
	        	        	   "monthName" : "April"
						   },
						   {
	    					   "monthId" : "05", 
	        	        	   "monthName" : "May"
						   },
						   {
	    					   "monthId" : "06", 
	        	        	   "monthName" : "June"
						   },
						   {
	    					   "monthId" : "07", 
	        	        	   "monthName" : "July"
						   },
						   {
	    					   "monthId" : "08", 
	        	        	   "monthName" : "August"
						   },
						   {
	    					   "monthId" : "09", 
	        	        	   "monthName" : "September"
						   },
						   {
	    					   "monthId" : "10", 
	        	        	   "monthName" : "October"
						   },
						   {
	    					   "monthId" : "11", 
	        	        	   "monthName" : "November"
						   },
						   {
	    					   "monthId" : "12", 
	        	        	   "monthName" : "December"
						   }
	    				   
       	        ];
        
        this.listOfMonths = [{Number:1,  Name:"January"},
		                     {Number:2,  Name:"February"},
		 					 {Number:3,  Name:"March"},
							 {Number:4,  Name:"April"},
							 {Number:5,  Name:"May"},
							 {Number:6,  Name:"June"},
							 {Number:7,  Name:"July"},
							 {Number:8,  Name:"August"},
							 {Number:9,  Name:"September"},
							 {Number:10,  Name:"October"},
							 {Number:11,  Name:"November"},
							 {Number:12,  Name:"December"}
					];
        
        this.getYearList=function(){
			var yearList = [];
			var year = 0;
			var startYear = new Date().getFullYear() - 3;
			for(var i=0; i<5; i++){
				var yearObj = {};
				if(yearList.length == 0){
					year = startYear;
				}
				yearObj['year'] = year;
				yearList.push(yearObj);
				year = year + 1;
			}
			
			return yearList;
		};
		
		this.getSelectedMonthYear=function(){
			var yearMonthObj = {};
			var monthNo = moment(new Date()).format("MM") -1;
			var currentYear = new Date().getFullYear();
			if(monthNo <= 0){
				monthNo = 12;
				currentYear = currentYear - 1;
			}
			yearMonthObj['year'] = currentYear;
			if(monthNo > 9){
				yearMonthObj['monthId'] = monthNo;
			}else{
				yearMonthObj['monthId'] = '0' + monthNo;
			}
			yearMonthObj['month'] = monthNo;
			
			return yearMonthObj;
		};
        
		this.articleTypeList =["NEWS", "BLOG", "OTHERS"];

       this.navigateToRespectiveDashboard = function(){
       	var userInfo= localStorageService.getValue(this.userInfoCookieStoreKey);
	    	if(userInfo.secondaryRole=="Admin"){
			  navigationService.menuNavigation("admindashboard");
			}else if(userInfo.secondaryRole=="Employee"){
			  navigationService.menuNavigation("businessdashboard");
			}else if(userInfo.secondaryRole=="Checker"){
			  navigationService.menuNavigation("checkerdashboard");
			}else if(userInfo.secondaryRole=="Maker"){
			  navigationService.menuNavigation("makerdashboard");
			}
    	
       };
        
        this.getPageItemText = function(pageDataBegin, pageDataEnd, pageDataTotal, recordTypeText){
        	var pageItemText = "";
			
				pageItemText = "Showing "+pageDataBegin+
								" to "+pageDataEnd+
								" of "+pageDataTotal+
								" total "+recordTypeText+".";
			return pageItemText;       	
        };
        
       
    };
    
    app.service('constantService', ['$rootScope', '$cookieStore','localStorageService','navigationService', constantService]);

});