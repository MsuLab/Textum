(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("ImagesUploaderController", ImagesUploaderController);

    ImagesUploaderController.$inject = ['FileUploader', '$log', '$rootScope'];

    function ImagesUploaderController (FileUploader, $log, $rootScope) {
        var vm = this;

        vm.imagesUploader = new FileUploader({
            url: 'http://localdocker:8008/api/text-images/.json',
            alias: "image"
        });

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("TextFileUploaderController is loaded.");
            setUpCallbacks();
        }

        // CALLBACKS
        function setUpCallbacks() {
            vm.imagesUploader.onCompleteItem = function(fileItem, response, status, headers) {
                $rootScope.$broadcast("viewer/onCompleteItem", response);
            };
            vm.imagesUploader.onCompleteAll = function() {
                $rootScope.$broadcast("viewer/onCompleteAll");
            };
        }

    }
})();