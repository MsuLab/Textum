(function () {
    'use strict';

    angular
        .module('TextumApp')
        .directive('textImage', textImage);

    textImage.$inject = ['$log', '$templateCache'];

    function textImage ($log, $templateCache) {
        var directive = {
            link: link,
            templateUrl: "text-image.view.tpl",
            restrict: 'E',
            controller: function () {
                this.alt = 'world';
            },
            controllerAs: 'vm'
        };
        return directive;
        ////////////////////////////////////////

        function link(scope, element, attrs) {
            /* */
        }
    }

})();
