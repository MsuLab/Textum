(function () {
    'use strict';

    angular
        .module('TextumApp', [
            'ngCookies', 'ngSanitize', 'ngRoute', 'ngResource', 'ngAnimate',
            'angularFileUpload', 'ngDialog', 'angular-loading-bar'
        ])
        .config(function ($httpProvider, $routeProvider, $locationProvider) {

            $routeProvider
                .when('/sample/', {
                    templateUrl: "/web/tpl/sample/"
                });

            $locationProvider.html5Mode(true);
        })
})();