// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // for http request with session
  $httpProvider.defaults.withCredentials = true;

  $stateProvider

    .state('allapps', {
    url: "/",
    templateUrl: "views/template.html",
    controller: 'AllAppsCtrl'
  })

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

  .state('navigationdetail', {
    url: "/navigation/:id",
    templateUrl: "views/template.html",
    controller: 'NavigationDetailCtrl'
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

  .state('eventdetail', {
    url: "/event/:id",
    templateUrl: "views/template.html",
    controller: 'EventDetailCtrl'
  })

  .state('blogs', {
    url: "/blogs",
    templateUrl: "views/template.html",
    controller: "BlogsCtrl"
  })

  .state('blogdetail', {
    url: "/blog/:id",
    templateUrl: "views/template.html",
    controller: "BlogDetailCtrl"
  })

  .state('articles', {
    url: "/articles",
    templateUrl: "views/template.html",
    controller: "ArticlesCtrl"
  })

  .state('articledetail', {
    url: "/article/:id",
    templateUrl: "views/template.html",
    controller: "ArticleDetailCtrl"
  })

  .state('photo-galleries', {
    url: "/photogalleries",
    templateUrl: "views/template.html",
    controller: "PhotoGalleriesCtrl"
  })

  .state('photo-gallerydetail', {
    url: "/photogalleries/:id",
    templateUrl: "views/template.html",
    controller: "PhotoGalleryDetailCtrl"
  })

  .state('video-galleries', {
    url: "/videogalleries",
    templateUrl: "views/template.html",
    controller: "VideoGalleriesCtrl"
  })
  .state('video-gallerydetail', {
    url: "/videogallery/:id",
    templateUrl: "views/template.html",
    controller: "VideoGalleryDetailCtrl"
  })

  .state('contact', {
    url: "/contact",
    templateUrl: "views/template.html",
    controller: "ContactCtrl"
  })

  .state('contactdetail', {
    url: "/contact/:id",
    templateUrl: "views/template.html",
    controller: "ContactDetailCtrl"
  })

  .state('search', {
    url: "/search",
    templateUrl: "views/template.html",
    controller: "SearchCtrl"
  })

  .state('audio-galleries', {
    url: "/audio-galleries",
    templateUrl: "views/template.html",
    controller: "AudioGalleriesCtrl"
  })
  .state('audio-gallerydetail', {
    url: "/audio-gallery/:id",
    templateUrl: "views/template.html",
    controller: "AudioGalleryDetailCtrl"
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
  .state('formdetail', {
    url: "/form/:id",
    templateUrl: "views/template.html",
    controller: 'FormDetailCtrl'
  })

  .state('users', {
    url: "/users",
    templateUrl: "views/template.html",
    controller: 'UsersCtrl'
  })
  .state('userdetail', {
    url: "/user/:id",
    templateUrl: "views/template.html",
    controller: 'UserDetailCtrl'
  })
  .state('configuration', {
    url: "/configuration",
    templateUrl: "views/template.html",
    controller: 'ConfigurationCtrl'
  })
  ;

  $urlRouterProvider.otherwise("/");

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
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});
