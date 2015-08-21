(function () {
    'use strict';

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