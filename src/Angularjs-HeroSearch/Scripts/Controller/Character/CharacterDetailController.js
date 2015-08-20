(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('CharacterDetailController', CharacterDetailController);

    CharacterDetailController.$inject = ['$scope', '$routeParams', 'Characters', 'Comics'];

    function CharacterDetailController($scope, $routeParams, Characters, Comics) {
        activate();

        Characters.get({ characterId: $routeParams.characterId }).$promise.then(function (character) {
            $scope.character = character;
            $scope.comics = character.getComics(character.Comics);

            $scope.crumbs = [
                { Text: "Characters", Url: "/" },
                { Text: $scope.character.Name, Url: "" }];

        });

        function activate() {
            $scope.character = {};
            $scope.comics = [];
            $scope.crumbs = [];
        }
    }
})();
