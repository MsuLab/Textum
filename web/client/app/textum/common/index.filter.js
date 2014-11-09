(function () {
    'use strict';

    angular
        .module('TextumApp')
        .filter('index', index);

    index.$inject = [];

    function index (){
        return filter;
        ////////////////////////////////////////

        function filter (array, index) {
            if (!index)
                index = 'index';
            for (var i = 0; i < array.length; ++i) {
                array[i][index] = i;
            }
            return array;
        }
    }

})();
