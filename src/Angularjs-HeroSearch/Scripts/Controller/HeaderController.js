(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('HeaderController', ['$scope', '$location', function HeaderController($scope, $location) {
            $scope.isActive = function (viewLocation) {
                return viewLocation == $location.path();
            };
        }]);
})(); 
