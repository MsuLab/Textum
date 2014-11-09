(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("ViewerController", ViewerController);

    ViewerController.$inject = ['ngDialog', '$log', 'TextImageResource', '$scope', '$rootScope', 'paginationService'];

    function ViewerController (ngDialog, $log, TextImageResource, $scope, $rootScope, paginationService) {
        var vm = this;

        vm.textImages = TextImageResource.query();
        vm.selectedImage = null;
        vm.isShowFullImage = false;
        vm.pageQuery = null;

        vm.openImagesUploadDialog = openImagesUploadDialog;
        vm.deleteAll = deleteAll;
        vm.select = select;
        vm.openSelected = openSelected;
        vm.openFullView = openFullView;
        vm.closeFullView = closeFullView;
        vm.searchPage = searchPage;

        activate();
        ////////////////////////////////////////

        function activate () {
             $log.log("ViewerController is loaded.");

             $scope.$on("viewer/onCompleteItem", function (event, textImage) {
                 vm.textImages.push(textImage);
             });
             $scope.$on("viewer/onCompleteAll", function (event) {
                 ngDialog.close({ template: 'imagesUploaderDialog.tpl' });
             });
             $scope.$on("viewer/onDeleteItem", function (event, idx) {
                 vm.textImages.splice(idx, 1);
             });
        }

        function openImagesUploadDialog () {
            console.log("here")
            ngDialog.open({ template: 'imagesUploaderDialog.tpl' });
        }

        function deleteAll() {
            TextImageResource.deleteAll(function (textImages) {
                while(vm.textImages.length > 0) {vm.textImages.pop();}
            })
        }

        function select(index) {
            if (vm.selectedImage) {
                vm.selectedImage.isSelected = false;

                if (vm.selectedImage == vm.textImages[index])
                    return;
            }

            vm.selectedImage = vm.textImages[index];
            vm.selectedImage.index = index;
            vm.selectedImage.isSelected = true;
        }

        function openFullView(index) {
            select(index);
            $rootScope.$broadcast("viewer/openFullView", vm.selectedImage);
            $rootScope.$broadcast("wodo/scrollToPage", vm.selectedImage.page_number);

            vm.isShowFullImage = true;
        }

        function closeFullView() {
            vm.isShowFullImage = false;
            vm.selectedImage.isSelected = false;
            $rootScope.$broadcast("viewer/closeFullView");
        }

        function searchPage() {
            var decodedPageNum = paginationService.decode(vm.searchQuery);

            angular.forEach(vm.textImages, function (obj, i) {
                if (obj.page_number == decodedPageNum)
                    openFullView(i);
            });

            vm.searchQuery = null
        }

        function openSelected() {
            openFullView(vm.selectedImage.index)
        }
    }
})();