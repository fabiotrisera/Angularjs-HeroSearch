(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('ComicDetailController', ComicDetailController);

    ComicDetailController.$inject = ['$scope', '$routeParams', 'Comics'];

    function ComicDetailController($scope, $routeParams, Comics) {
        Comics.query({ comicId: $routeParams.comicId }, function (comics) {
            activate();

            $scope.comic = comics[0];
            $scope.crumbs = [
                { Text: "Comics", Url: "/Comics" },
                { Text: $scope.comic.Title, Url: "" }];
        });



        function activate() {
            $scope.character = {};
            $scope.comics = [];
            $scope.crumbs = [];
        }
    }
})();
