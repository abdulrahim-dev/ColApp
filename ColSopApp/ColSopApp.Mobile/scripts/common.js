
/* Setup the Config from the default Options */
services.factory('$config', function () {
    return {
        /* App Version */
        version: '1.0.0',
        isApp: options.isApp,
        serviceURL: 'http://25.0.0.4:8026/api/',
        host: 'http://25.0.0.4:8026/',
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

