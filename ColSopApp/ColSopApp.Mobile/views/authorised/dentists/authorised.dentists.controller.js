controllers.controller('authorisedDentistsController', function ($scope, $authorisedDentistService, $cordovaSQLite, $cordovaNetwork) {
    $scope.$on('$ionicView.enter', function () {

        if (!options.isApp||$cordovaNetwork.isOnline()) {

            $authorisedDentistService.getList().then(function(response) {

                $scope.users = response;

                $scope.users[0].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBepnW9wIbQ_1FQyTNnofILX2v9KTTm6iYXNs6aj2O0eggrXHY";
                $scope.users[1].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQueP_WHk-UaaDNEZN0tXU8zlVTvMd2RSfLjxMJNI8x_m9kCsafew";
                $scope.users[2].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsV2ldn-Sg2vbYrpkz4IY5SMHhU2U7QJA3oZcU1kBHHv6iw1kF";
                $scope.users[3].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAMnwyeU3b78nw5I4zPt3tdggtiRSEIikft3hDGg6JYVrNjhWf";
                $scope.users[4].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqW-3ofnRb9lb24Giy0npjncAEO2MTMtNkCT-eimKG3Rz3uLQa";

                $scope.users[9].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1pwhz99rKXxyiwqRegC7b3tUatP0aCy4gtjimd3jbWQnXu1V";
                $scope.users[7].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FvmCVAZTMMuyQ97z37jNmRhRO21rJuqO2bB_rhPw_CEr0p_XTQ";
                $scope.users[6].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lIEbR4XTfktZPyeTP0W2mv25FXlZY15ChH9GyNM9UvzUCRrm";
                $scope.users[5].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEJtPOiQdDtPtlWEPjcJr3ZPKsGWw_mi7xNkSf4z0ezovzqQ9kQ";
                $scope.users[8].profilePhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMTYUt_nB2FrK0MAOzCUZ1zPp_tDBt3cwZPcOVOXGcYYiQwbi";

                /**
              * ***********sample for pull to refresh functionality
              */
                $scope.pullToRefresh = [];
                $scope.pullToRefresh.push(response[9]);
                $scope.pullToRefresh.push(response[8]);
                $scope.pullToRefresh.push(response[7]);
                $scope.users.splice(9, 1);
                $scope.users.splice(8, 1);
                $scope.users.splice(7, 1);
                
                var query = "INSERT INTO datas (key,data) VALUES (?,?)";
                $cordovaSQLite.execute(options.db, query, ['dentistsList',$scope.users]).then(function (res) {
                    console.log("INSERT ID -> " + res.insertId);
                }, function (err) {
                    console.error(err);
                });

            }, function(error) {
                console.log(error);
            });
        } else {
            var query = "SELECT data FROM datas where key='dentistsList'";
            console.log("Internet is not available");
            $cordovaSQLite.execute(options.db, query).then(function (res) {
                $scope.users = res;
            }, function (err) {
                console.error(err);
            });
        }
    });

    /**
      * pull to refresh method
      * @returns {} list of users 
      */
    $scope.getNewData = function () {
        $scope.users = $scope.pullToRefresh.concat($scope.users);
        $scope.$broadcast("scroll.refreshComplete");
    }
});