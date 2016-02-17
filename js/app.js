// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    $stateProvider

    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "views/template.html",
        controller: 'DashboardCtrl'
    })
    .state('home', {
        url: "/home",
        templateUrl: "views/template.html",
        controller: 'HomeCtrl'
    })
    .state('forms', {
        url: "/forms",
        templateUrl: "views/template.html",
        controller: 'FormsCtrl'
    })
    .state('login-signup', {
        url: "/login-signup",
        templateUrl: "views/template.html",
        controller: 'LoginsignupCtrl'
    })
    .state('theme', {
        url: "/theme",
        templateUrl: "views/template.html",
        controller: 'ThemeCtrl'
    });

    $urlRouterProvider.otherwise("/dashboard");

});

firstapp.directive('autoHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            var addHeight = function() {
                $element.css("min-height", windowHeight);
            };
            addHeight();
        }
    };
});
firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if(!attrs.noloading)
            {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            }
            else
            {
                $($element).addClass("doneLoading");
            }
        }
    };
});
