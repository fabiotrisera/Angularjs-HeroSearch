(function () {
    'use strict';

    angular.module('MarvelApp')
        .factory('Comics', ['$resource', 'MARVEL',
        function ($resource, MARVEL) {
            return $resource( MARVEL.BASE_URL + "/comics/:comicId", {
                apikey: MARVEL.API_KEY,
                comicId: "@comicId"
            }, {
                query: {
                    method: "GET",
                    transformResponse: function (response) {
                        var res = angular.fromJson(response);
                        return $.map(res.data.results, function (item) {
                            return {
                                Id: item.id,
                                Title: item.title,
                                Description: item.description,
                                ImageUrl: item.thumbnail !== null? item.thumbnail.path + "." + item.thumbnail.extension : "/image/image_not_available.jpg"
                            };
                        });
                    },
                    isArray: true
                }
            });
        }]);
})();