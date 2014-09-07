(function () {
    'use strict';

    angular
        .module('TextumApp')
        .factory("SampleResource", SampleResource);

    SampleResource.$inject = ['$resource'];

    function SampleResource ($resource){
        var service = $resource("/api/sample/");

        return service;
        ////////////////////////////////////////
    }

})();
