/*
 * Directive for add 'active' class for the left menu items
 * 
 */
directives.directive('activePageHighlight', function ($rootScope, $state) {
    return function($scope, $element, $attr) {
        function checkUiSref() {
            if ($state.is($attr['uiSref'])) {
                $element.addClass('active-page-highlight');
            } else {
                $element.removeClass('active-page-highlight');
            }
        }

        checkUiSref();

        $rootScope.$on('$stateChangeSuccess', function () {
            checkUiSref();
        });
    };
}).directive("preImg", function () {// this directive is used to display a loader for images, Once images loaded from server, it will hide the loading spinner
    return {
        restrict: "E",
        transclude: true,
        scope: {
            ratio: "@",
            helperClass: "@"
        },
        controller: ["$scope", function ($scope) {
            $scope.loaded = false,
            this.hideSpinner = function () {
                $scope.$apply(function() {
                    $scope.loaded = true
                });
            }
        }
        ],
        templateUrl: "views/authorised/menu/pre-img.html"
    }
}).directive("spinnerOnLoad", function () {  // this show the loader image, we need preimage directive for this.
    return {
        restrict: "A",
        require: "^preImg",
        scope: {
            ngSrc: "@"
        },
        link: function (scope, element, attrs, controller) {
            element.on("load", function () {
                controller.hideSpinner();
            });
        }
    }
});