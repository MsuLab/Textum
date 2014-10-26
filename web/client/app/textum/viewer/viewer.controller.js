(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("ViewerController", ViewerController);

    ViewerController.$inject = ['ngDialog', '$log', 'TextImageResource', '$scope'];

    function ViewerController (ngDialog, $log, TextImageResource, $scope) {
        var vm = this;

        vm.sample = {};
        vm.openImagesUploadDialog = openImagesUploadDialog;
        vm.textImages = TextImageResource.query();

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
            ngDialog.open({ template: 'imagesUploaderDialog.tpl' });
        }

    }
})();