(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('CharacterDetailController', CharacterDetailController);

    CharacterDetailController.$inject = ['$scope', '$routeParams', 'Characters', 'Comics'];

    function CharacterDetailController($scope, $routeParams, Characters, Comics) {
        Characters.query({ characterId: $routeParams.characterId }, function (character) {
            activate();
            $scope.character = character;

            angular.forEach($scope.character[0].Comics, function (comic) {
                Comics.query({ comicId: comic.ComicId }, function (comicDetail) {
                    $scope.comics.push({
                        Title: comicDetail[0].Title,
                        ImageUrl: comicDetail[0].ImageUrl
                    });
                });
            });
        });

        

        function activate() {
            $scope.character = {};
            $scope.comics = [];
        }
    }
})();
