services.factory('$authorisedDentistProfileService', function ($q, $config, $auth, $http) {
    var returnObj = {};
    returnObj.addDentist = function (dentistProfileDto) {
        var deferred = $q.defer();

        $http.post($config.serviceURL + 'DentistProfile/PostDentistProfile', dentistProfileDto)
            .then(function (result) {
                deferred.resolve(result);
            },
                    function (response) {
                        deferred.reject(response);
                    });

        return deferred.promise;
    }
    return returnObj;
});