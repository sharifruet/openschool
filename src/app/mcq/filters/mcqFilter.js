'use strict';

define(['app'], function (app) {

    var mcqFilter  = function () {

        return function (mcqList, filterValue) {
            if (!filterValue) return mcqList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < mcqList.length; i++) {
                var mcqobj = mcqList[i];
              
                if (mcqobj.uniqueCode != null && mcqobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(mcqobj);
                }else if (mcqobj.description != null && mcqobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(mcqobj);
                }
            }
            return matches;
        };
    };

    app.filter('mcqFilter', mcqFilter);

});
