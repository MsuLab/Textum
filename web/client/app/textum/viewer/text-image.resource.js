(function () {
    'use strict';

    angular
        .module('TextumApp')
        .factory("TextImageResource", TextImageResource);

    TextImageResource.$inject = ['$resource'];

    function TextImageResource ($resource){
        var service = $resource('http://localdocker:8008/api/text-images/:id', {}, {
                $updatePageNumber: {
                    method: 'PATCH',
                    url: 'http://localdocker:8008/api/text-images/:id/update_page_number'
                },
                deleteAll: {
                    method: 'DELETE',
                    isArray: true
                }
            }
        );

        return service;
        ////////////////////////////////////////
    }

})();
