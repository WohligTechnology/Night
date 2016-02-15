angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout,  $uibModal, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("dashboard");
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // var modalInstance = $uibModal.open({
  //   animation: true,
  //   templateUrl: 'views/modal/new-app.html',
  //   controller: 'NewappCtrl',
  //   scope: $scope,
  //
  // })
  $scope.animationsEnabled = true;
  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-app.html',
      controller: 'NewappCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})


.controller('NewappCtrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})
.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

;
