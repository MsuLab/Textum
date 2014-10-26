(function () {
    'use strict';

    angular
        .module('TextumApp')
        .factory("TextImageResource", TextImageResource);

    TextImageResource.$inject = ['$resource'];

    function TextImageResource ($resource){
        var service = $resource('http://localdocker:8008/api/text-images/:pk', {}, {
                $testMethod: {
                    method: 'PATCH',
                    url: 'http://localdocker:8008/api/text-images/:pk/test_method'
                }
            }
        );

        return service;
        ////////////////////////////////////////
    }

})();
