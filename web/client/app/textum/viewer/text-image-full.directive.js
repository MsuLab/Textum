(function () {
    'use strict';

    angular
        .module('TextumApp')
        .directive('textImageFull', textImageFull);

    textImageFull.$inject = [];

    function textImageFull () {
        var directive = {
            restrict: 'E',
            templateUrl: "text-image-full.view.tpl",
            link: link,
            controller : Controller,
            controllerAs: 'vmFull'
        };
        return directive;
        ////////////////////////////////////////

        Controller.$inject = ['$scope'];
        function Controller($scope) {
            var vmFull = this;

            vmFull.textImage = {};

            activate();
            ////////////////////////////////////////

            function activate() {
                $scope.$on("viewer/openFullView", function (event, image) {
                    vmFull.textImage = image;
                });
                $scope.$on("viewer/closeFullView", function (event) {
                    vmFull.textImage = {};
                });
            }

            function close(){

            }
        }

        function link(scope, element, attrs) {
            /* */
        }
    }

})();

