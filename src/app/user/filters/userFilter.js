'use strict';

define(['app'], function (app) {

    var userFilter  = function () {

        return function (userList, filterValue) {
            if (!filterValue) return userList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < userList.length; i++) {
                var userobj = userList[i];
              
                if (userobj.uniqueCode != null && userobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(userobj);
                }else if (userobj.firstName != null && userobj.firstName.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(userobj);
                }else if (userobj.lastName != null && userobj.lastName.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(userobj);
                }else if (userobj.email != null && userobj.email.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(userobj);
                }
            }
            return matches;
        };
    };

    app.filter('userFilter', userFilter);

});