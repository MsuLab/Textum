(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("TextFileUploaderController", TextFileUploaderController);

    TextFileUploaderController.$inject = ['FileUploader', '$log'];

    function TextFileUploaderController (FileUploader, $log) {
        var vm = this;

        vm.textFileUploader = new FileUploader({
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
            vm.textFileUploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
                $log.debug('onWhenAddingFileFailed', item, filter, options);
            };
            vm.textFileUploader.onAfterAddingFile = function(fileItem) {
                $log.debug('onAfterAddingFile', fileItem);
                vm.textFileUploader.clearQueue();
                vm.textFileUploader.queue.push(fileItem);
                $log.log(vm.textFileUploader.queue, fileItem)
            };
            vm.textFileUploader.onAfterAddingAll = function(addedFileItems) {
                $log.debug('onAfterAddingAll', addedFileItems);
            };
            vm.textFileUploader.onBeforeUploadItem = function(item) {
                $log.debug('onBeforeUploadItem', item);
            };
            vm.textFileUploader.onProgressItem = function(fileItem, progress) {
                $log.debug('onProgressItem', fileItem, progress);
            };
            vm.textFileUploader.onProgressAll = function(progress) {
                $log.debug('onProgressAll', progress);
            };
            vm.textFileUploader.onSuccessItem = function(fileItem, response, status, headers) {
                $log.debug('onSuccessItem', fileItem, response, status, headers);
            };
            vm.textFileUploader.onErrorItem = function(fileItem, response, status, headers) {
                $log.debug('onErrorItem', fileItem, response, status, headers);
            };
            vm.textFileUploader.onCancelItem = function(fileItem, response, status, headers) {
                $log.debug('onCancelItem', fileItem, response, status, headers);
            };
            vm.textFileUploader.onCompleteItem = function(fileItem, response, status, headers) {
                $log.debug('onCompleteItem', fileItem, response, status, headers);
            };
            vm.textFileUploader.onCompleteAll = function() {
                $log.debug('onCompleteAll');
            };
        }

    }
})();