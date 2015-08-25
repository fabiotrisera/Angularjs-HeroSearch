(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name MarvelResource
     *
     * @description
     * Use this is the main module for marver resource.
     */
    angular.module('MarvelResource', [
        // Angular modules 
        'ngResource'
    ])
    /**
     * @ngdoc interface
     * @name MARVEL
     *
     * @description
     * This is angular constant contains marvel.com specific properties
     * - API_KEY - this is the API key obtain from marvel.com
     * - BASE_URL - this is the base url of Marvel API
     */
        .constant("MARVEL", {
        "API_KEY": "193de468b42a867fa40e7bac25106814",
        "BASE_URL": "http://gateway.marvel.com:80/v1/public"
    });
})();