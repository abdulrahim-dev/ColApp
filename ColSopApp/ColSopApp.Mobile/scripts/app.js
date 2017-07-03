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
    }).config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ionicConfigProvider, $httpProvider) {
        $stateProvider
            .state('unauthorised', {
                url: '/app',
                abstract: true,
                //cache: false,
                templateUrl: 'views/unauthorised/menu/menu.html',
                controller: 'unauthorisedController',
                onEnter: function ($state, $auth) {
                    if ($auth.hasAccess()) {
                        $state.go('authorised.itemlists');

                    }
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
                    if (!$auth.hasAccess()) {
                        $state.go('unauthorised.home');

                    }
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
        
        $httpProvider.interceptors.push('authInterceptorService');
    });