(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("SampleController", SampleController);

    SampleController.$inject = ['SampleResource', '$log'];

    function SampleController (SampleResource, $log) {
        var vm = this;

        vm.sample = {};

        activate();
        ////////////////////////////////////////

        function activate () {
            return getSampleData().then(function() {
                $log.info('Activated Sample View');
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