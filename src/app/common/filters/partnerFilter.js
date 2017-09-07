
'use strict';

define(['app'], function (app) {

    var partnerFilter = function () {

        return function (partners, filterValue) {
            if (!filterValue) return partners;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < partners.length; i++) {
                var partner = partners[i];
                /*if (partner.partnerID.toLowerCase().indexOf(filterValue) > -1 ||
                    partner.partnerType.toLowerCase().indexOf(filterValue) > -1 ||
                    partner.partnerName.toLowerCase().indexOf(filterValue) > -1 ||
                    partner.paymentType.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(partner);
                }*/
                if (partner.partnerName.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(partner);
                }
            }
            return matches;
        };
    };

    app.filter('partnerFilter', partnerFilter);

});