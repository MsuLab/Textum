(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("SampleController", SampleController);

    SampleController.$inject = ['SampleResource', 'ngDialog', '$log'];

    function SampleController (SampleResource, ngDialog, $log) {
        var vm = this;

        vm.sample = {};
        vm.openDialog = openDialog;

        activate();
        ////////////////////////////////////////

        function activate () {
            return getSampleData().then(function() {
                $log.info('Activated Sample View');
            });
        }

        function openDialog () {
            ngDialog.open({
                template: '<p>my template</p>',
                plain: true
            });
        }

        function getSampleData () {
            return SampleResource.get().$promise
                .then(function(data) {
                    vm.sample = data;

                    return vm.sample;
                });
        }
    }
})();