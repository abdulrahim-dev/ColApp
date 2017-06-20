controllers.controller('authorisedController', function ($scope, $auth, $state, $location) {
    $scope.logout = function () {
        $auth.logout();
        $state.go('unauthorised.home');
    };
   
});

