(function () {
    'use strict';

    angular
        .module('MarvelApp')
        .controller('CharacterListController', CharacterListController);

    CharacterListController.$inject = ['$scope', '$location' , 'Characters'];

    function CharacterListController($scope, $location, Characters) {
        $scope.searchName = "";
        $scope.characters = Characters.query();
        
        $scope.search = function () {
            Characters.query({
                nameStartsWith: $scope.searchName
            }, function (result) {
                $scope.characters = result;
            });
        };

        $scope.detail = function (id) {
            $location.path("/Characters/" + id);
        };

    }
})();
