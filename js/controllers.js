//window.uploadurl = "http://192.168.0.126:81/uploadfile/upload/";
window.uploadurl = "http://blazen.io/uploadfile/upload/";
var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'ui.sortable', 'ngAnimate', 'toaster', 'imageupload', 'httpService', 'toastr', 'angular-loading-bar'])

.controller('AllAppsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log, httpService) {
    //Used to name the .html file
    // httpService.get("./bower.json", {}, function(data) {
    //   console.log(data);
    // });
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

    $scope.changeit = function(data) {
        console.log("data");
        console.log(data);
    };
    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

})

.controller('EnquiryCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("enquiry");
    $scope.menutitle = NavigationService.makeactive("Enquiry");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.allEnquiry = function() {
        NavigationService.getAllEnquiry(function(data) {
            if (data.value) {
                $scope.enquirydata = data.data;
            }
        })
    }
    $scope.allEnquiry();

    $scope.deleteEnquiry = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteEnquiry({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allEnquiry();
                    }
                });
            }
        });
    };

})

.controller('EnquiryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("enquirydetail");
    $scope.menutitle = NavigationService.makeactive("Enquiry");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};

    $scope.enquirySubmitForm = function() {
        console.log($scope.userForm);
        NavigationService.submitEnquiry($scope.userForm, function(data) {
            if (data.value) {
                $state.go('enquiry');
            }
        })
    }

})

.controller('EditEnquiryCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("enquirydetail");
    $scope.menutitle = NavigationService.makeactive("Enquiry");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};

    NavigationService.getOneEnquiry($stateParams.id, function(data) {
        console.log(data);
        if (data.value)
            $scope.userForm = data.data;
    })

    $scope.enquirySubmitForm = function() {
        console.log($scope.userForm);
        NavigationService.submitEnquiry($scope.userForm, function(data) {
            if (data.value) {
                $state.go('enquiry');
            }
        })
    }

})

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.pieData = [{
        name: "Microsoft Internet Explorer",
        y: 56.33
    }, {
        name: "Chrome",
        y: 24.03,
        sliced: true,
        selected: true
    }, {
        name: "Firefox",
        y: 10.38
    }, {
        name: "Safari",
        y: 4.77
    }, {
        name: "Opera",
        y: 0.91
    }, {
        name: "Proprietary or Undetectable",
        y: 0.2
    }];
    $scope.chartOptions = {
        title: {
            text: 'User data'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    };

    NavigationService.getAllEnquiry(function(data) {
        if (data.value) {
            $scope.enquirydata = data.data;
        }
    })

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

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal, httpService, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("App Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.homeForm = {};
    $scope.homedata = [];
    $scope.userForm = {};

    $scope.allHomeRecord = function() {
        NavigationService.homeViewAll(function(data) {
            if (data.value === true) {
                $scope.userForm.images = data.data;
            }
        });
        // httpService.post(adminurl + 'homeslider/getAll', {}, function(data, status) {
        //     if (data.value == true) {
        //         $scope.userForm.images = data.data;
        //     }
        // }, function(err, status) {})
    };
    $scope.allHomeRecord();

    $scope.homeEditSubmitForm = function() {
        _.each($scope.userForm.images, function(n) {
            if (!n.status && n.status != false) {
                n.status = true;
            }
        })
        NavigationService.insertData($scope.userForm.images, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                $scope.allHomeRecord();
            } else {
                globalfunction.errorToaster();
            }
        });
        NavigationService.saveConfigData($scope.configData, function(data) {
            if (data.value) {

            } else {
                globalfunction.errorToaster();
            }
        });
    };
    var modalInstance = '';
    $scope.saveModalData = function(modalData) {
        console.log(modalData);
        NavigationService.saveHomeContent(modalData, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                modalInstance.dismiss();
            } else {
                globalfunction.errorToaster();
            }
        });
    };

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.userForm.images, 'homeSlider', function(data) {

            });
        }
    };

    $scope.changeit = function(data) {
        console.log(data);
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    "image": n
                });
            });
        }
    };
    $scope.open = function(home) {

        $scope.modalData = home;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
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

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
            } else {
                $scope.configData = {};
            }
        } else {
            $scope.configData = {};
        }
    });

    $scope.deleteHomeSlide = function(index, item) {
        globalfunction.confDel(function(val) {
            if (val) {
                if (item._id) {
                    NavigationService.deleteHomeSlider({
                        "_id": item._id
                    }, function(data) {
                        if (data.value) {
                            globalfunction.delSuccessToaster();
                            $scope.allHomeRecord();
                        }
                    });
                } else {
                    $scope.userForm.images.splice(index, 1);
                }
            }
        });
    };

})

.controller('NavigationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigation");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.eventForm = {};
    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.navigationdata, 'navigation', function(data) {
                globalfunction.successToaster();
            })
        }
    };

    $scope.allNavigationRecord = function() {
        NavigationService.navigationViewAll($scope.eventForm, function(data) {
            $scope.navigationdata = data.data;
        });
    };
    $scope.allNavigationRecord();

    $scope.deleteNavigation = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteNavigationData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNavigationRecord();
                    }
                });
            }
        });
    };

    $scope.makeDefault = function(nav) {
        console.log(nav);
        NavigationService.setDefault(nav._id, function(data) {
            globalfunction.successToaster();
        });
    }

    // $scope.navigation2 = [{
    //     name: "Home",
    //     icon: "ln-home3",
    //   }, {
    //     name: "Login & Signup",
    //     icon: "ln-unlock",
    //   }, {
    //     name: "Notifications",
    //     icon: "ln-bell",
    //   }, {
    //     name: "Events",
    //     icon: "ln-calendar2",
    //   }, {
    //     name: "Blogs",
    //     icon: "ln-edit2",
    //   }, {
    //     name: "Articles",
    //     icon: "ln-papers",
    //   }, {
    //     name: "Photo Gallery",
    //     icon: "ln-picture",
    //   }, {
    //     name: "Video Galleries",
    //     icon: "ln-film-play",
    //   }, {
    //     name: "Contact",
    //     icon: "ln-contacts",
    //   }, {
    //     name: "Audio Galleries",
    //     icon: "ln-headset",
    //   }
    //   // ,
    //   // {
    //   //   name: "Social Feeds",
    //   //   classis: "active",
    //   //   anchor: "social-feeds",
    //   //   icon: "ln-thumbs-up",
    //   // }
    //   // ,{
    //   //   name: "Forms",
    //   //   classis: "active",
    //   //   anchor: "forms",
    //   //   icon: "ln-register",
    //   // }
    // ];
})

.controller('NavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.userForm.status = true;
    $scope.page = {
        header: "Create Navigation"
    };

    $scope.icons = ["home", "home2", "home3", "home4", "home5", "home6", "pencil", "pencil2", "edit", "edit2", "feather", "feather2", "pen", "brush", "paintbrush", "paint-roller", "eye-dropper", "magic", "design", "magnet", "aim", "gun", "droplet", "droplet2", "fire", "lighter", "knife", "toilet-paper", "umbrella", "sun-small", "sun", "moon", "cloud", "cloud-upload", "cloud-download", "cloud-rain", "cloud-snow", "cloud-fog", "cloud-lightning", "cloud-sync", "cloud-lock", "cloud-gear", "cloud-database", "database", "shield", "lock", "unlock", "key", "key-hole", "gear", "gear2", "wrench", "tools", "hammer", "factory", "factory2", "recycle", "trash", "trash2", "heart", "heart2", "flag", "flag2", "flag3", "at-sign", "envelope", "inbox", "paperclip", "reply", "reply-all", "paper-plane", "eye", "eye2", "binoculars", "binoculars2", "floppy-disk", "printer", "file", "folder", "copy", "scissors", "paste", "clipboard", "clipboard-check", "register", "enter", "exit", "papers", "news", "document", "document2", "license", "graduation-hat", "license2", "medal", "medal2", "medal3", "medal4", "podium", "trophy", "music-note", "music", "music2", "playlist", "shuffle", "headset", "presentation", "play", "film-play", "camera", "photo", "picture", "book", "book-closed", "bookmark", "bookmark2", "books", "library", "contacts", "profile", "user", "users", "users2", "woman", "man", "shirt", "cart", "cart-empty", "cart-full", "tag", "tags", "cash", "credit-card", "barcode", "barcode2", "barcode3", "phone", "phone2", "pin", "map-marker", "compass", "map", "location", "road-sign", "calendar", "calendar2", "calendar3", "mouse", "keyboard", "delete", "spell-check", "screen", "signal", "iphone", "smartphone", "ipad", "tablet", "laptop", "desktop", "radio", "tv", "power", "lightning-bolt", "lamp", "plug-cord", "outlet", "drawer", "drawer2", "drawer3", "archive", "archive2", "comment", "comments", "chat", "quote-open", "quote-close", "pulse", "syringe", "first-aid", "lifebuoy", "patch", "patch2", "lab", "skull", "construction", "construction-cone", "pie-chart", "pie-chart2", "graph", "chart-growth", "cake", "gift", "balloon", "rank", "rank2", "rank3", "crown", "lotus", "diamond", "diamond2", "diamond3", "diamond4", "linearicons", "teacup", "glass", "bottle", "cocktail-glass", "dinner", "dinner2", "hamburger", "dumbbell", "apple", "leaf", "pine-tree", "tree", "paw", "paw2", "footprint", "speed-slow", "speed-medium", "speed-fast", "rocket", "gamepad", "dice", "ticket", "hammer2", "balance", "briefcase", "plane", "gas", "transmission", "car", "bus", "truck", "trailer", "train", "ship", "anchor", "boat", "bicycle", "cube", "puzzle", "glasses", "accessibility", "wheelchir", "icons", "icons2", "sitemap", "earth", "happy", "smile", "grin", "tongue", "sad", "wink", "dream", "shocked", "shocked2", "tongue2", "neutral", "happy-grin", "cool", "mad", "grin-evil", "evil", "shocked3", "annoyed", "mustache", "wondering", "confused", "bell", "bullhorn", "volume-high", "volume-medium", "volume-low", "volume", "mute", "wifi", "wifi2", "wifi3", "mic", "mic2", "mic-mute", "hourglass", "loading", "loading2", "loading3", "undo", "redo", "sync", "sync2", "refresh", "refresh2", "history", "history2", "clock", "clock2", "clock3", "clock4", "clock5", "timer", "timer2", "download", "upload", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up2", "arrow-down2", "arrow-left2", "arrow-right2", "arrow-up3", "arrow-down3", "arrow-left3", "arrow-right3", "arrow-up4", "arrow-down4", "arrow-left4", "arrow-right4", "terminal", "bug", "code", "file-code", "file-image", "file-zip", "file-audio", "file-video", "link", "link2", "unlink", "link3", "unlink2", "thumbs-up", "thumbs-down", "thumbs-up2", "thumbs-down2", "thumbs-up3", "thumbs-down3", "share", "share2", "share3", "options", "list", "list2", "magnifier", "zoom-in", "zoom-out", "question", "checkmark", "cross", "chevron-up", "chevron-down", "chevron-left", "chevron-right", "arrow-up5", "arrow-down5", "arrow-left5", "arrow-right5", "expand", "shrink", "expand2", "shrink2", "move", "tab", "warning", "circle-exclamation", "circle-question", "circle-checkmark", "circle-cross", "circle-plus", "circle-minus", "circle-up", "circle-down", "circle-left", "circle-right", "circle-up2", "circle-down2", "circle-left2", "circle-right2", "circle-backward", "circle-first", "circle-previous", "circle-stop", "circle-play", "circle-pause", "circle-next", "circle-last", "circle-forward", "circle-eject", "crop", "frame", "ruler", "funnel", "flip-horizontal", "flip-vertical", "subtract", "combine", "intersect", "exclude", "align-center-vertical", "align-right", "align-bottom", "align-left", "align-center-horizontal", "align-top", "square", "circle"];

    $scope.navigationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.navigationCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("navigation");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

    $scope.animationsEnabled = true;
    // $scope.open = function(size) {
    //
    //     var modalInstance = $uibModal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'views/modal/nav-modal.html',
    //         controller: 'NavigationDetailCtrl',
    //         size: size,
    //         resolve: {
    //             items: function() {
    //                 return $scope.items;
    //             }
    //         }
    //     });
    //
    // };
    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
})

.controller('EditNavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Navigation"
    };

    $scope.icons = ["home", "home2", "home3", "home4", "home5", "home6", "pencil", "pencil2", "edit", "edit2", "feather", "feather2", "pen", "brush", "paintbrush", "paint-roller", "eye-dropper", "magic", "design", "magnet", "aim", "gun", "droplet", "droplet2", "fire", "lighter", "knife", "toilet-paper", "umbrella", "sun-small", "sun", "moon", "cloud", "cloud-upload", "cloud-download", "cloud-rain", "cloud-snow", "cloud-fog", "cloud-lightning", "cloud-sync", "cloud-lock", "cloud-gear", "cloud-database", "database", "shield", "lock", "unlock", "key", "key-hole", "gear", "gear2", "wrench", "tools", "hammer", "factory", "factory2", "recycle", "trash", "trash2", "heart", "heart2", "flag", "flag2", "flag3", "at-sign", "envelope", "inbox", "paperclip", "reply", "reply-all", "paper-plane", "eye", "eye2", "binoculars", "binoculars2", "floppy-disk", "printer", "file", "folder", "copy", "scissors", "paste", "clipboard", "clipboard-check", "register", "enter", "exit", "papers", "news", "document", "document2", "license", "graduation-hat", "license2", "medal", "medal2", "medal3", "medal4", "podium", "trophy", "music-note", "music", "music2", "playlist", "shuffle", "headset", "presentation", "play", "film-play", "camera", "photo", "picture", "book", "book-closed", "bookmark", "bookmark2", "books", "library", "contacts", "profile", "user", "users", "users2", "woman", "man", "shirt", "cart", "cart-empty", "cart-full", "tag", "tags", "cash", "credit-card", "barcode", "barcode2", "barcode3", "phone", "phone2", "pin", "map-marker", "compass", "map", "location", "road-sign", "calendar", "calendar2", "calendar3", "mouse", "keyboard", "delete", "spell-check", "screen", "signal", "iphone", "smartphone", "ipad", "tablet", "laptop", "desktop", "radio", "tv", "power", "lightning-bolt", "lamp", "plug-cord", "outlet", "drawer", "drawer2", "drawer3", "archive", "archive2", "comment", "comments", "chat", "quote-open", "quote-close", "pulse", "syringe", "first-aid", "lifebuoy", "patch", "patch2", "lab", "skull", "construction", "construction-cone", "pie-chart", "pie-chart2", "graph", "chart-growth", "cake", "gift", "balloon", "rank", "rank2", "rank3", "crown", "lotus", "diamond", "diamond2", "diamond3", "diamond4", "linearicons", "teacup", "glass", "bottle", "cocktail-glass", "dinner", "dinner2", "hamburger", "dumbbell", "apple", "leaf", "pine-tree", "tree", "paw", "paw2", "footprint", "speed-slow", "speed-medium", "speed-fast", "rocket", "gamepad", "dice", "ticket", "hammer2", "balance", "briefcase", "plane", "gas", "transmission", "car", "bus", "truck", "trailer", "train", "ship", "anchor", "boat", "bicycle", "cube", "puzzle", "glasses", "accessibility", "wheelchir", "icons", "icons2", "sitemap", "earth", "happy", "smile", "grin", "tongue", "sad", "wink", "dream", "shocked", "shocked2", "tongue2", "neutral", "happy-grin", "cool", "mad", "grin-evil", "evil", "shocked3", "annoyed", "mustache", "wondering", "confused", "bell", "bullhorn", "volume-high", "volume-medium", "volume-low", "volume", "mute", "wifi", "wifi2", "wifi3", "mic", "mic2", "mic-mute", "hourglass", "loading", "loading2", "loading3", "undo", "redo", "sync", "sync2", "refresh", "refresh2", "history", "history2", "clock", "clock2", "clock3", "clock4", "clock5", "timer", "timer2", "download", "upload", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up2", "arrow-down2", "arrow-left2", "arrow-right2", "arrow-up3", "arrow-down3", "arrow-left3", "arrow-right3", "arrow-up4", "arrow-down4", "arrow-left4", "arrow-right4", "terminal", "bug", "code", "file-code", "file-image", "file-zip", "file-audio", "file-video", "link", "link2", "unlink", "link3", "unlink2", "thumbs-up", "thumbs-down", "thumbs-up2", "thumbs-down2", "thumbs-up3", "thumbs-down3", "share", "share2", "share3", "options", "list", "list2", "magnifier", "zoom-in", "zoom-out", "question", "checkmark", "cross", "chevron-up", "chevron-down", "chevron-left", "chevron-right", "arrow-up5", "arrow-down5", "arrow-left5", "arrow-right5", "expand", "shrink", "expand2", "shrink2", "move", "tab", "warning", "circle-exclamation", "circle-question", "circle-checkmark", "circle-cross", "circle-plus", "circle-minus", "circle-up", "circle-down", "circle-left", "circle-right", "circle-up2", "circle-down2", "circle-left2", "circle-right2", "circle-backward", "circle-first", "circle-previous", "circle-stop", "circle-play", "circle-pause", "circle-next", "circle-last", "circle-forward", "circle-eject", "crop", "frame", "ruler", "funnel", "flip-horizontal", "flip-vertical", "subtract", "combine", "intersect", "exclude", "align-center-vertical", "align-right", "align-bottom", "align-left", "align-center-horizontal", "align-top", "square", "circle"];

    NavigationService.getNavigationEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
        if ($scope.userForm.status == 1) {
            $scope.userForm.status = true;
        } else {
            $scope.userForm.status = false;
        }
    });

    $scope.navigationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log($scope.userForm);
            NavigationService.editNavigationSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("navigation");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

})

.controller('LoginSignupCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("login-signup");
    $scope.menutitle = NavigationService.makeactive("Login & Signup");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.login = {};
    $scope.login.googleCredentials = {};
    $scope.login.facebookCredentials = {};
    $scope.login.twitterCredentials = {};
    $scope.login.instaCredentials = {};
    $scope.login.hasLogin = true;
    $scope.login.custom = true;
    $scope.login.google = false;
    $scope.login.facebook = false;
    $scope.login.twitter = false;
    $scope.login.insta = false;

    $scope.changeLogin = function() {
        if (!$scope.login.hasLogin) {
            $scope.login.custom = false;
            $scope.login.google = false;
            $scope.login.facebook = false;
            $scope.login.twitter = false;
            $scope.login.insta = false;
        }
    };
    $scope.changeLoginForOther = function(val) {
        if (val) {
            $scope.login.hasLogin = true;
        }
    };

    $scope.saveConfigData = function() {
        $scope.valid = false;
        if (!$scope.login.hasLogin) {
            $scope.valid = true;
            $scope.login.custom = false;
            $scope.login.google = false;
            $scope.login.facebook = false;
            $scope.login.twitter = false;
            $scope.login.insta = false;
            $scope.login.googleCredentials = {};
            $scope.login.facebookCredentials = {};
            $scope.login.twitterCredentials = {};
            $scope.login.instaCredentials = {};
        }
        $scope.configData.login = $scope.login;
        console.log($scope.configData);
        if ($scope.login.custom) {
            $scope.valid = true;
        }
        if ($scope.login.google) {
            if ($scope.login.googleCredentials && $scope.login.googleCredentials.id && $scope.login.googleCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.login.facebook) {
            if ($scope.login.facebookCredentials && $scope.login.facebookCredentials.id && $scope.login.facebookCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.login.twitter) {
            if ($scope.login.twitterCredentials && $scope.login.twitterCredentials.id && $scope.login.twitterCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.login.insta) {
            if ($scope.login.instaCredentials && $scope.login.instaCredentials.id && $scope.login.instaCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.valid) {
            $scope.showErrMsg = false;
            NavigationService.saveConfigData($scope.configData, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            })
        } else {
            $scope.showErrMsg = true;
            console.log("Invalid");
        }
    };

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
                if (data.data[0].login) {
                    $scope.login = data.data[0].login;
                }
            } else {
                $scope.configData = {};
            }
        } else {
            $scope.configData = {};
        }
    })

})

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("notifications");
    $scope.menutitle = NavigationService.makeactive("Notifications");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.userForm.status = true;
    $scope.notificationForm = {};
    $scope.config = {};
    var modalInstance = '';

    NavigationService.getConfig(function(data) {
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
            }
        }
    });

    $scope.saveGoogleCloud = function() {
        console.log($scope.configData);
        NavigationService.saveConfigData($scope.configData, function(data) {

        });
    };

    $scope.notificationdata = [];
    $scope.allNotificationRecord = function() {
        NavigationService.notificationViewAll($scope.notificationForm, function(data) {
            $scope.notificationdata = data.data;
        });
    };
    $scope.allNotificationRecord();

    $scope.deleteNotification = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteNotificationData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNotificationRecord();
                    }
                });
            }
        });
    };

    $scope.notificationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            $scope.userForm.timestamp = new Date();
            NavigationService.notificationCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $scope.userForm = {};
                    $scope.allNotificationRecord();
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

    $scope.notificationEditSubmitForm = function(noti) {
        NavigationService.notificationCreateSubmit(noti, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                modalInstance.dismiss();
                $scope.allNotificationRecord();
            } else {
                globalfunction.errorToaster();
            }
        });
    };

    $scope.animationsEnabled = true;

    $scope.open = function(noti) {
        console.log(noti);
        $scope.noti = noti;
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/notificationdetail.html',
            scope: $scope
        });
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

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

})

.controller('EventsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, toaster) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("events");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.eventForm = {};

    $scope.allEventsRecord = function() {
        NavigationService.eventsViewAll($scope.eventForm, function(data) {
            $scope.eventsdata = data.data;
            console.log('$scope.eventsdata.startTime', $scope.eventsdata.startTime);
            $scope.eventsdata.startTime = new Date($scope.eventsdata.startTime);
            console.log('$scope.eventsdata', $scope.eventsdata);
        });
    };
    $scope.allEventsRecord();

    $scope.deleteEvent = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteEventsData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNavigationRecord();
                    }
                });
            }
        });
    };

})

.controller('EventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster, $filter) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("eventdetail");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.userForm.images = [];
    $scope.page = {
        header: "Create Event"
    };
    $scope.eventSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.eventCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("events");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

    $scope.$watch('userForm.sdate', function() {
        $scope.tryCombineStartDateTime();
    });

    $scope.$watch('userForm.stime', function() {
        $scope.tryCombineStartDateTime();
    });
    $scope.$watch('userForm.edate', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.$watch('userForm.etime', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.tryCombineStartDateTime = function() {
        if ($scope.userForm.sdate && $scope.userForm.stime) {
            var newdate = $filter('date')($scope.userForm.sdate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.stime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.startTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.startTime);
            }
        }
    };
    $scope.tryCombineEndDateTime = function() {
        if ($scope.userForm.edate && $scope.userForm.etime) {
            var newdate = $filter('date')($scope.userForm.edate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.etime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.endTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.endTime);
            }
        }
    };

    $scope.cancel = function(formData) {
        $scope.formData = {};
        console.log("cancel values:", $scope.formData);
    };

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

    $scope.cancel = function(formData) {
        $scope.formData = {};
        console.log("cancel values:", $scope.formData);
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open10 = function() {
        $scope.popup10.opened = true;
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

    $scope.popup10 = {
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

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

    var modalInstances = '';
    $scope.addVideo = function() {
        $scope.modalData = {};
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.VideoEdit = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.popVideo = function(video) {
        console.log("sdflashdfkljahskljdfh");
        console.log($scope.userForm.videos);
    };

    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstances.dismiss();
        $scope.modalData = {};
    };

    var modalInstance = '';
    $scope.ImageEdit = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

    $scope.saveModalData = function(image) {
        modalInstance.dismiss();
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.changeit = function(data) {
        console.log(data);
        console.log($scope.userForm.images);
        if (data.value) {
            // if ($scope.userForm.images && $scope.userForm.images.length<1) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    "image": n
                });
            });
            // }

        }
    };

})

.controller('EditEventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster, $stateParams, $filter) {

    //Used to name the .html file
    console.log("in edit event");
    $scope.template = TemplateService.changecontent("eventdetail");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Event"
    };

    NavigationService.getEventsEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
        if ($scope.userForm.startTime || $scope.userForm.endTime) {
            $scope.userForm.sdate = new Date($scope.userForm.startTime);
            $scope.userForm.stime = new Date($scope.userForm.startTime);
            $scope.userForm.edate = new Date($scope.userForm.endTime);
            $scope.userForm.etime = new Date($scope.userForm.endTime);
        }
    });

    $scope.$watch('userForm.sdate', function() {
        $scope.tryCombineStartDateTime();
    });

    $scope.$watch('userForm.stime', function() {
        $scope.tryCombineStartDateTime();
    });
    $scope.$watch('userForm.edate', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.$watch('userForm.etime', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.tryCombineStartDateTime = function() {
        if ($scope.userForm.sdate && $scope.userForm.stime) {
            var newdate = $filter('date')($scope.userForm.sdate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.stime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.startTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.startTime);
            }
        }
    };

    $scope.tryCombineEndDateTime = function() {
        if ($scope.userForm.edate && $scope.userForm.etime) {
            var newdate = $filter('date')($scope.userForm.edate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.etime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.endTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.endTime);
            }
        }
    };

    $scope.pop = function() {
        toaster.pop('success', "Successfully Saved", '<p>The data has been Successfully saved</p>', 5000, 'trustedHtml');
    };
    $scope.eventSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.editEventSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("events");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

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

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

    var modalInstances = '';
    $scope.addVideo = function() {
        $scope.modalData = {};
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.VideoEdit = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.popVideo = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.videos.splice(index, 1);
            }
        });
    };

    $scope.popImage = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.images.splice(index, 1);
            }
        });
    };

    $scope.changeit = function(data) {
        console.log(data);
        console.log($scope.userForm.images);

        if (!$scope.userForm.images) {
            $scope.userForm.images = [];
        }
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n
                });
            });
        }
    };

    $scope.addVideo = function() {
        $scope.modalData = {};
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstances.dismiss();
        $scope.modalData = {};
    };

    var modalInstance = '';
    $scope.ImageEdit = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

    $scope.saveModalData = function(image) {
        modalInstance.dismiss();
    }


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
    $scope.userForm = {};

    $scope.oneAtATime = true;
    $scope.blogForm = {};
    $scope.allBlogsRecord = function() {
        NavigationService.blogViewAll(function(data) {
            console.log(data);
            $scope.blogdata = data.data;
        });
    };
    $scope.allBlogsRecord();

    $scope.deleteBlog = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteBlogData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allBlogsRecord();
                    }
                });
            }
        });
    };

    $scope.saveConfigData = function() {
        console.log($scope.configData);
        $scope.valid = false;
        if ($scope.configData.blog && $scope.configData.blog.blogType == 'CMS') {
            $scope.valid = true;
        } else if ($scope.configData.blog && $scope.configData.blog.blogType == 'Wordpress') {
            if ($scope.configData.blog && $scope.configData.blog.wordpressUsername) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        } else if ($scope.configData.blog && $scope.configData.blog.blogType == 'SelfHosted') {
            if ($scope.configData.blog && $scope.configData.blog.selfHostedUsername) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        } else if ($scope.configData.blog && $scope.configData.blog.blogType == 'Tumblr') {
            if ($scope.configData.blog && $scope.configData.blog.tumblrUsername) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }

        if ($scope.valid) {
            $scope.showErrMsg = false;
            NavigationService.saveConfigData($scope.configData, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            })
        } else {
            $scope.showErrMsg = true;
            console.log("Invalid");
        }
    };

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
                if (!$scope.configData.blog) {
                    $scope.configData.blog = {};
                    $scope.configData.blog.blogType = 'CMS';
                    $scope.status = {
                        isFirstOpen: true
                    };
                } else {
                    switch ($scope.configData.blog.blogType) {
                        case 'CMS':
                            $scope.status = {
                                isFirstOpen: true
                            };
                            break;
                        case 'Wordpress':
                            $scope.status = {
                                open2: true
                            };
                            break;
                        case 'SelfHosted':
                            $scope.status = {
                                open3: true
                            };
                            break;
                        case 'Tumblr':
                            $scope.status = {
                                open4: true
                            };
                            break;
                        default:
                            break;
                    }
                }
            } else {
                $scope.configData = {};
                $scope.configData.blog = {};
                $scope.configData.blog.blogType = 'CMS';
                $scope.status = {
                    isFirstOpen: true
                };
            }
        } else {
            $scope.configData = {};
            $scope.configData.blog = {};
            $scope.configData.blog.blogType = 'CMS';
            $scope.status = {
                isFirstOpen: true
            };
        }
    })

})

.controller('BlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Create Blog"
    };
    $scope.blogSubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.blogCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("blogs");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };
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
})

.controller('EditBlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Blog"
    };

    NavigationService.getBlogEditDetail($stateParams.id, function(data) {
        if (data.value) {
            $scope.userForm = data.data;
            if ($scope.userForm.date) {
                $scope.userForm.date = new Date($scope.userForm.date);
            }
        }
    });

    $scope.blogSubmitForm = function(formValid) {
        console.log("here");
        NavigationService.blogCreateSubmit($scope.userForm, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                $state.go("blogs");
            } else {
                globalfunction.errorToaster();
            }
        });
    };

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
})

.controller('ArticlesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("articles");
    $scope.menutitle = NavigationService.makeactive("Articles");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.articleForm = {};
    $scope.allArticlesRecord = function() {
        NavigationService.articleViewAll($scope.articleForm, function(data) {
            $scope.articledata = data.data;
            $scope.articledata.modificationTime = new Date($scope.articledata.modificationTime);
            //console.log('$scope.articledata.modificationTime',$scope.articledata.modificationTime);
            console.log('$scope.articledata', data.data);
        });
    };
    $scope.allArticlesRecord();

    $scope.deleteArticle = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteArticleData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNavigationRecord();
                    }
                });
            }
        });
    };

})

.controller('ArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("articledetail");
    $scope.menutitle = NavigationService.makeactive("Articles");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.userForm.status = true;
    //$scope.userForm.status=1;
    $scope.page = {
        header: "Create Article"
    };

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

    $scope.articleSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.articleCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("articles");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

})

.controller('EditArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("articledetail");
    $scope.menutitle = NavigationService.makeactive("Articles");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Article"
    };

    NavigationService.getArticleEditDetail($stateParams.id, function(data) {
        if (data.value) {
            $scope.userForm = data.data;
            if ($scope.userForm.date) {
                $scope.userForm.date = new Date($scope.userForm.date);
            }
        }
    });

    $scope.articleSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.articleCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("articles");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

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

})

.controller('PhotoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("photogalleries");
    $scope.menutitle = NavigationService.makeactive("Photo Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.photogalForm = {};
    $scope.photogaldata = [];
    $scope.allPhotogalRecord = function() {
        NavigationService.getAllPhotoGalleries(function(data) {
            $scope.photogaldata = data.data
        });
    };
    $scope.allPhotogalRecord();

    $scope.userForm = {};

    $scope.photogalEditSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.edithomeSubmit($scope.photogalForm, function(data) {
                $scope.allPhotogalRecord();
            });
            //$state.go("notifications");
        }
    };

    $scope.lists = [{
        "image": "img/t1.jpg"
    }, {
        "image": "img/t2.jpg"
    }, {
        "image": "img/t3.jpg"
    }, {
        "image": "img/t1.jpg"
    }, {
        "image": "img/t2.jpg"
    }, {
        "image": "img/t3.jpg"
    }, {
        "image": "img/t1.jpg"
    }, {
        "image": "img/t2.jpg"
    }, {
        "image": "img/t3.jpg"
    }];

    $scope.open = function(photogal) {
        console.log(photogal);
        $scope.modalData = photogal;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,

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

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.photogaldata, 'photogallery', function(data) {

            });
        }
    };

    $scope.deleteGallery = function(id, index) {
        NavigationService.deleteGallery(id, function(data) {
            if (data.value) {
                $scope.photogaldata.splice(index, 1);
            }
        });
    };

})

.controller('PhotoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $uibModal, $stateParams, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("photogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Photo Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    var modalInstance = '';

    $scope.userForm = {};
    $scope.userForm.status = true;

    $scope.photogalSubmitForm = function() {
        if ($scope.userForm.images) {
            _.each($scope.userForm.images, function(n) {
                if (!n.status && n.status != false) {
                    n.status = true;
                }
            })
        }
        NavigationService.photogalSubmitForm($scope.userForm, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                $scope.getSingleGallery();
                $state.go('photo-galleries');
            } else {
                globalfunction.errorToaster();
            }
        })
    }

    $scope.getSingleGallery = function() {
        NavigationService.getSingleGallery($stateParams.id, function(data) {
            if (data.value) {
                $scope.userForm = data.data;
            }
        })
    }

    if ($stateParams.id) {
        $scope.getSingleGallery();
    }

    $scope.open = function(image) {
        console.log(image);
        $scope.modalData = image;
        $scope.modalData.status = true;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

    $scope.saveModalData = function() {
        console.log($scope.userForm);
        NavigationService.photogalSubmitForm($scope.userForm, function(data) {
            if (data.value) {
                modalInstance.dismiss();
                $scope.getSingleGallery();
            }
        })
    }

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.changeit = function(data) {
        if (!$scope.userForm.images) {
            $scope.userForm.images = [];
        }
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n
                });
            })
        }
    };

    $scope.popImage = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.images.splice(index, 1);
            }
        });
    };

})

.controller('VideoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogalleries");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.articleForm = {};
    NavigationService.videoGalleriesViewAll(function(data) {
        $scope.videogalleries = data.data;
    });

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.videogalleries, 'videogallery', function(data) {

            })
        }
    };

    // $scope.lists = [{
    //   "image": "img/t1.jpg"
    // }, {
    //   "image": "img/t2.jpg"
    // }, {
    //   "image": "img/t3.jpg"
    // }, {
    //   "image": "img/t1.jpg"
    // }, {
    //   "image": "img/t2.jpg"
    // }, {
    //   "image": "img/t3.jpg"
    // }, {
    //   "image": "img/t1.jpg"
    // }, {
    //   "image": "img/t2.jpg"
    // }, {
    //   "image": "img/t3.jpg"
    // }];

})

.controller('VideoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.header = {};
    $scope.header.name = 'Create Video Gallery';
    $scope.userForm = {};
    $scope.userForm.status = true;
    $scope.modalData = {};
    var modalInstances = '';

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

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

    $scope.VideoEdit = function() {
        $scope.modalData = {};
        $scope.modalData.status = true;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.open = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    // $scope.pushVideo = function(video) {
    //     console.log(video);
    //     if (!$scope.userForm.videos) {
    //         $scope.userForm.videos = [];
    //     }
    //     $scope.userForm.videos.push(video);
    //     modalInstances.dismiss();
    //     $scope.modalData = {};
    // };
    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstances.dismiss();
        $scope.modalData = {};
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.popVideo = function(index) {
        console.log("sdflashdfkljahskljdfh");
        console.log($scope.userForm.videos);
        $scope.userForm.videos.splice(index, 1);
    };

    $scope.videoGallerySubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("video-galleries");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };
})

.controller('EditVideoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.header = {};
    $scope.header.name = 'Edit Video Gallery';
    $scope.userForm = {};
    $scope.modalData = {};
    var modalInstances = '';

    NavigationService.getVideoGalleryEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
    });

    $scope.videoGallerySubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("video-galleries");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

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

    $scope.VideoEdit = function() {
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.open = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    // $scope.open = function(singleVideo) {
    //     $scope.modalData = singleVideo;
    //     modalInstances = $uibModal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'views/modal/video-edit.html',
    //         scope: $scope
    //     });
    //
    //     modalInstances.result.then(function(selectedItem) {
    //         $scope.selected = selectedItem;
    //     }, function() {});
    // };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    };

    $scope.popVideo = function(index) {
        console.log("sdflashdfkljahskljdfh");
        console.log($scope.userForm.videos);
        $scope.userForm.videos.splice(index, 1);
    };

    // $scope.pushVideo = function(video) {
    //     console.log(video);
    //     if (!$scope.userForm.videos) {
    //         $scope.userForm.videos = [];
    //     }
    //     $scope.userForm.videos.push(video);
    //     modalInstances.dismiss();
    //     $scope.modalData = {};
    // };
    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstances.dismiss();
        $scope.modalData = {};
    };

})


.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contact");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    $scope.contactForm = {};
    $scope.allContactRecord = function() {
        NavigationService.contactViewAll($scope.contactForm, function(data) {
            $scope.contactdata = data.data;
            //$scope.articledata.modificationTime = new Date($scope.articledata.modificationTime);
            //console.log('$scope.articledata.modificationTime',$scope.articledata.modificationTime);
            console.log('$scope.contactdata', data.data);
        });
    };
    $scope.allContactRecord();

    $scope.deleteContact = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteContactData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {

                $scope.allContactRecord();
            }

        });
    };

})

.controller('ContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contactdetail");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Create Contact"
    };
    $scope.contactSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.contactCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("contact");
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

})

.controller('EditContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contactdetail");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Contact"
    };

    NavigationService.getContactEditDetail($stateParams.id, function(data) {
        //console.log('getArticleEditDetail', data.data);
        $scope.userForm = data.data;
    });

    $scope.contactSubmitForm = function(formValid) {
        console.log($scope.userForm);
        if (formValid.$valid) {
            NavigationService.editContactSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("contact");
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

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
    $scope.menutitle = NavigationService.makeactive("Audio Gallery");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.audio = {};

    $scope.updateAudio = function() {
        NavigationService.saveConfigData($scope.configData, function(data) {
            if (data.value) {
                globalfunction.successToaster();
            } else {
                globalfunction.errorToaster();
            }
        })
    }

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data[0]) {
                $scope.configData = data.data[0];
            } else {
                $scope.configData = {};
            }
        } else {
            $scope.configData = {};
        }
    })

    $scope.resetAudio = function() {
        if ($scope.withId) {
            NavigationService.resetAudio($scope.withId, function(data) {
                if (data.value) {
                    $scope.audio = {};
                }
            })
        }
    }

})

.controller('AudioGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("audiogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Audio Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "CREATE AUDIO GALLERY"
    };
    $scope.userForm = {};
    $scope.audioGallerySubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.audioGalleryCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                console.log('$scope.userForm.status', $scope.userForm.status);
                if ($scope.userForm.status == "Enable") {
                    $scope.userForm.status = 1;
                } else {
                    $scope.userForm.status = 0;
                }
                console.log('userform of status', $scope.userForm);
            });
            $state.go("audio-galleries");

        }
    };


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



.controller('EditAudioGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("audiogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Audio Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "EDIT AUDIO GALLERY"
    };
    $scope.userForm = {};

    NavigationService.getAudioEditDetail($stateParams.id, function(data) {
        //console.log('getArticleEditDetail', data.data);
        $scope.userForm = data.data;
        console.log('userForm', $scope.userForm);
        console.log($scope.userForm.status);
    });


    $scope.audioGallerySubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            NavigationService.editAudioGallerySubmit($scope.userForm, function(data) {
                console.log('my edit AudioGallery', $scope.userForm);
                console.log('edit status', $scope.userForm.status);
                // if($scope.userForm.status==0)
                // {
                //   $scope.userForm.status='Disable';
                // }else{
                //   $scope.userForm.status='Enable';
                // }
                $state.go("audio-galleries");
            });


        } else {

        }
    };

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

.controller('IntroSliderCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("introslider");
    $scope.menutitle = NavigationService.makeactive("Intro Slider");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = [];
    var modalInstance = '';

    $scope.hideLink = true;

    $scope.allIntroSlider = function() {
        NavigationService.getAllIntro(function(data) {
            console.log(data);
            if (data.value) {
                $scope.userForm = data.data;
                if (data.data.length > 0) {
                    $scope.showNoSlider = false;
                } else {
                    $scope.showNoSlider = true;
                }
            } else {
                $scope.userForm = [];
            }
        });
    }
    $scope.allIntroSlider();

    $scope.saveModalData = function(modalData) {
        _.each($scope.userForm, function(n) {
            if (!n.status && n.status != false) {
                n.status = true;
            }
        })
        NavigationService.saveIntroData($scope.userForm, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                if (modalInstance)
                    modalInstance.dismiss();
            } else {
                globalfunction.errorToaster();
            }
        });
    };

    $scope.changeit = function(data) {
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.push({
                    "image": n
                });
            });
        }
    };

    $scope.open = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

    $scope.popSlider = function(index, id) {
        globalfunction.confDel(function(val) {
            if (val) {
                if (id) {
                    NavigationService.deleteIntroSlider(id, function(data) {
                        if (data.value) {
                            $scope.allIntroSlider();
                        }
                    }, function(data) {
                        console.log(data);
                    });
                } else {
                    $scope.userForm.splice(index, 1);
                    $scope.allIntroSlider();
                }
            }
        });
    };

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.userForm, 'introslider', function(data) {

            });
        }
    };

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
    $scope.userForm = {};
    $scope.allUsersRecord = function() {
        NavigationService.userViewAll($scope.userForm, function(data) {
            if (data.value)
                $scope.userdata = data.data;
        });
    };
    $scope.allUsersRecord();

    $scope.deleteUsers = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteUserData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allUsersRecord();
            }
        });
    };
})

.controller('UserDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("userdetail");
    $scope.menutitle = NavigationService.makeactive("Users");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Create User"
    };
    $scope.userSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.userCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("users");
                }
            });
        }
    };

    $scope.hideSocial = true;

})

.controller('EditUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("userdetail");
    $scope.menutitle = NavigationService.makeactive("Users");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit User"
    };

    NavigationService.getUserEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
    });

    $scope.userSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.editUserSubmit($scope.userForm, function(data) {
                console.log('my edit users', $scope.userForm);
                $state.go("users");
            });
        }
    };

})

.controller('BillingCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("billing");
    $scope.menutitle = NavigationService.makeactive("Billing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('AccountCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("account");
    $scope.menutitle = NavigationService.makeactive("Account");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('PublishingCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("publishing");
    $scope.menutitle = NavigationService.makeactive("Publishing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.lists = [{
        "image": "img/t1.jpg"
    }, {
        "image": "img/t2.jpg"
    }];
    $scope.openscreenshot = function(size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/screenshots.html',
            controller: 'PublishingCtrl',
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

.controller('ConfigurationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("configuration");
    $scope.menutitle = NavigationService.makeactive("Configuration");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};

    $scope.saveConfigData = function() {
        NavigationService.saveConfigData($scope.configData, function(data) {
            console.log(data);
            if (data.value) {
                globalfunction.successToaster();
            }
        })
    };

    $scope.resetSearch = function() {
        if ($scope.configData && $scope.configData.search) {
            globalfunction.confDel(function(val) {
                if (val) {
                    _.each($scope.configData.search, function(n) {
                        n.enabled = false;
                    })
                    NavigationService.saveConfigData($scope.configData, function(data) {
                        console.log(data);
                        if (data.value) {
                            globalfunction.delSuccessToaster();
                        }
                    })
                }
            });
        }
    };

    $scope.oneAtATime = true;
    $scope.searchFor = [{
        name: "Theme",
        enabled: false
    }, {
        name: "Notifications",
        enabled: false
    }, {
        name: "Events",
        enabled: false
    }, {
        name: "Blogs",
        enabled: false
    }, {
        name: "Articles",
        enabled: false
    }, {
        name: "Photo Galleries",
        enabled: false
    }, {
        name: "Video Galleries",
        enabled: false
    }, {
        name: "Contact",
        enabled: false
    }, {
        name: "Audio Gallery",
        enabled: false
    }, {
        name: "Users",
        enabled: false
    }];

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
                if (!$scope.configData.search) {
                    $scope.configData.search = $scope.searchFor;
                }
            } else {
                $scope.configData = {};
                $scope.configData.socialfeeds = {};
                $scope.configData.search = $scope.searchFor;
            }
        } else {
            $scope.configData = {};
            $scope.configData.socialfeeds = {};
        }
    })
})

.controller('headerctrl', function($scope, TemplateService, toastr, $uibModal, NavigationService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.preview = "views/app-preview.html";
    $scope.searchBar = false;
    $scope.showBar = function() {
        $scope.searchBar = !$scope.searchBar;
    };
    globalfunction.successToaster = function() {
        toastr.success('Saved Successfully');
    }
    globalfunction.delSuccessToaster = function() {
        toastr.success('Deleted Successfully');
    }
    globalfunction.errorToaster = function() {
        toastr.error('Something went wrong', 'Sorry');
    }
    var modalInstance = '';
    $scope.callback = "";
    globalfunction.confDel = function(callback) {
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/confDelete.html',
            size: 'sm',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
        $scope.callback = callback;
    };

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.data && data.data.length == 0) {
            $scope.saveConfig();
        }
    })

    $scope.saveConfig = function() {
        $scope.config = {
            googleCloud: {},
            blog: {
                blogType: "CMS"
            },
            socialfeeds: {},
            gaid: "",
            login: {
                hasLogin: false
            }
        }
        console.log($scope.config);
        NavigationService.saveConfigData($scope.config, function(data) {
            console.log(data);
        })
    }



    $scope.close = function(val) {
        modalInstance.dismiss();
        $scope.callback(val);
    }

});
