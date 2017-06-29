controllers.controller('unauthorisedHomeController', function ($scope, $state, loginService, $timeout, $auth) {
    $scope.loginError = false;
    $scope.loginErrorMessage = "";
    $scope.loginData = {};

    $scope.loginData.userName = "test@test.com";
    $scope.loginData.password = "Admin@123";
    
    // reset login status
    $auth.reset();

    /*
     * Login ---Sample Response
     * .expires:"Tue, 27 Jun 2017 12:13:51 GMT"
       .issued:"Tue, 13 Jun 2017 12:13:51 GMT"
        access_token:""
        expires_in:1209599
        token_type:"bearer"
        userName:"rahim@test.com"
     * 
     */
    $scope.doLogin = function () {
        //$state.go('authorised.itemlists');
        loginService.login($scope.loginData).then(function (response) {
            if (response.access_token !== "" && response.access_token !== undefined && response.access_token !== null) {
                $state.go('authorised.itemlists');
            } else {
                $scope.loginError = true;
                $scope.loginErrorMessage = "Username orPassword is invalid. Please try again.";
                $timeout(function() {
                    $scope.loginError = false;
                    $scope.loginErrorMessage = "";
                }, 1000);
            }
        }, function (error) {
            console.log(error);
        });
        
    };

});