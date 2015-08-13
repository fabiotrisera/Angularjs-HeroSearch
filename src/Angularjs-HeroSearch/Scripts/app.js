(function () {
    'use strict';
    
    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('MarvelApp', [
           'ngRoute', 'ngAnimate', 'CharacterService', 'ComicService'
        ]).config(config);

    function config($routeProvider, $locationProvider){
        $routeProvider
        .when('/', {
            templateUrl: '/Views/Characters/List.html',
            controller: 'CharacterListController'
        })
        .when("/Characters/:characterId", {
            templateUrl: 'Views/Characters/Detail.html',
            controller: 'CharacterDetailController'
        })
        .when("/Comics", {
            templateUrl: 'Views/Comics/List.html',
            controller: 'ComicListController'
        })
        .when("/Comics/:comicId", {
            templateUrl: 'Views/Comics/Detail.html',
            controller: 'ComicDetailController'
        });

        $locationProvider.html5Mode(true);
    }
})();
