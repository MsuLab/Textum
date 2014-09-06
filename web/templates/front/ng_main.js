'use strict';

var TextumApp = angular.module('TextumApp', [
        'ngCookies', 'ngSanitize', 'ngRoute', 'ngResource', 'ngAnimate',
        'angularFileUpload', 'ngDialog', 'angular-loading-bar'
    ]);

TextumApp.config(function ($httpProvider, $routeProvider, $locationProvider) {

    $routeProvider
        .when('/sample/', {
            templateUrl: "http://127.0.0.1:8000/web/tpl/sample/",
            controller: "SampleCtrl"
        });

    $locationProvider.html5Mode(true);
});

TextumApp.run(function ($log) {
});
