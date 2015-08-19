(function () {
    'use strict';

    angular.module('MarvelApp', [
           'ngRoute', 'ngAnimate', 'ngResource'
    ]).constant("MARVEL", {
        "API_KEY": "193de468b42a867fa40e7bac25106814",
        "BASE_URL" : "http://gateway.marvel.com:80/v1/public"
    }).config(marvelConfig);

    marvelConfig.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

    function marvelConfig($routeProvider, $locationProvider, $httpProvider) {
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
        
        //add interceptor
        $httpProvider.interceptors.push(marvelInterceptor);
    }

    marvelInterceptor.$inject = ['MARVEL'];

    function marvelInterceptor(MARVEL) {
        return {
            "request": function (config) {
                    
                //add api key for every request to marvel
                if (config.url.indexOf("gateway.marvel.com") > -1) {
                    if (!config.params) {
                        config.params = {};
                    }

                    //add marvel api key
                    config.params.apikey = MARVEL.API_KEY;
                }

                return config;
            }
        };
    }

})();
