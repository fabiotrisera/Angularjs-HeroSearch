(function () {
    'use strict';
    
    /**
     * @ngdoc service
     * @name Characters
     * 
     * @requires $resource
     * @requires MARVEL
     * @requires Comics
     * 
     * @description
     * This is Character resource service factory. the character resource have the following property
     * - query - return a list of character based on search parameter
     * - get - return a single character
     * - getComics - get top 20 comics which related to this character
     * 
     */
    angular.module('MarvelResource')
        .factory('Characters', ['$resource', 'MARVEL', 'Comics',
        function ($resource, MARVEL, Comics) {

            var character = $resource( MARVEL.BASE_URL + "/characters/:characterId", {
                characterId: "@characterId"
            }, {
                query: {
                    method: "GET",
                    transformResponse: function (response) {
                        var characters = transformCharacter(response);
                        var res = angular.fromJson(response);

                        var data = 
                        {
                            limit: res.data.limit,
                            offset: res.data.offset,
                            total: res.data.total,
                            characters : characters
                        };

                        return data;
                    },
                    isArray: false
                },
                get: {
                    method: "GET",
                    transformResponse: function (response) {
                        var result = transformCharacter(response);

                        return result[0];
                    },
                    isArray : false
                }
            });

            //extend character model
            character.prototype = {
                getComics: function (comics) {
                    var comicArray = [];
                    
                    angular.forEach(comics, function (comic) {
                        Comics.query({ comicId: comic.ComicId }, function (comicDetail) {
                            comicArray.push({
                                Title: comicDetail[0].Title,
                                ImageUrl: comicDetail[0].ImageUrl,
                                ComicId: comicDetail[0].Id
                            });
                        });
                    });

                    return comicArray;
                }
            };

            return character;
        }]);

    function transformCharacter(response) {
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
                        ComicId: comic.resourceURI !== false ? comic.resourceURI.substr(comic.resourceURI.lastIndexOf('/') + 1) : 0
                    };
                }),
                Events: $.map(item.events.items, function (event) {
                    return {
                        EventName: event.name,
                        EventId: event.resourceURI !== false ? event.resourceURI.substr(event.resourceURI.lastIndexOf('/') + 1) : 0
                    };
                }),
                Series: $.map(item.series.items, function (series) {
                    return {
                        SeriesName: series.name,
                        SeriesId: series.resourceURI !== false ? series.resourceURI.substr(series.resourceURI.lastIndexOf('/') + 1) : 0
                    };
                }),
                Stories: $.map(item.stories.items, function (story) {
                    return {
                        StoryName: story.name,
                        StoryId: story.resourceURI !== false ? story.resourceURI.substr(story.resourceURI.lastIndexOf('/') + 1) : 0
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
    }

})();