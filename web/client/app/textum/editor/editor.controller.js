(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("EditorController", EditorController);

    EditorController.$inject = ['ngDialog', '$log', '$scope', '$rootScope'];

    function EditorController (ngDialog, $log, $scope, $rootScope) {
        var vm = this;

        vm.document = null;

        vm.openTextFileUploadDialog = openTextFileUploadDialog;
        vm.parsePages = parsePages;

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

        function parsePages() {
            $rootScope.$broadcast("wodo/parseAnnotations");
        }
    }
})();