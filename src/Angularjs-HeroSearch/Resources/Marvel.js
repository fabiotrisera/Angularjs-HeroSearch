(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name MarvelResource
     *
     * @description
     * Use this is the main module for marver resource. it contains the constant value for the following items
     * - API_KEY : this is the API key obtain from marvel.com
     * - BASE_URL : this is the base url of Marvel API
     */
    angular.module('MarvelResource', [
        // Angular modules 
        'ngResource'

        // Custom modules 

        // 3rd Party Modules

    ]).constant("MARVEL", {
        "API_KEY": "193de468b42a867fa40e7bac25106814",
        "BASE_URL": "http://gateway.marvel.com:80/v1/public"
    });
})();