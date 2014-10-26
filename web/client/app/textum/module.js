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
//            'blueimp.fileupload',
            'angular-loading-bar'
        ]);
})();