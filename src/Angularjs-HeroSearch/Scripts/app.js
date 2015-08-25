(function () {
    'use strict';
    /**
     * @ngdoc overview
     * @name MarvelApp
     *
     * @description
     * The this is the main module of MarvelApp. the following things are specify here
     * - View routing using ngRoute
     * - URL to be using HTML5 mode, legacy browser will default to using #/
     * - HTTP interceptor 
     * 
     * @requires MarvelResource, ngRoute, ngAnimate, ngResource
     *
     */
    angular.module('MarvelApp' , [
           'ngRoute', 'ngAnimate', 'ngResource', 'MarvelResource'
    ]).config(['$routeProvider', '$locationProvider', '$httpProvider', function marvelConfig($routeProvider, $locationProvider, $httpProvider) {
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
        })
        .when("/Events", {
            templateUrl: 'Views/Events/List.html',
            controller: 'EventListController'
        })
        .when("/Events/:eventId", {
            templateUrl: 'Views/Events/Detail.html',
            controller: 'EventDetailController'
        });

        $locationProvider.html5Mode(true);

        //add interceptor
        $httpProvider.interceptors.push(marvelInterceptor);
    }]);

    marvelInterceptor.$inject = ['MARVEL'];


    /**
     * @ngdoc interface
     * @object function
     *
     * @param {constant} MARVEL
     * this is the constant which contains all marvel related property 
     *
     * @name marvelInterceptor
     *
     * @description
     * The method intercept each http request that goes to 'gate.marvel.com'
     * and add extra query string 'apikey' which value comes from the constant
     *
     */
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
