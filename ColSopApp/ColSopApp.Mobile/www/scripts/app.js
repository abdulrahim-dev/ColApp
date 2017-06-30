var controllers = angular.module('Co-App-Controllers', []);
var services = angular.module('Co-App-Services', []);
var directives = angular.module('Co-App-Directives', []);

var options = {
    baseURL: '',
    debug: true, // true for app build
    isApp: true,  //// true for app build
    db:null
};



angular.module('Co_APP', ['ionic', 'ngCordova', 'Co-App-Controllers', 'Co-App-Services', 'Co-App-Directives'])
    .run(function ($ionicPlatform, $rootScope, $cordovaSQLite) {
        
        /* Route Helpers when a Route is changed */
        $rootScope.$on("$stateChangeSuccess", function (event, current, previous) {
            
        });
        $rootScope.ready = true;

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //    cordova.plugins.Keyboard.disableScroll(true);

            //}
         
            //if (cordova.platformId === 'android') {
            //    //StatusBar.hide();
            //    StatusBar.backgroundColorByHexString("#ed1de3");
            //}
           
            // Give database creation code in device ready event. Otherwise it will throw error

           
            if (options.isApp) {
                if (cordova.platformId === 'android') {
                    // Works on android but not in iOS
                    options.db = $cordovaSQLite.openDB({ name: "ColAppDB.db", iosDatabaseLocation: 'default' });
                } else {
                    // Works on iOS 
                    options.db = window.sqlitePlugin.openDatabase({ name: "ColAppDB.db", location: 2, createFromLocation: 1 });
                }
                $cordovaSQLite.execute(options.db, "CREATE TABLE IF NOT EXISTS datas (key text,data text)");
            }
            
        });
    }).config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ionicConfigProvider) {
        $stateProvider
            .state('unauthorised', {
                url: '/app',
                abstract: true,
                //cache: false,
                templateUrl: 'views/unauthorised/menu/menu.html',
                controller: 'unauthorisedController',
                onEnter: function ($state, $auth) {
                    //if ($auth.hasAccess()) {
                    //    $state.go('authorised.itemlists');

                    //}
                }
            }).state('unauthorised.home', {
                url: '/home',
                //cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'views/unauthorised/home/home.html',
                        controller: 'unauthorisedHomeController'
                    }
                }
            }).state('authorised', {
                url: '/app',
                abstract: true,
                //cache: false,
                templateUrl: 'views/authorised/menu/menu.html',
                controller: 'authorisedController',
                onEnter: function ($state, $auth) {
                    //if (!$auth.hasAccess()) {
                    //    $state.go('unauthorised.home');

                    //}
                }
            }).state('authorised.itemlists', {
                url: '/itemlists',
                //cache: false,
                views: {
                    'innerMenuContent': {
                        templateUrl: 'views/authorised/home/home.html',
                        controller: 'authorisedItemlistsController'
                    }
                }
               
            }).state('authorised.item', {
                url: '/item/:itemId',
                //cache: false,
                views: {
                    'innerMenuContent': {
                        templateUrl: 'views/authorised/item/item.html',
                        controller: 'authoriseditemController'
                    }
                }

            }).state('authorised.dentists', {
                url: '/dentists',
                //cache: false,
                views: {
                    'innerMenuContent': {
                        templateUrl: 'views/authorised/dentists/dentists.html',
                        controller: 'authorisedDentistsController'
                    }
                }

            }).state('authorised.dentistDetails', {
                url: '/dentistdetails/:dentistId',
                //cache: false,
                views: {
                    'innerMenuContent': {
                        templateUrl: 'views/authorised/dentistDetails/dentistDetails.html',
                        controller: 'authorisedDentistDetailsController'
                    }
                }

            }).state('authorised.addDentist', {
                url: '/adddentist',
                //cache: false,
                views: {
                    'innerMenuContent': {
                        templateUrl: 'views/authorised/addDentist/addDentist.html',
                        controller: 'authorisedAddDentistController'
                    }
                }

            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');

        /* Template Permissions */
        //$sceDelegateProvider.resourceUrlWhitelist([
        //    // Allow same origin resource loads.
        //    'self',
        //    // Allow loading from outer templates domain.
        //    'file:///android_asset/www/**'
        //]);

        //Remove back button from all headers
        $ionicConfigProvider.platform.ios.navBar.alignTitle('left');
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
    });

/* Setup the Config from the default Options */
services.factory('$config', function () {
    return {
        /* App Version */
        version: '1.0.0',
        isApp: options.isApp,
        serviceURL: options.debug ? 'http://rahimka91-001-site1.itempurl.com/api/' : 'http://25.0.0.4:8026/api/',
        host: options.debug ? 'http://rahimka91-001-site1.itempurl.com/' : 'http://25.0.0.4:8026/',

        /* Debugging and Logging */
        debug: options.debug,
        log: function () {
            this.debug && console.log.apply(console, arguments);
        }
    };
});

/**
 * Local Storage
 * 
 * Local Storage management system
 * 
 * @param {object} $window  DOM Window
 */
services.service('$storage', ['$window', '$config',
    function ($window, $config) {
        /* Default Methods */
        var $storage = {
            save: function () { },
            load: function () {
                return false;
            },
            clear: function () { },
            reset: function () { },
            expired: function (time) {
                var timeNow = (new Date()).getTime();
                if ((timeNow - time) > $config.expire) {
                    return true;
                }

                return false;
            }
        };

        /* Check for Local Storage */
        if (typeof $window.localStorage !== 'undefined') {
            /**
             * Save
             * 
             * Save data to Local Storage
             * 
             * @param {string} id   Identifier for the data
             * @param {mixed} data  Data to store
             */
            $storage.save = function (id, data) {
                /* Store data as a JSON String */
                try {
                    $window.localStorage[id] = JSON.stringify(data);
                } catch (e) {
                }
            };

            /**
             * Load
             * 
             * Load data from Local Storage
             * 
             * @param {string} id  Identifier for the data
             * @returns {mixed}
             */
            $storage.load = function (id) {
                /* Get data by id */
                var data = $window.localStorage[id];

                if (data === null || !data) {
                    /* No data found */
                    return null;
                }

                /* Convert data from a JSON String */
                return JSON.parse(data);
            };

            /**
             * Clear
             * 
             * Clear data from Local Storage
             * 
             * @param {string} id  Identifier for the data
             */
            $storage.clear = function (id) {
                try {
                    /* Try set data to null */
                    $window.localStorage[id] = null;
                } catch (e) { }
            };

            /**
             * Reset
             * 
             * Reset the Local Storage
             */
            $storage.reset = function () {
                /* Clear everything from Local Storage */
                $window.localStorage.clear();
            };
        }

        /* Return the Methods */
        return $storage;
    }
]);



services.service('$auth', ['$storage', '$q', '$config',
    function ($storage,$q, $config) {
        var $auth = {
            get: function () {
                return $storage.load('auth');
            },
            set: function (auth) {
                $storage.save('auth', auth);
            },
            hasAccess: function () {
                if ($auth.get()) {
                    return true;
                }

                return false;
            },
            remembered: function () {
                var auth = $auth.get();
                if (auth && auth.remember === true) {
                    return true;
                }

                return false;
            },
            expired: function () {
                var auth = $auth.get();
                var time = (new Date()).getTime();
                if (auth) {
                    if (auth.remember === true) {
                        auth.expire = (new Date()).getTime() + $config.userExpire;
                        $auth.set(auth);

                        return false;
                    } else if (auth.expire > time) {
                        return false;
                    }
                }

                return true;
            },
            logout: function () {
                var deferred = $q.defer();
                $storage.clear('auth');
                return deferred.promise;
            },
            save: function (userName, data, remember) {
                //******Abdul
                if (data.access_token && data.userName) {
                    var auth = $auth.get() || {};

                    auth.access_token = data.access_token;
                    auth.token_type = data.token_type;
                    auth.expires_in = data.expires_in;
                    auth.userName = userName;
                    auth.remember = remember || false;
                    //auth.expire = (new Date()).getTime() + $config.userExpire;
                    auth.issued = data.issued;
                    auth.expires = data.expires;

                    $storage.save('auth', auth);

                    //$storage.save('app', {
                    //    contents: data || {}
                    //});

                    return true;
                }

                return false;
            },
            reset: function () {
                $storage.clear('auth');
            },
            //token: function (time) {
            //    /**
            //     * create token using username+privatekey+currenttime[02:28 PM] Abdul Rahim: 
            //     * send token ,currenttime for create the token and public key in next request as header values
            //     */
            //    var auth = $auth.get();
            //    if (auth) {
            //        return $crypt.sha1(auth.username + auth.privateKey + time);
            //    }

            //    return false;
            //},
            headers: function () {
                var auth = $auth.get();
                var time = (new Date().getTime());

                var headers = {
                    token: $auth.token(time),
                    time: time,
                    username: auth.username,
                    publicKey: auth.publicKey
                };

                return headers;
            }
        };

        return $auth;
    }
]);


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

controllers.controller('authorisedCameraController', function ($scope, $cordovaGeolocation) {

    
});

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
controllers.controller('authorisedItemlistsController', function ($scope, $authorisedlistingService) {
    $authorisedlistingService.getList().then(function (response) {
        $scope.items = response;
    }, function (error) {
        console.log(error);
    });
});
services.factory('$authorisedlistingService', function ($q, $config, $auth, $http) {
    var returnObj = {};
    returnObj.getList = function () {
        var deferred = $q.defer();
        $http.get("https://jsonplaceholder.typicode.com/photos?albumId=1")
             .success(function (response) {
                     deferred.resolve(response);
             }, function (errorMessage) {
                 deferred.reject(errorMessage);
             });

        return deferred.promise;
    }
    return returnObj;
});
controllers.controller('authoriseditemController', function ($scope, $authoriseditemService, $stateParams) {
    $authoriseditemService.getItem($stateParams.itemId).then(function (response) {
        $scope.item = response;
    }, function (error) {
        console.log(error);
    });
});
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
controllers.controller('authorisedController', function ($scope, $auth, $state, $location) {
    $scope.logout = function () {
        $auth.logout();
        $state.go('unauthorised.home');
    };
   
});


/*
 * Directive for add 'active' class for the left menu items
 * 
 */
directives.directive('activePageHighlight', function ($rootScope, $state) {
    return function($scope, $element, $attr) {
        function checkUiSref() {
            if ($state.is($attr['uiSref'])) {
                $element.addClass('active-page-highlight');
            } else {
                $element.removeClass('active-page-highlight');
            }
        }

        checkUiSref();

        $rootScope.$on('$stateChangeSuccess', function () {
            checkUiSref();
        });
    };
}).directive("preImg", function () {// this directive is used to display a loader for images, Once images loaded from server, it will hide the loading spinner
    return {
        restrict: "E",
        transclude: true,
        scope: {
            ratio: "@",
            helperClass: "@"
        },
        controller: ["$scope", function ($scope) {
            $scope.loaded = false,
            this.hideSpinner = function () {
                $scope.$apply(function() {
                    $scope.loaded = true
                });
            }
        }
        ],
        templateUrl: "views/authorised/menu/pre-img.html"
    }
}).directive("spinnerOnLoad", function () {  // this show the loader image, we need preimage directive for this.
    return {
        restrict: "A",
        require: "^preImg",
        scope: {
            ngSrc: "@"
        },
        link: function (scope, element, attrs, controller) {
            element.on("load", function () {
                controller.hideSpinner();
            });
        }
    }
});
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
controllers.controller('unauthorisedController', function ($scope, $state, $auth) {
   
});

