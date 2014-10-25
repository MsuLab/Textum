(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("ViewerController", ViewerController);

    ViewerController.$inject = ['ngDialog', '$log', 'TextImageResource'];

    function ViewerController (ngDialog, $log, TextImageResource) {
        var vm = this;

        vm.sample = {};
        vm.openImagesUploadDialog = openImagesUploadDialog;

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("ViewerController is loaded.")
        }

        function openImagesUploadDialog () {
            ngDialog.open({ template: 'imagesUploaderDialog.tpl' });

        }

    }
})();