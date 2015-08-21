(function() {
    'use strict';

    angular
        .module('MarvelApp')
        .directive('breadcrumb', ['$window', function Breadcrumb($window) {
            // Usage:
            //     <Breadcrumb crumbs></Breadcrumb>
            // Creates:
            // breadcrumb from the first item to the child item
            var directive = {
                link: link,
                scope: {
                    crumbs: "="
                },
                restrict: 'A',
                templateUrl: '/Templates/breadcrumb.html'
            };
            return directive;

            function link(scope, element, attrs) {
            }
        }]);

})();