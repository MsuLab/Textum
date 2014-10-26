(function () {
    'use strict';

    angular
        .module('TextumApp')
        .directive('textImage', textImage);

    textImage.$inject = [];

    function textImage () {
        var directive = {
            restrict: 'E',
            templateUrl: "text-image.view.tpl",
            scope: {
                image: '='
            },
            link: link,
            controller : Controller,
            controllerAs: 'vm'
        };
        return directive;
        ////////////////////////////////////////

        Controller.$inject = ['$scope', 'TextImageResource', 'paginationService', '$rootScope'];
        function Controller($scope, TextImageResource, paginationService, $rootScope) {
            var vm = this;

            vm.textImage = $scope.image;
            vm.inputPageNumber = "";
            vm.updatePageNumber = updatePageNumber;
            vm.deleteTextImage = deleteTextImage;

            ////////////////////////////////////////

            function updatePageNumber() {
                var pageNumber  = paginationService.decode(vm.inputPageNumber);

                TextImageResource.$updatePageNumber({id: vm.textImage.id},
                    {page_number: pageNumber },
                    function (textImage) {
                        vm.textImage = textImage;
                        vm.inputPageNumber = "";
                })
            }

            function deleteTextImage() {
                TextImageResource.delete({id: vm.textImage.id}, function () {
                    $rootScope.$broadcast("viewer/onDeleteItem", $scope.$parent.$index);
                });
            }
        }

        function link(scope, element, attrs) {
            /* */
        }
    }

})();

