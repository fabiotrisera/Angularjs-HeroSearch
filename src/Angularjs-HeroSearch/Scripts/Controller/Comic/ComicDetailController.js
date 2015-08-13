(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('ComicDetailController', ComicDetailController);

    ComicDetailController.$inject = ['$scope', '$routeParams', 'Characters', 'Comics'];

    function ComicDetailController($scope, $routeParams, Characters, Comics) {
        Characters.query({ characterId: $routeParams.characterId }, function (characters) {
            activate();

            $scope.character = characters[0];
            $scope.crumbs = [
                { Text: "Characters", Url: "/" },
                { Text: $scope.character.Name, Url: "" }];

            angular.forEach($scope.character.Comics, function (comic) {
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
            $scope.crumbs = [];
        }
    }
})();
