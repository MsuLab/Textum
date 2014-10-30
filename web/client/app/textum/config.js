(function () {
    'use strict';

    angular
        .module('TextumApp')
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $routeProvider, $locationProvider) {

            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            $stateProvider

                // Multi Page
                .state('textum', {
                    abstract: true,
                    url: '',
                    templateUrl: "/web/tpl/textum/base"
                })
                .state('textum.root', {
                    url: '/',
                    views: {
                        "editor": {
                            templateUrl: "/web/tpl/textum/editor"
                        },
                        "viewer": {
                            templateUrl: "/web/tpl/textum/viewer",
                            controller: function($scope, $log) {
                                $log.log("viewer");
                            }
                        }
                    }

                });

            $locationProvider.html5Mode(true);

            $httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
        })
})();

