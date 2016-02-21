angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.tinymce','dndLists'])

.controller('AllAppsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("allapps");
  $scope.menutitle = NavigationService.makeactive("All Apps");
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

  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("dashboard");
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
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

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.lists = [
      {
        "image": "img/t1.jpg"
      },
      {
        "image": "img/t2.jpg"
      },
      {
        "image": "img/t3.jpg"
      },
      {
        "image": "img/t1.jpg"
      },
      {
        "image": "img/t2.jpg"
      },
      {
        "image": "img/t3.jpg"
      },
      {
        "image": "img/t1.jpg"
      },
      {
        "image": "img/t2.jpg"
      },
      {
        "image": "img/t3.jpg"
      }
    ];

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/image-info.html',
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

.controller('NavigationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigation");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('NavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
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

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("notifications");
  $scope.menutitle = NavigationService.makeactive("Notifications");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.animationsEnabled = true;

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/notificationdetail.html',
      controller: 'NotificationsCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('EventsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("events");
  $scope.menutitle = NavigationService.makeactive("Events");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('EventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("eventdetail");
  $scope.menutitle = NavigationService.makeactive("Events");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };



  $scope.OpenVideo = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/Video-upload.html',
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
  $scope.ImageEdit = function(size) {

    var modalInstances = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/image-info.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstances.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('BlogsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("blogs");
  $scope.menutitle = NavigationService.makeactive("Blogs");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

})

.controller('BlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("blogdetail");
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

.controller('ArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("articledetail");
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

.controller('PhotoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("photogallerydetail");
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


.controller('VideoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("videogallerydetail");
  $scope.menutitle = NavigationService.makeactive("Video Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.VideoEdit = function(size) {

    var modalInstances = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/video-edit.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstances.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contact");
  $scope.menutitle = NavigationService.makeactive("Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('ContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contactdetail");
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

.controller('AudioGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("audiogalleries");
  $scope.menutitle = NavigationService.makeactive("Audio Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();



})

.controller('AudioGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("audiogallerydetail");
  $scope.menutitle = NavigationService.makeactive("Audio Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.AudioEdit = function(size) {

    var modalInstances = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/audio-upload.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstances.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
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

.controller('FormDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("formdetail");
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

.controller('UserDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("userdetail");
    $scope.menutitle = NavigationService.makeactive("Users");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('ConfigurationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("configuration");
    $scope.menutitle = NavigationService.makeactive("Configuration");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    var navigation = [{
      name: "Theme",
    }, {
      name: "Home",
    }, {
      name: "Notifications",
    }, {
      name: "Events",
    }, {
      name: "Blogs",
    }, {
      name: "Articles",
    }, {
      name: "Photo Galleries",
    }, {
      name: "Video Galleries",
    }, {
      name: "Contact",
    }, {
      name: "Audio Galleries",
    }, {
      name: "Users",
    }];
  })

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $scope.searchBar = false;
  $scope.showBar = function() {
    $scope.searchBar = !$scope.searchBar;
    console.log($scope.showBar);
  };
});
