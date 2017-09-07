'use strict';

define(['app'], function (app) {

    var itemFilter  = function () {

        return function (itemList, filterValue) {
            if (!filterValue) return itemList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < itemList.length; i++) {
                var itemobj = itemList[i];
              
                if (itemobj.uniqueCode != null && itemobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(itemobj);
                }else if (itemobj.description != null && itemobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(itemobj);
                }
            }
            return matches;
        };
    };

    app.filter('itemFilter', itemFilter);

});
