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
                // Sample Page
                .state('main', {
                    url: "/"
                })

                // Sample Page
                .state('sample', {
                    url: "/sample",
                    templateUrl: "/web/tpl/sample"
                })

                // State 1 Page
                .state('state1', {
                    url: "/state1",
                    templateUrl: "/web/tpl/sample/state1"
                })
                    .state('state1.list', {
                        url: "/list",
                        templateUrl: "/web/tpl/sample/state1/list",
                        controller: function($scope) {
                            $scope.items = ["A", "List", "Of", "Items"];
                            console.log($scope);
                        }
                    })

                // State 2 Page
                .state('state2', {
                    url: "/state2",
                    templateUrl: "/web/tpl/sample/state2"
                })
                    .state('state2.list', {
                        url: "/list",
                        templateUrl: "/web/tpl/sample/state2/list",
                        controller: function($scope) {
                            $scope.things = ["A", "Set", "Of", "Things"];
                        }
                    })

                // Multi Page
                .state('multi', {
                    abstract: true,
                    url: '',
                    templateUrl: "/web/tpl/sample/multi"
                })
                .state('multi.root', {
                    url: '/multi/',
                    views: {
                        "state1List": {
                            templateUrl: "/web/tpl/sample/state1/list",
                            controller: function($scope, $log) {
                                $log.log("state1List");
                                $scope.items = ["A", "List", "Of", "Items"];
                            }
                        },
                        "state2List": {
                            templateUrl: "/web/tpl/sample/state2/list",
                            controller: function($scope, $log) {
                                $log.log("state2List");
                                $scope.things = ["A", "Set", "Of", "Things"];
                            }
                        }
                    }

                });



            $locationProvider.html5Mode(true);
        })
})();