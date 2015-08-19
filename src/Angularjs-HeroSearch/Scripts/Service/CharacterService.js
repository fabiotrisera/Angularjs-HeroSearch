(function () {
    'use strict';

    angular.module('MarvelApp')
        .factory('Characters', ['$resource', 'MARVEL',
        function ($resource, MARVEL) {
            return $resource( MARVEL.BASE_URL + "/characters/:characterId", {
                characterId: "@characterId"
            }, {
                query: {
                    method: "GET",
                    transformResponse: function (response) {
                        var res = angular.fromJson(response);

                        return $.map(res.data.results, function (item) {
                            return {
                                Id: item.id,
                                Name: item.name,
                                Description: item.description,
                                ImageUrl: item.thumbnail !== null ? item.thumbnail.path + "." + item.thumbnail.extension : "/Images/image_not_available.jpg",
                                Comics: $.map(item.comics.items, function (comic) {
                                    return {
                                        ComicName: comic.name,
                                        ComicId: comic.resourceURI.substr(comic.resourceURI.lastIndexOf('/') + 1)
                                    };
                                }),
                                Events: $.map(item.events.items, function (event) {
                                    return {
                                        EventName: event.name,
                                        EventId: event.resourceURI.substr(event.resourceURI.lastIndexOf('/') + 1)
                                    };
                                }),
                                Series: $.map(item.series.items, function (series) {
                                    return {
                                        SeriesName: series.name,
                                        SeriesId: series.resourceURI.substr(series.resourceURI.lastIndexOf('/') + 1)
                                    };
                                }),
                                Stories: $.map(item.stories.items, function (story) {
                                    return {
                                        StoryName: story.name,
                                        StoryId: story.resourceURI.substr(story.resourceURI.lastIndexOf('/') + 1)
                                    };
                                }),
                                Links: $.map(item.urls, function (url) {
                                    return {
                                        LinkName: url.type,
                                        Url: url.url
                                    };
                                })
                            };
                        });
                    },
                    isArray: true
                }
            });
        }]);
})();