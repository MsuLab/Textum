(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("TextFileUploaderController", TextFileUploaderController);

    TextFileUploaderController.$inject = ['FileUploader', '$log', '$rootScope'];

    function TextFileUploaderController (FileUploader, $log, $rootScope) {
        var vm = this;

        vm.textFileUploader = new FileUploader({
            url: '/api/text-documents/.json',
            alias: "document"
        });

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("TextFileUploaderController is loaded.");
            setUpCallbacks();
        }

        // CALLBACKS
        function setUpCallbacks() {
            vm.textFileUploader.onAfterAddingFile = function(fileItem) {
                vm.textFileUploader.clearQueue();
                vm.textFileUploader.queue.push(fileItem);
            };
            vm.textFileUploader.onCompleteItem = function(fileItem, response, status, headers) {
                $rootScope.$broadcast("editor/onCompleteItem", response);
            };

        }

    }
})();