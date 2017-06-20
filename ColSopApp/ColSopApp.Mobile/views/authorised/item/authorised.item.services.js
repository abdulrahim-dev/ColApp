services.factory('$authoriseditemService', function ($q, $config, $auth, $http) {
    var returnObj = {};
    returnObj.getItem = function (itemid) {
        var deferred = $q.defer();
        $http.get("https://jsonplaceholder.typicode.com/photos?id=" + itemid)
             .success(function (response) {
                     deferred.resolve(response);
             }, function (errorMessage) {
                 deferred.reject(errorMessage);
             });

        return deferred.promise;
    }
    return returnObj;
});