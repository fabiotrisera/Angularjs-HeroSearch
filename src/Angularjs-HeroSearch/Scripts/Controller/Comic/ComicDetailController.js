(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('ComicDetailController', ['$scope', '$routeParams', 'Comics', function ComicDetailController($scope, $routeParams, Comics) {
            activate();

            Comics.get({ comicId: $routeParams.comicId }).$promise.then(function (comics) {
                $scope.comic = comics;
                $scope.crumbs = [
                    { Text: "Comics", Url: "/Comics" },
                    { Text: $scope.comic.Title, Url: "" }];
            });

            function activate() {
                $scope.character = {};
                $scope.comics = [];
                $scope.crumbs = [];
            }
        }]);
})();
