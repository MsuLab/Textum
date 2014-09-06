'use strict';

TextumApp.controller("SampleCtrl", function($scope, SampleResource, $log) {
    $scope.sample = SampleResource.get()
});