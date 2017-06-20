services.factory('$authorisedDentistDetailsService', function ($q, $config, $auth, $http) {
    var returnObj = {};
    returnObj.getItem = function (userid) {
        var deferred = $q.defer();
        $http.get("https://jsonplaceholder.typicode.com/users?id=" + userid)
             .success(function (response) {
                     deferred.resolve(response);
             }, function (errorMessage) {
                 deferred.reject(errorMessage);
             });

        return deferred.promise;
    }
    return returnObj;
});