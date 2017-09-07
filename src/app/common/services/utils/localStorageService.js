


define(['app'], function (app) {

    var localStorageService = function () {
    	
        this.setValue = function (key, data) {
            if (typeof (Storage) !== "undefined") {
                window.sessionStorage.setItem(key, JSON.stringify(data));
            }
        };
        
        this.getValue = function (key) {
            if (typeof (Storage) !== "undefined") {
                return $.parseJSON(window.sessionStorage.getItem(key));
            }
        };
    };
    
    app.service('localStorageService', [localStorageService]);

});


