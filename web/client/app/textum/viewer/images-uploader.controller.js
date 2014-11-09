(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("ImagesUploaderController", ImagesUploaderController);

    ImagesUploaderController.$inject = ['FileUploader', '$log', '$rootScope', 'paginationService'];

    function ImagesUploaderController (FileUploader, $log, $rootScope, paginationService) {
        var vm = this;

        vm.imagesUploader = new FileUploader({
            url: '/api/text-images/.json',
            alias: "image"
        });
        vm.pageNumbers = [];

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("TextFileUploaderController is loaded.");
            setUpCallbacks();
        }

        // CALLBACKS
        function setUpCallbacks() {
            vm.imagesUploader.onBeforeUploadItem = function (item) {
                var idx = vm.imagesUploader.getIndexOfItem(item),
                    pageNumber = vm.pageNumbers[idx] == undefined ? "" : vm.pageNumbers[idx];

                pageNumber = paginationService.decode(pageNumber);

                item.formData.push({page_number: pageNumber});
            };

            vm.imagesUploader.onCompleteItem = function(fileItem, response, status, headers) {
                $rootScope.$broadcast("viewer/onCompleteItem", response);
            };

            vm.imagesUploader.onCompleteAll = function() {
                $rootScope.$broadcast("viewer/onCompleteAll");
            };
        }

    }
})();