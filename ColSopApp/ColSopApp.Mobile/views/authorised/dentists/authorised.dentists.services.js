services.factory('$authorisedDentistService', function ($q, $config, $auth, $http) {
    var returnObj = {};
    returnObj.getList = function () {
        var deferred = $q.defer();
        $http.get("https://jsonplaceholder.typicode.com/users")
             .success(function (response) {
                 deferred.resolve(response);
             }, function (errorMessage) {
                 deferred.reject(errorMessage);
             });

        return deferred.promise;
    }
    return returnObj;
});