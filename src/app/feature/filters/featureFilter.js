'use strict';

define(['app'], function (app) {

    var featureFilter  = function () {

        return function (featureList, filterValue) {
            if (!filterValue) return featureList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < featureList.length; i++) {
                var featureobj = featureList[i];
              
                if (featureobj.uniqueCode != null && featureobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(featureobj);
                }else if (featureobj.description != null && featureobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(featureobj);
                }
            }
            return matches;
        };
    };

    app.filter('featureFilter', featureFilter);

});