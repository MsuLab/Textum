(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("ImagesUploaderController", ImagesUploaderController);

    ImagesUploaderController.$inject = ['FileUploader', '$log'];

    function ImagesUploaderController (FileUploader, $log) {
        var vm = this;

        vm.imagesUploader = new FileUploader({
            url: '/upload/',
            alias: "textFile"
        });

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("TextFileUploaderController is loaded.");
            setUpCallbacks();
        }

        // CALLBACKS
        function setUpCallbacks() {
            vm.imagesUploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
                $log.debug('onWhenAddingFileFailed', item, filter, options);
            };
            vm.imagesUploader.onAfterAddingFile = function(fileItem) {
                $log.debug('onAfterAddingFile', fileItem);
            };
            vm.imagesUploader.onAfterAddingAll = function(addedFileItems) {
                $log.debug('onAfterAddingAll', addedFileItems);
            };
            vm.imagesUploader.onBeforeUploadItem = function(item) {
                $log.debug('onBeforeUploadItem', item);
            };
            vm.imagesUploader.onProgressItem = function(fileItem, progress) {
                $log.debug('onProgressItem', fileItem, progress);
            };
            vm.imagesUploader.onProgressAll = function(progress) {
                $log.debug('onProgressAll', progress);
            };
            vm.imagesUploader.onSuccessItem = function(fileItem, response, status, headers) {
                $log.debug('onSuccessItem', fileItem, response, status, headers);
            };
            vm.imagesUploader.onErrorItem = function(fileItem, response, status, headers) {
                $log.debug('onErrorItem', fileItem, response, status, headers);
            };
            vm.imagesUploader.onCancelItem = function(fileItem, response, status, headers) {
                $log.debug('onCancelItem', fileItem, response, status, headers);
            };
            vm.imagesUploader.onCompleteItem = function(fileItem, response, status, headers) {
                $log.debug('onCompleteItem', fileItem, response, status, headers);
            };
            vm.imagesUploader.onCompleteAll = function() {
                $log.debug('onCompleteAll');
            };
        }

    }
})();