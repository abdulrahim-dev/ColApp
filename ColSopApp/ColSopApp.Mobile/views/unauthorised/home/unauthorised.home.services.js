services.factory('loginService', function ($q, $config, $auth, $http) {
    var returnObj = {};
    returnObj.login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var deferred = $q.defer();
        $http.post($config.host + 'token', data, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
             .success(function (response) {
                 if ($auth.save(response.userName, response, false)) {
                     deferred.resolve(response);
                 } else {
                     deferred.reject('Unable to Login. Please try again.');
                 }

             }, function (errorMessage) {
                 deferred.reject(errorMessage);
             });

        return deferred.promise;
    }
    return returnObj;
});