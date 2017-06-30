/*
 * 
 * 
 */
controllers.controller('authorisedAddDentistController', function ($scope, $cordovaGeolocation, $cordovaCamera, $ionicModal, $ionicPopup) {


    $scope.saveDentist = function() {
        $ionicPopup.alert({
            title: 'Success!',
            template: 'Saved successfully'
        });
    };
    
    var mapoptions = { timeout: 10000, enableHighAccuracy: true };
    $scope.profilePicture = "https://s3.amazonaws.com/ionic-io-static/5tUcTrHcTUKRORUQd15Q_profile_picture_default.jpg";
    $scope.imagecaptured = 0;
    $scope.takePhoto_Camera = function () {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        // udpate camera image directive
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.profilePicture = "data:image/jpeg;base64," + imageData;
            $scope.imagecaptured = 1;
            $scope.$apply();
        }, function (err) {
            console.log('Failed because: ');
            console.log(err);
        });
    };
    $scope.slideImages = [];
    $scope.selectPhoto_Gallery = function () {
        var options = {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            mediaType: 2,
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            //encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        };

        // udpate camera image directive
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.profilePicture = imageData;
            $scope.imagecaptured = 2;// for 
            $scope.$apply();
        }, function (err) {
            console.log('Failed because: ');
            console.log(err);
        });
    };


    /**
      * ************* Get Current Location
      */

    $cordovaGeolocation.getCurrentPosition(mapoptions).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            draggable: true
        });

        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {

           
            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });

        });

        //***********get lat and longt on scroll moving
        google.maps.event.addListener(marker, 'drag', function (event) {
            console.log("langtitude : "+event.latLng.lat()+" , longtitude : " +event.latLng.lng());
        });

    }, function (error) {
        console.log("Could not get location");
    });

    //-----------------Methods for Image Zooming
    $scope.showImages = function (index) {
        if ($scope.imagecaptured !== 0) {
            $scope.slideImages = [];
            $scope.slideImages.unshift({ 'src': $scope.profilePicture });
            $scope.zoomMin = 1;
            $scope.activeSlide = index;
            $scope.showModal('views/authorised/menu/gallery-zoomview.html');
        }
    };

    $scope.showModal = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove()
    };

    $scope.updateSlideStatus = function (slide) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
        if (zoomFactor == $scope.zoomMin) {
            $ionicSlideBoxDelegate.enableSlide(true);
        } else {
            $ionicSlideBoxDelegate.enableSlide(false);
        }
    };
    //-----------------Methods for Image Zooming
});