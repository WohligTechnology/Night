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
    .state('theme', {
        url: "/theme",
        templateUrl: "views/template.html",
        controller: 'ThemeCtrl'
    })
    .state('home', {
        url: "/home",
        templateUrl: "views/template.html",
        controller: 'HomeCtrl'
    })
    .state('navigation', {
        url: "/navigation",
        templateUrl: "views/template.html",
        controller: 'NavigationCtrl'
    })
    .state('login-signup', {
        url: "/login-signup",
        templateUrl: "views/template.html",
        controller: 'LoginSignupCtrl'
    })
    .state('notifications', {
        url: "/notifications",
        templateUrl: "views/template.html",
        controller: 'NotificationsCtrl'
    })

    .state('events', {
        url: "/events",
        templateUrl: "views/template.html",
        controller: 'EventsCtrl'
    })

    .state('blogs', {
        url: "/blogs",
        templateUrl: "views/template.html",
        controller: "BlogsCtrl"
    })

    .state('articles', {
        url: "/articles",
        templateUrl: "views/template.html",
        controller: "ArticlesCtrl"
    })
    .state('photogalleries', {
        url: "/photogalleries",
        templateUrl: "views/template.html",
        controller: "PhotoGalleriesCtrl"
    })

    .state('videogalleries', {
        url: "/videogalleries",
        templateUrl: "views/template.html",
        controller: "VideoGalleriesCtrl"
    })
    .state('contact', {
        url: "/contact",
        templateUrl: "views/template.html",
        controller: "ContactCtrl"
    })
    .state('search', {
        url: "/search",
        templateUrl: "views/template.html",
        controller: "SearchCtrl"
    })
    .state('audio-players', {
        url: "/audio-players",
        templateUrl: "views/template.html",
        controller: "AudioPlayersCtrl"
    })
    .state('intro-slider', {
        url: "/intro-slider",
        templateUrl: "views/template.html",
        controller: "IntroSliderCtrl"
    })
    .state('social-feeds', {
        url: "/social-feeds",
        templateUrl: "views/template.html",
        controller: "SocialFeedsCtrl"
    })
    .state('forms', {
        url: "/forms",
        templateUrl: "views/template.html",
        controller: 'FormsCtrl'
    })
    .state('users', {
        url: "/users",
        templateUrl: "views/template.html",
        controller: 'UsersCtrl'
    })


    ;

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
