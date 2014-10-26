(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("EditorController", EditorController);

    EditorController.$inject = ['ngDialog', '$log'];

    function EditorController (ngDialog, $log) {
        var vm = this;

        vm.sample = {};
        vm.openTextFileUploadDialog = openTextFileUploadDialog;

        activate();
        ////////////////////////////////////////

        function activate () {
            $log.log("EditorController is loaded.")
        }

        function openTextFileUploadDialog () {
            ngDialog.open({ template: 'textFileUploaderDialog.tpl' });

        }

    }
})();