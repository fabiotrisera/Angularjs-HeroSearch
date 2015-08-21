(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('EventDetailController', ["$scope", "$routeParams", "Events", function ($scope, $routeParams, Events) {
            activate();

            function activate() {
                Events.get({ eventId: $routeParams.eventId }).$promise.then(function (event) {
                    $scope.event = event;

                    $scope.crumbs = [
                    { Text: "Events", Url: "/Events" },
                    { Text: $scope.event.Title, Url: "" }];
                });
            }
        }]);
})();
