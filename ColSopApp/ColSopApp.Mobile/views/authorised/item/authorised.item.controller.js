controllers.controller('authoriseditemController', function ($scope, $authoriseditemService, $stateParams) {
    $authoriseditemService.getItem($stateParams.itemId).then(function (response) {
        $scope.item = response;
    }, function (error) {
        console.log(error);
    });
});