(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("EditorController", EditorController);

    EditorController.$inject = ['ngDialog', '$log', '$scope'];

    function EditorController (ngDialog, $log, $scope) {
        var vm = this;

        vm.sample = {};
        vm.openTextFileUploadDialog = openTextFileUploadDialog;
        vm.document = null;

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("EditorController is loaded.");

            $scope.$on("editor/onCompleteItem", function (event, document) {
                vm.document = document;
                ngDialog.close({ template: 'textFileUploaderDialog.tpl' });
            })
        }

        function openTextFileUploadDialog () {
            ngDialog.open({ template: 'textFileUploaderDialog.tpl' });
        }

    }
})();