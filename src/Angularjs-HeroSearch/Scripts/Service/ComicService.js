(function () {
    'use strict';

    var ComicService = angular.module('ComicService', ['ngResource']);


    ComicService.factory('Comics', ['$resource',
        function ($resource) {
            return $resource("http://gateway.marvel.com:80/v1/public/comics/:comicId", {
                apikey: "193de468b42a867fa40e7bac25106814",
                comicId: "@comicId"
            }, {
                query: {
                    method: "GET",
                    transformResponse: function (response) {
                        var res = angular.fromJson(response);
                        return $.map(res.data.results, function (item) {
                            console.log(item);
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