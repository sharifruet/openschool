'use strict';

define(['app'], function (app) {

    var articleFilter  = function () {

        return function (articleList, filterValue) {
            if (!filterValue) return articleList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < articleList.length; i++) {
                var articleobj = articleList[i];
              
                if (articleobj.uniqueCode != null && articleobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(articleobj);
                }else if (articleobj.description != null && articleobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(articleobj);
                }
            }
            return matches;
        };
    };

    app.filter('articleFilter', articleFilter);

});
