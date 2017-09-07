'use strict';

define(['app'], function (app) {

    var roleFilter  = function () {

        return function (roleList, filterValue) {
            if (!filterValue) return roleList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < roleList.length; i++) {
                var roleobj = roleList[i];
              
                if (roleobj.uniqueCode != null && roleobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(roleobj);
                }else if (roleobj.description != null && roleobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(roleobj);
                }
            }
            return matches;
        };
    };

    app.filter('roleFilter', roleFilter);

});