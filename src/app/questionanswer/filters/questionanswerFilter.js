'use strict';

define(['app'], function (app) {

    var questionanswerFilter  = function () {

        return function (questionanswerList, filterValue) {
            if (!filterValue) return questionanswerList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < questionanswerList.length; i++) {
                var questionanswerobj = questionanswerList[i];
              
                if (questionanswerobj.uniqueCode != null && questionanswerobj.uniqueCode.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(questionanswerobj);
                }else if (questionanswerobj.description != null && questionanswerobj.description.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(questionanswerobj);
                }
            }
            return matches;
        };
    };

    app.filter('questionanswerFilter', questionanswerFilter);

});
