(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('CharacterListController', ['$scope', '$location', 'Characters', function CharacterListController($scope, $location, Characters) {
            $scope.searchName = "";
            $scope.characters = Characters.query();

            $scope.search = function () {
                $scope.characters = Characters.query({
                    nameStartsWith: $scope.searchName
                });
            };

            $scope.detail = function (id) {
                $location.path("/Characters/" + id);
            };

        }]);
})();
