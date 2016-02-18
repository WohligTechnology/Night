angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("dashboard");
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.sidemenu = "";
  $scope.animationsEnabled = true;
  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-app.html',
      controller: 'NewappCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

.controller('ThemeCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("theme");
  $scope.menutitle = NavigationService.makeactive("Theme");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.animationsEnabled = true;
  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-app.html',
      controller: 'NewappCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

.controller('FormsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("forms");
  $scope.menutitle = NavigationService.makeactive("Forms");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('NavigationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("navigation");
  $scope.menutitle = NavigationService.makeactive("Navigation");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('LoginSignupCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("login-signup");
  $scope.menutitle = NavigationService.makeactive("Login & Signup");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("nofications");
  $scope.menutitle = NavigationService.makeactive("Nofications");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('EventsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("events");
  $scope.menutitle = NavigationService.makeactive("Events");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('BlogsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("blogs");
  $scope.menutitle = NavigationService.makeactive("Blogs");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('ArticlesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("articles");
  $scope.menutitle = NavigationService.makeactive("Articles");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('PhotoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("photogalleries");
  $scope.menutitle = NavigationService.makeactive("Photo Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('VideoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("videogalleries");
  $scope.menutitle = NavigationService.makeactive("Video Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})


.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contact");
  $scope.menutitle = NavigationService.makeactive("Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})


.controller('SearchCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("search");
  $scope.menutitle = NavigationService.makeactive("Search");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('AudioPlayersCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("audioplayers");
  $scope.menutitle = NavigationService.makeactive("Audio Players");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})


.controller('IntroSliderCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("introslider");
  $scope.menutitle = NavigationService.makeactive("Intro Slider");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('SocialFeedsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("socialfeeds");
  $scope.menutitle = NavigationService.makeactive("Social Feeds");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})


.controller('FormsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("forms");
  $scope.menutitle = NavigationService.makeactive("Forms");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('UsersCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("users");
  $scope.menutitle = NavigationService.makeactive("Users");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('NewappCtrl', function($scope, TemplateService) {
  $scope.template = TemplateService;

})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

;
