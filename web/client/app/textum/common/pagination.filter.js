(function () {
    'use strict';

    angular
        .module('TextumApp')
        .filter("pagination", pagination);

    pagination.$inject = ['paginationService'];

    function pagination (paginationService){
        return filter;
        ////////////////////////////////////////

        function filter(input) {
            return paginationService.encode(input);
        }
    }

})();
