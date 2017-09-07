
require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
     	'common/animations/listAnimations',
        'app',
        'common/directives/wcUnique',
        'common/directives/wcOverlay',
        'common/directives/ngEnter',
        'common/directives/partnerSwitch',
        'common/directives/decimalMask',
        'common/directives/highChart',
        'common/directives/dateRange',
        'common/directives/chosen',
        'common/directives/bootstrapDatepicker',
        'common/directives/onlyDigits',
        'common/directives/autoComplete',
        'common/services/utils/routeResolver',
        'common/services/utils/constantService',
        'common/services/utils/configurationService',
        'common/services/utils/localStorageService',
        'common/services/utils/navigationService',
        'common/services/utils/authorizationService',
        'common/services/utils/languageService',
        'common/services/utils/menuService',
        'common/services/utils/confirmationService',
        'common/services/utils/modalService',
        'common/services/utils/messageService',
        'common/services/utils/loadService',
        'common/services/utils/filterService',
        'common/services/wsClientService',
        'security/services/signInService',        
        'dashboard/services/dashboardService',
        'common/filters/partnerFilter',        
        'common/filters/startFromFilter',       
        'common/controllers/util/appHeaderController',
        'common/controllers/util/appLeftMenuController',       
        'common/controllers/util/messageController',
		
		'questionanswer/services/questionanswerService',
        'questionanswer/filters/questionanswerFilter',


        'user/services/userService',
        'user/filters/userFilter',
        'role/services/roleService',
        'role/filters/roleFilter',
        
        'feature/services/featureService',
        'feature/filters/featureFilter',
		
		'article/services/articleService',
        'article/filters/articleFilter',
        
        'menu/services/menuService',
        'menu/filters/menuFilter',
        
        'mcq/services/mcqService',
        'mcq/filters/mcqFilter',
        
        'item/services/itemService',
        'item/filters/itemFilter'
        
    ],
function () {
    angular.bootstrap(document, ['myApp']);
});

