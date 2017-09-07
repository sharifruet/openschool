'use strict';

define(['app'], function (app) {

    var menuFilter  = function () {

        return function (menuList, filterValue) {
            if (!filterValue) return menuList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < menuList.length; i++) {
                var menuobj = menuList[i];
              
                if (menuobj.uniqueCode != null && menuobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(menuobj);
                }else if (menuobj.description != null && menuobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(menuobj);
                }
            }
            return matches;
        };
    };

    app.filter('menuFilter', menuFilter);

});
