(function () {
    'use strict';

    angular
        .module('MarvelResource')
        .factory('Events', ['$resource', 'MARVEL', function Events($resource, MARVEL) {
            var event = $resource(MARVEL.BASE_URL + "/events/:eventId", {
                apikey: MARVEL.API_KEY,
                eventId: "@eventId"
            }, {
                query: {
                    method: "GET",
                    transformResponse: function (response) {
                        return transformEvent(response);
                    },
                    isArray: true
                },
                get: {
                    method: "GET",
                    transformResponse: function (response) {
                        var result = transformEvent(response);
                        return result[0];
                    },
                    isArray: false
                }
            });

            event.prototype = {

            };

            return event;
        }]);
    

    function transformEvent(response) {
        var res = angular.fromJson(response);
        return $.map(res.data.results, function (event) {
            return {
                Id: event.id,
                Title: event.title,
                Description: event.description,
                ImageUrl: event.thumbnail !== null ? event.thumbnail.path + "." + event.thumbnail.extension : "/image/image_not_available.jpg"
            };
        });
    }
})();