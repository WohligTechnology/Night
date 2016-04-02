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

    .state('enquiry', {
        url: "/enquiry",
        templateUrl: "views/template-sidemenu.html",
        controller: 'EnquiryCtrl'
    })
    .state('enquirydetail', {
        url: "/enquirydetail",
        templateUrl: "views/template-sidemenu.html",
        controller: 'EnquiryDetailCtrl'
    })

    .state('theme', {
        url: "/theme",
        templateUrl: "views/template-sidemenu.html",
        controller: 'ThemeCtrl'
    })

    .state('home', {
        url: "/home",
        templateUrl: "views/template-sidemenu.html",
        controller: 'HomeCtrl'
    })

    .state('navigation', {
        url: "/navigation",
        templateUrl: "views/template-sidemenu.html",
        controller: 'NavigationCtrl'
    })

    .state('navigationdetail', {
        url: "/navigation/:id",
        templateUrl: "views/template.html",
        controller: 'NavigationDetailCtrl'
    })

    .state('editnavigationdetail', {
        url: "/editnavigation/:id",
        templateUrl: "views/template.html",
        controller: 'EditNavigationDetailCtrl'
    })

    .state('login-signup', {
        url: "/login-signup",
        templateUrl: "views/template-sidemenu.html",
        controller: 'LoginSignupCtrl'
    })

    .state('notifications', {
        url: "/notifications",
        templateUrl: "views/template-sidemenu.html",
        controller: 'NotificationsCtrl'
    })

    .state('events', {
        url: "/events",
        templateUrl: "views/template-sidemenu.html",
        controller: 'EventsCtrl'
    })

    .state('eventdetail', {
            url: "/event/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: 'EventDetailCtrl'
        })
        .state('editeventdetail', {
            url: "/editevent/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: 'EditEventDetailCtrl'
        })

    .state('blogs', {
        url: "/blogs",
        templateUrl: "views/template-sidemenu.html",
        controller: "BlogsCtrl"
    })

    .state('blogdetail', {
        url: "/blog/:id",
        templateUrl: "views/template-sidemenu.html",
        controller: "BlogDetailCtrl"
    })

    .state('editblogdetail', {
        url: "/editblog/:id",
        templateUrl: "views/template-sidemenu.html",
        controller: "EditBlogDetailCtrl"
    })


    .state('articles', {
        url: "/articles",
        templateUrl: "views/template-sidemenu.html",
        controller: "ArticlesCtrl"
    })

    .state('articledetail', {
        url: "/article/:id",
        templateUrl: "views/template-sidemenu.html",
        controller: "ArticleDetailCtrl"
    })

    .state('editarticledetail', {
        url: "/editarticle/:id",
        templateUrl: "views/template-sidemenu.html",
        controller: "EditArticleDetailCtrl"
    })

    .state('photo-galleries', {
        url: "/photogalleries",
        templateUrl: "views/template-sidemenu.html",
        controller: "PhotoGalleriesCtrl"
    })

    .state('photo-gallerydetail', {
        url: "/photogalleries/:id",
        templateUrl: "views/template-sidemenu.html",
        controller: "PhotoGalleryDetailCtrl"
    })

    .state('video-galleries', {
            url: "/videogalleries",
            templateUrl: "views/template-sidemenu.html",
            controller: "VideoGalleriesCtrl"
        })
        .state('video-gallerydetail', {
            url: "/videogallery/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: "VideoGalleryDetailCtrl"
        })
        .state('editvideo-gallerydetail', {
            url: "/editvideogallery/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: "EditVideoGalleryDetailCtrl"
        })

    .state('contact', {
        url: "/contact",
        templateUrl: "views/template-sidemenu.html",
        controller: "ContactCtrl"
    })

    .state('contactdetail', {
            url: "/contact/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: "ContactDetailCtrl"
        })
        .state('editcontactdetail', {
            url: "/editcontact/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: "EditContactDetailCtrl"
        })

    .state('search', {
        url: "/search",
        templateUrl: "views/template.html",
        controller: "SearchCtrl"
    })

    .state('audio-galleries', {
            url: "/audio-galleries",
            templateUrl: "views/template-sidemenu.html",
            controller: "AudioGalleriesCtrl"
        })
        .state('audio-gallerydetail', {
            url: "/audio-gallery/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: "AudioGalleryDetailCtrl"
        })
        .state('editaudio-gallerydetail', {
            url: "/editaudiogallery/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: "EditAudioGalleryDetailCtrl"
        })

    .state('intro-slider', {
        url: "/intro-slider",
        templateUrl: "views/template-sidemenu.html",
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
            templateUrl: "views/template-sidemenu.html",
            controller: 'UsersCtrl'
        })
        .state('userdetail', {
            url: "/user/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: 'UserDetailCtrl'
        })
        .state('edituserdetail', {
            url: "/editUser/:id",
            templateUrl: "views/template-sidemenu.html",
            controller: 'EditUserCtrl'
        })
        .state('configuration', {
            url: "/configuration",
            templateUrl: "views/template-sidemenu.html",
            controller: 'ConfigurationCtrl'
        })
        .state('billing', {
            url: "/billing",
            templateUrl: "views/template.html",
            controller: 'BillingCtrl'
        })
        .state('account', {
            url: "/account",
            templateUrl: "views/template.html",
            controller: 'AccountCtrl'
        })
        .state('publishing', {
            url: "/publishing",
            templateUrl: "views/template.html",
            controller: 'PublishingCtrl'
        })
        .state('invoice', {
            url: "/invoice",
            templateUrl: "views/template.html",
            controller: 'InvoiceCtrl'
        });

    $urlRouterProvider.otherwise("/");

});
firstapp.filter('uploadpath', function() {
    return function(input) {
        if (input) {
            return imgpath + "?file=" + input;
        }
    };
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

firstapp.directive('uploadImage', function($http) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel'
        },
        link: function($scope, element, attrs) {
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;

                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.upload = function(image) {
                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function(data) {
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        $scope.model = data.data[0];
                    }
                });
            };
        }
    };
});

firstapp.directive('listType', function() {
    return {
        templateUrl: 'views/directive/listType.html',
        scope: {
            model: '=ngModel'
        },
        link: function($scope, element, attrs) {

        }
    };
});

firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});

firstapp.directive('preivew', function($compile, $parse) {
    return {
        restrict: 'C',
        replace: false,
        link: function($scope, element, attrs) {
            var $appPrview = $(element);
            $(window).on("scroll", function() {
                var bodyScrollTop = $("body").scrollTop() + 50;
                $appPrview.css("margin-top", bodyScrollTop + "px");
            });
        }
    };
});

firstapp.directive('hamburger', function($compile, $parse) {
    return {
        restrict: 'C',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            $element.click(function() {
                $('.sidemenu').toggleClass('open-out');
            });
        }
    };
});

firstapp.directive('scrollbars', function($compile, $parse) {
    return {
        restrict: 'C',
        replace: false,
        link: function($scope, element, attrs) {
            //  console.log("App Preview is there now");
            setTimeout(function() {
                $(".scrollbars").scrollTop($.jStorage.get("navigationScroll"));
            }, 10);


            $(".scrollbars").on("scroll", function() {
                var navigationScroll = $(".scrollbars").scrollTop();
                $.jStorage.set("navigationScroll", navigationScroll);
            });
        }
    };
});


firstapp.filter('isEmpty', [function() {
    return function(object) {
        return angular.equals({}, object);
    };
}]);
// firstapp.filter('trustedurl', [function($sce) {
//     return function(object) {
//       if(object){
//         return $sce.trustAsResourceUrl("https://www.google.com/maps/embed?q="+object.lat+","+object.long);
//       }
//     };
// }]);
// firstapp.filter('trustedurl', function($sce) {
//     return function(input) {
//         if (input) {
//           console.log(input);
//             return $sce.trustAsResourceUrl("https://maps.google.com/maps?q="+input.lat+","+input.long +"&hl=es;z=14&amp;output=embed");
//
//         }
//
//     };
// });

firstapp.filter('trustedurl', function($sce) {
    return function(input) {
        if (input) {
            console.log(input);
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/view?key=AIzaSyCqoHt9DpuP2vCOS-aDNyqN6pBIf7L9yyE&center=" + input.lat + "," + input.long);

        }

    };
});
//
// firstapp.filter('serverimage', function() {
//   return function(input) {
//     if (input) {
//       // console.log('serverimage: ', input);
//       // return input;
//       return imgpath + input;
//       // return "http://192.168.0.123/eurobackend/uploads"+input;
//     } else {
//       return "img/logo.png";
//     }
//   };
// });
firstapp.filter('serverimage', function() {
    return function(input) {
        if (input) {
            // console.log('serverimage: ', input);
            // return input;
            return imgpath + input;
            // return "http://192.168.0.123/eurobackend/uploads"+input;
        } else {
            return "img/logo.png";
        }
    };
});
firstapp.directive('hcPieChart', function() {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function(scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: scope.title
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: scope.data
                }]
            });
        }
    };
});

firstapp.directive('hcChart', function() {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function(scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
})
