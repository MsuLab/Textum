(function () {
    'use strict';

    angular
        .module('TextumApp')
        .service("paginationService", paginationService);

    paginationService.$inject = [];

    function paginationService (){
        var service = {
            decode: decode,
            encode: encode
        };

        return service;
        ////////////////////////////////////////

        function decode(page_num) {
            var page = /^\s*[1-9]\d*\s*$/g,
                page_turn = /^\s*[1-9]\d*\s*об\s*$/g,
                page_unknown = /^\s*\?|0\s*$/g,
                is_page = page_num.match(page),
                is_page_turn = page_num.match(page_turn),
                is_page_unknown = page_num.match(page_unknown);
            if (is_page !== null) {
                return parseInt(page_num.replace(/\D/g, ''), 10);
            }
            if (is_page_turn !== null) {
                return parseInt(page_num.replace(/\D/g, ''), 10) + 0.5;
            }
            if (is_page_unknown !== null) {
                return 0;
            }
            return 0;
        }

        function encode(page_num) {
            if (page_num === null) {
                return '?';
            }
            if (page_num === 0) {
                return '?';
            }
            if (page_num % 1 === 0) {
                return page_num.toString();
            }
            var z = page_num - 0.5;
            return z.toString() + ' об';
        }
    }

})();
