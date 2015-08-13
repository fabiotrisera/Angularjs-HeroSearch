(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('ComicListController', ComicListController);

    ComicListController.$inject = ['$scope', '$routeParams', 'Comics'];

    function ComicListController($scope, $routeParams, Comics) {
        Comics.query({}, function (comics) {
            activate();

            $scope.comics = comics;

            $scope.search = function () {
                Comics.query({
                    titleStartsWith: $scope.searchName
                }, function (result) {
                    $scope.comics = result;
                });
            };
        });



        function activate() {
            $scope.comics = [];
        }
    }
})();
