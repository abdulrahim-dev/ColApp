controllers.controller('authorisedItemlistsController', function ($scope, $authorisedlistingService) {
    $authorisedlistingService.getList().then(function (response) {
        $scope.items = response;
    }, function (error) {
        console.log(error);
    });
});