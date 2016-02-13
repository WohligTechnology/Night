angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("dashboard");
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // $scope.mySlides = [
  //   'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
  //   'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
  //   'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
  //   'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
  // ];

//   $scope.apps={
//     [
//     id="";
//
//   ],
// }
})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

;
