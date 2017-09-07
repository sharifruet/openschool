'use strict';

define(['app'], function (app) {
    
	 var articleController = function ($rootScope, $scope, $log, $modal, $timeout, $route,$routeParams, _, localize, textAngularManager, messageService, constantService,
			 navigationService, localStorageService, configurationService, dashboardService, articleService, menuService) {
		 
		var userInfo, promis;		
		$scope.article = {};
		$scope.articleTypes = constantService.articleTypeList;
		
		$scope.parents = [];
		$scope.article.tags = [];
		
		
		$scope.resetfunction=function() {
			$scope.article = {};
		}

		//JS_CODE_FOR_CHILDREN_ADD//
		
		var processResponseDataBeforeView = function (article){			
					
					
					
		};
				
		var processInputDataBeforeSave = function (article){
			
		};
		
		$scope.saveArticle = function(article){
			if (articleService.isEmpty()) {
				return;
         	}
			
			if(article.title== undefined || article.title== '' ){
				localizedMsg = localize.getLocalizedString('please_fill_up_mandatory_field');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}

			//removing child componentId which was added UI rendering perspective
			processInputDataBeforeSave(article);
			
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			$scope.articleObj = article;
			$scope.articleObj.loginBean = userInfo;			
			if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				$scope.articleObj.operation = constantService.Save;
			}else{
				$scope.articleObj.operation = constantService.Update;
				$scope.articleObj.componentId = $routeParams.componentId;
			}
			promis = articleService.postObject($scope.articleObj);
			promis.then(function(data) {
				if (!data.success) {
					//TODO: need to localize the data.message. Now it is showing the server side exception
					messageService.showMessage(constantService.Danger,data.message);
					return;
				}
				
				var localizedSaveSuccessMsg = localize.getLocalizedString('article_save_successful');
				messageService.showMessage(constantService.Success, localizedSaveSuccessMsg);
				$scope.article= {};
			});
		};
		
		$scope.goBackInArticleListPage = function(){
			navigationService.menuNavigation('articles')
		};
		
		
		$scope.addTags = function(item){
			var found = false;
			angular.forEach($scope.article.tags, function(t){
				if(item.componentId == t.componentId){
					found = true;
				}
					
			});
			if(!found)
				$scope.article.tags.push(item);

		};
		
		
		
		var getArticleByID = function() {
			//TODO: need to fill up the userInfo from cookie store
			// userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
			userInfo = null;
			var Obj = {
			 operation : constantService.GetById,
			 loginBean : userInfo
		    };
			Obj.componentId = $routeParams.componentId;
		    promis =articleService.postObject(Obj);
		    promis.then(function(data) {
			if (!data.success) {
				var localizedMsg = localize.getLocalizedString('unable_to_load_article_information');
				messageService.showMessage(constantService.Danger, localizedMsg);
				return;
			}
			
			//handle the date related conversion if needed
			processResponseDataBeforeView(data.data);
			
			$scope.article = data.data;
			
		});
	 };
	 
	 $scope.deleteArticle=function(article){
		 	var localizedHeaderText = localize.getLocalizedString('delete') + ' ' + article.uniqueCode +' ?';
		 	var localizedBodyText = localize.getLocalizedString('are_you_sure_to_delete') + ' ' + localize.getLocalizedString('article') + ' ' + article.uniqueCode +' ?';
		 	var btnCancelText = localize.getLocalizedString('btn_cancel');
		 	var btnOkText = localize.getLocalizedString('btn_ok');
		 			 	
			var modalOptions = {
                 headerText: localizedHeaderText,
                 bodyText: localizedBodyText,
                 closeButtonText: btnCancelText,
                 actionButtonText: btnOkText
             };

             var modalDefaults = {
                 templateUrl: 'app/common/partials/confirmation.html'
             };
             modalService.showModal(modalDefaults, modalOptions).then(function () {	           	
				var articleObj={loginBean:userInfo,operation: constantService.Delete,componentId:article.componentId}			
				promis = articleService.postObject(articleObj);
				promis.then(function(data) {
					if (!data.success) {
						//TODO: need to localize the data.message. Now it is showing the server side exception
						messageService.showMessage(constantService.Danger,data.message);
						return;
					}
					
					var localizedDeleteSuccessMsg = localize.getLocalizedString('article_delete_successful');
					messageService.showMessage(constantService.Success, localizedDeleteSuccessMsg);
					$scope.article= {};
				});
         });
		};
		
	    var loadMenu = function() {
      	    var menuObj = {operation : constantService.GetAll, loginBean : userInfo }
			promis = menuService.postObject(menuObj);
            promis.then(function (data) {
	          	if (!data.success) {return;}
	          	$scope.menu = data.data;
	          	
	          	angular.forEach(data.data, function(value, key){
	                if(value.isEnd==0){
	                	$scope.parents[value.componentId] = value;
	                }
	             });
	          	
	          	
            });
							
	     };
	 
		var init = function () {
			loadMenu();
	 		if ($routeParams.componentId == undefined || $routeParams.componentId == null || $routeParams.componentId.length == 0) {
				return;
			}
	 		getArticleByID();
	 	};
		
	 	init();
	 	
	 };
	 
    app.register.controller('articleController', ['$rootScope', '$scope', '$log','$modal', '$timeout', '$route','$routeParams', '_', 'localize',
          'textAngularManager', 'messageService', 'constantService', 'navigationService', 
          'localStorageService','configurationService','dashboardService', 'articleService', 'menuService', articleController]);
   
	
});
