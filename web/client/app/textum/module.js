(function () {
    'use strict';

    angular
        .module('TextumApp', [
            'ngCookies',
            'ngSanitize',
            'ngRoute',
            'ngResource',
            'ngAnimate',

            'ui.router',

            'angularFileUpload',
            'ngDialog',
            'angular-loading-bar'
        ]);
})();