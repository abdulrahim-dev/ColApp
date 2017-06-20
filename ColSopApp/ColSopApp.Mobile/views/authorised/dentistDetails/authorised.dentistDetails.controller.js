controllers.controller('authorisedDentistDetailsController', function ($scope, $authorisedDentistDetailsService, $stateParams) {
    $authorisedDentistDetailsService.getItem($stateParams.dentistId).then(function (response) {
        $scope.user = response;

        //---Google map
        var latLng = new google.maps.LatLng($scope.user[0].address.geo.lat, $scope.user[0].address.geo.lng);

        var mapOptions = {
            center: latLng,
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.City
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
            position: latLng,
            map: $scope.map
        });

    }, function (error) {
        console.log(error);
    });
});