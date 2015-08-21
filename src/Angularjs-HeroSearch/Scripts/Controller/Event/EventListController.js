(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('EventListController', ['$scope', '$routeParams', 'Events', function ($scope, $routeParams, Events) {
            activate();

            $scope.searchEvent = function () {
                $scope.events = Events.query({
                    nameStartsWith: $scope.searchName
                });
            };

            function activate() {
                $scope.events = Events.query();
                $scope.searchName = "";
            }
        }]);
})();
