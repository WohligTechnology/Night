angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout,  $uibModal) {
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
})
.controller('NewappCtrl', function($scope, TemplateService, NavigationService, $timeout,  $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("new-app");
  $scope.menutitle = NavigationService.makeactive("New app");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

;
