(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name Comics
     * 
     * @requires $resource
     * @requires MARVEL
     * 
     * @description
     * This is Comic resource service factory. the return Comic resource have the following property
     * - query - return a list of comics based on search parameter
     * - get - return a single comic
     * 
     */
    angular.module('MarvelResource')
        .factory('Comics', ['$resource', 'MARVEL',
        function ($resource, MARVEL) {
            var comic = $resource( MARVEL.BASE_URL + "/comics/:comicId", {
                apikey: MARVEL.API_KEY,
                comicId: "@comicId"
            }, {
                query: {
                    method: "GET",
                    transformResponse: function (response) {
                        return transformComic(response);
                    },
                    isArray: true
                },
                get: {
                    method: "GET",
                    transformResponse: function (response) {
                        var comic = transformComic(response);
                        return comic[0];
                    },
                    isArray: false
                }
            });

            //extend comic class
            comic.prototype = {

            };

            return comic;
        }]);

    function transformComic(response) {
        var res = angular.fromJson(response);
        return $.map(res.data.results, function (item) {
            return {
                Id: item.id,
                Title: item.title,
                Description: item.description,
                ImageUrl: item.thumbnail !== null ? item.thumbnail.path + "." + item.thumbnail.extension : "/image/image_not_available.jpg"
            };
        });
    }
})();