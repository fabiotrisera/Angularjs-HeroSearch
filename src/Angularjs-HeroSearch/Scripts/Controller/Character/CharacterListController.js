(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('CharacterListController', ['$scope', '$location', 'Characters', function CharacterListController($scope, $location, Characters) {

            var activate = function () {
                $scope.searchName = "";
                Characters.query().$promise.then(function (result) {
                    $scope.characters = result.characters;
                    $scope.total = result.total;
                    $scope.limit = result.limit;
                    $scope.offset = result.offset;
                });
            };

            $scope.search = function () {
                Characters.query({
                    nameStartsWith: $scope.searchName
                }).$promise.then(function (result) {
                    $scope.characters= result.characters;
                    $scope.total=result.total;
                    $scope.limit= result.limit;
                    $scope.offset= result.offset;
                });
            };

            $scope.loadNext = function () {
                if ($scope.searchName === "") {
                    Characters.query({
                        limit: $scope.limit,
                        offset: $scope.offset + $scope.limit
                    }).$promise.then(function (result) {
                        $scope.total = result.total;
                        $scope.limit = result.limit;
                        $scope.offset = result.offset;

                        angular.forEach(result.characters, function (char) {
                            $scope.characters.push(char);
                        });
                    });
                } else {
                    Characters.query({
                        nameStartsWith: $scope.searchName,
                        limit: $scope.limit,
                        offset: $scope.offset + $scope.limit
                    }).$promise.then(function (result) {
                        $scope.total = result.total;
                        $scope.limit = result.limit;
                        $scope.offset = result.offset;

                        angular.forEach(result.characters, function (char) {
                            $scope.characters.push(char);
                        });
                    });
                }
            };

            $scope.detail = function (id) {
                $location.path("/Characters/" + id);
            };

            activate();

        }]);
})();
