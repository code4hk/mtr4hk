'use strict';


// Declare app level module which depends on filters, and services
angular.module('mtr4hk', [
    'ngRoute',
    'ngAnimate',
    'jm.i18next',
    'ui.bootstrap',
    'leaflet-directive',
    'vr.directives.slider'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
        });
        $routeProvider.when('/xrail', {
            templateUrl: 'templates/xrail.html',
            controller: 'XRailCtrl'
        })
            .when('/finance', {
                templateUrl: 'templates/finance.html',
                controller: 'FinanceCtrl'
            })
            .when('/price', {
                templateUrl: 'templates/price.html',
                controller: 'PriceCtrl'
            })
            .when('/stability', {
                templateUrl: 'templates/stability.html',
                controller: 'StabilityCtrl'
            })
            .when('/capacity', {
                templateUrl: 'templates/capacity.html',
                controller: 'CapacityCtrl'
            })
            .when('/org', {
                templateUrl: 'templates/org.html',
                controller: 'OrgCtrl'
            })
            .when('/api', {
                templateUrl: 'templates/api.html',
                controller: 'ApiCtrl'
            })
            .when('/others', {
                templateUrl: 'templates/others.html',
                controller: 'OthersCtrl'
            })
            .when('/xrail-progress', {
                templateUrl: 'templates/xrail-progress.html',
                controller: 'XRailProgressCtrl'
            })
        $routeProvider.otherwise({
            redirectTo: '/main'
        });
    }
])
    .filter('t', ['$i18next',
        function(i18next) {
            return function(input) {
                return i18next(input);
            }
        }
    ]);


angular.module('jm.i18next')
    .config(['$i18nextProvider',
        function($i18nextProvider) {
            $i18nextProvider.options = {
                useCookie: false,
                useLocalStorage: false,
                load: 'current',
                fallbackLng: 'zh-TW',
                resGetPath: '../locales/__lng__/__ns__.json',
                ns: {
                    namespaces: ['site_main'],
                    defaultNs: 'site_main'
                }
            };
        }
    ]);

angular.module('mtr4hk')
    .factory('_', function() {
        return window._;
    })
    .controller('MainCtrl', ['$scope',
        function($scope) {

        }
    ])

.controller('XRailCtrl', ['$scope',
    function($scope) {

    }
])

.controller('FinanceCtrl', ['$scope',
    function($scope) {

    }
])

.controller('XRailProgressCtrl', ['$scope', '$timeout', '$http', '_',
    function($scope, $timeout, $http, _) {
        console.log('XRailProgressCtrl');
        // var app = angular.module("demoapp", ['leaflet-directive']);
        //      app.controller("DemoController", [ "$scope", function($scope) {
        //          // Nothing here!
        //      }]);

        $scope.westKowloon = {
            lat: 22.3534757,
            lng: 114.25028460,
            zoom: 12
        };

        var promise = Q($http.get('https://spreadsheets.google.com/feeds/list/1qocahq0eRV-agNYccdofO2Sh35fx3ccKEYI5XniM7-s/0/public/values?alt=json')).then(function(data) {
            return data.data.feed.entry;
        });


        var timeWindows = {
            "0": { //others
                start: -1,
                end: -1
            },
            "1": {
                start: 20100101,
                end: 20100630
            },
            "2": {
                start: 20100701,
                end: 20101231
            },
            "3": {
                start: 20110101,
                end: 20110630
            },
            "4": {
                start: 20110701,
                end: 20111231
            },
            "5": {
                start: 20120101,
                end: 20120630
            },
            "6": {
                start: 20120701,
                end: 20121230
            },
            "7": {
                start: 20130101,
                end: 20130630
            },
            "8": {
                start: 20130701,
                end: 20111231
            }
        };

        /**
         *  Input time is MM/DD/YYYY
         **/
        $scope.determineTimeWindow = function(timestamp) {

            _.each(timeWindows, function(timeWindow, key) {
                timeWindow.key = key;
                return timeWindow;
            });



            var windowFound = _.find(timeWindows, function(timeWindow) {
                var windowStartTs = moment(timeWindow.start, "YYYYMMDD").format("X");
                var windowEndTs = moment(timeWindow.end, "YYYYMMDD").format("X");
                return timestamp >= windowStartTs && timestamp < windowEndTs;
            })
            return windowFound;
        }

$scope.railWayGeoJSON={};

$scope.railWayGeoJSON.style=
  {
                    // fillColor: getColor($scope.countries[feature.id]),
                    weight: 8,
                    opacity: 1,
                    color: '#f86767',
                    // dashArray: '3',
                    fillOpacity: 0.7
                };

        $scope.railWayGeoJSON.data=
{"features":[{"geometry":{"coordinates":[114.056533,22.538392],"type":"Point"},"properties":{"description":"https://zh.wikipedia.org/zh-hk/%E7%A6%8F%E7%94%B0%E7%AB%99","id":"marker-hvkxcpyl0","marker-color":"#1087bf","marker-size":"medium","marker-symbol":"","title":"福田站"},"type":"Feature"},{"geometry":{"coordinates":[114.07213769999998,22.4282899],"type":"Point"},"properties":{"description":"","id":"marker-hvkxfuuw1","marker-color":"#1087bf","marker-size":"medium","marker-symbol":"","title":"石崗"},"type":"Feature"},{"geometry":{"coordinates":[[114.05645370483398,22.537768878943577],[114.0574836730957,22.50510349164863],[114.07190322875977,22.426103847270774],[114.11833763122559,22.37928564733928],[114.12357330322266,22.36484024166245],[114.16434288024902,22.31601638597883],[114.16468620300293,22.30474080695656]],"type":"LineString"},"properties":{"description":"","id":"marker-hvkxhh3h3","stroke":"#f86767","stroke-opacity":1,"stroke-width":8,"title":"Railway"},"type":"Feature"},{"geometry":{"coordinates":[114.16425704956055,22.304026126900116],"type":"Point"},"properties":{"description":"","id":"marker-hvkxptch7","marker-color":"#1087bf","marker-size":"medium","marker-symbol":"","title":"西九龍總站"},"type":"Feature"}],"id":"vincentlaucy.ib05kcn9","type":"FeatureCollection"};

        promise.then(function(entries) {
            console.log(entries);
            var events = entries.map(function(entry) {
                console.log(entry);

                var time = entry.gsx$datadatemmddyyyy.$t;
                var timestamp = moment(time, "MM/DD/YYYY").format('X');
                var windowFound = $scope.determineTimeWindow(timestamp);

                return {
                    id : entry.id.$t,
                    contract: entry.gsx$modulecontract.$t,
                    location: entry.gsx$location.$t,
                    lat: entry.gsx$lat.$t,
                    lng: entry.gsx$lng.$t,
                    message: entry.gsx$event.$t,
                    time: time,
                    timeWindow: windowFound ? windowFound.key : 0
                }
            })
            console.log(events);

            $scope.events = events;
            return events;
        }).fail(function(err) {
            console.log(err);
        });
        $scope.value = 1288323623;

        $scope.$watch('value', function(newVal) {
            var timeWindow = $scope.determineTimeWindow(newVal);
            $scope.chosenTimeWindow = timeWindow ? timeWindow.key : 0;
        })

        //pre sort into buckets by time window

        $scope.markerBuckets = {};
        _.each(timeWindows, function(timeWindow, key) {
            $scope.markerBuckets[key] = {};
        })
        $scope.$watch('events', function(newVal) {
            _.each($scope.events, function(event) {

                var checkIfShowMarker = function(marker) {
                    if(!marker.lat || !marker.lng){
                        return false;
                    }
                    if(Math.abs(marker.lat) -22 > 10 ||  Math.abs(marker.lng) -114 > 10){
                        return false;//too far away, sth wrong
                    }
                    return true;
                };

                if (event.location !== 'N/A') {
                    var marker = {
                        lat: event.lat !== "" ? parseFloat(event.lat) : 0,
                        lng: event.lng !== "" ? parseFloat(event.lng) : 0,
                        message: event.message,
                        focus: true,
                        draggable: false
                    };
                    //TODO use eng location name as key
                    var eventKey= event.id.substring(event.id.lastIndexOf('/')+1);
                    if(checkIfShowMarker(marker)){
                        $scope.markerBuckets[event.timeWindow][eventKey] = marker;
                    }

                } else {
                    //visualize in info bucket
                }


                console.log($scope.markerBuckets);

            });

        });

        $scope.displayedMarkers = {};
        $scope.$watch('chosenTimeWindow', function(newTimeWindow) {
            console.log('update displayed markers to ' + newTimeWindow);
            $scope.displayedMarkers = $scope.markerBuckets[newTimeWindow];
            console.log($scope.displayedMarkers);
        });


        $scope.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://b.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png',
                    layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '© OpenStreetMap contributors',
                        continuousWorld: true
                    }
                }
            }
        }
        //lazy this module?



    }
])

.controller('OrgCtrl', ['$scope',
    function($scope) {

    }
])

.controller('PriceCtrl', ['$scope',
    function($scope) {

    }
])
    .controller('StabilityCtrl', ['$scope',
        function($scope) {

        }
    ])
    .controller('CapacityCtrl', ['$scope', '$http', '$timeout', '$location',
        function($scope, $http, $timeout, $location) {
            $scope.initLoadFactorChart = function() {
                $http.get('http://mtr-api.dev.code4.hk/loadfactor').then(function(data) {
                    $scope.loadfactorData = data.data;

                })
            };
            // $scope.showWarning = (type === 'danger' || type === 'warning');

            // $scope.dynamic = value;
            // $scope.type = type;

            var _init = function() {
                $scope.initLoadFactorChart();
                $scope.mode = '4Mode';


                $timeout(function() {
                    console.log('timeout');
                    $scope.mode = '6Mode';
                }, 3000)
            };
            _init();
            $scope.toggleMode = function(mode) {
                $scope.mode = mode;
            };



        }
    ])
    .controller('railCapCtrl', ['$scope',
        function($scope) {
            $scope.loadFactor = 0;

            function _init() {
                $scope.railwayClass = _checkRailwayClass($scope.aRail.railway);
            };
            _init();


            function _checkRailwayClass(railway) {

                var railwayMap = {
                    "東鐵綫": "railway-east",
                    "西鐵綫": "railway-west",
                    "馬鞍山綫": "railway-maonshan",
                    "將軍澳綫": "railway-tko",
                    "港島綫": "railway-hki",
                    "觀塘綫": "railway-kwuntong",
                    "荃灣綫": "railway-tw",
                    "迪士尼綫": "railway-disney"
                }
                return railwayMap[railway];

            };

            function _checkType(value) {

                var type;

                if (value < 0.8) {
                    type = 'success';
                } else if (value < 0.9) {
                    type = 'warning';
                } else if (value > 1) {
                    type = 'danger';
                } else {
                    type = 'danger';
                }

                return type;
            };

            $scope.$watch('mode', function(newVal) {
                if (newVal === '4Mode') {
                    $scope.loadFactor = $scope.aRail.currentLoadFactor4;
                    $scope.loadType = _checkType($scope.aRail.currentLoadFactor4);

                    // $scope.capType = _checkType($scope.aRail.currentCap/$scope.aRail.maxCap);
                } else {
                    $scope.loadFactor = $scope.aRail.currentLoadFactor6;
                    $scope.loadType = _checkType($scope.aRail.currentLoadFactor6);
                }

            })

            // value = aRail.h * 100; designCap = aRail.designCap; actualCap = aRail.c
        }
    ])

.controller('ApiCtrl', ['$scope',
    function($scope) {}
])
    .controller('OthersCtrl', ['$scope',
        function($scope) {

        }
    ]);
