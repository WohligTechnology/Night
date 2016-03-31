//window.uploadurl = "http://192.168.0.126:81/uploadfile/upload/";
window.uploadurl = "http://vignesh.com:81/uploadfile/upload/";

angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'ui.sortable', 'ngAnimate', 'toaster', 'imageupload'])


.controller('UploadCtrl', function($scope, $upload, $timeout) {

    var uploadres = [];
    //
    $scope.usingFlash = FileAPI && FileAPI.upload !== null;
    $scope.fileReaderSupported = window.FileReader !== null && (window.FileAPI === null || FileAPI.html5 !== false);
    $scope.uploadRightAway = true;
    $scope.changeAngularVersion = function() {
        window.location.hash = $scope.angularVersion;
        window.location.reload(true);
    };

    $scope.hasUploader = function(index) {
        return $scope.upload[index] !== null;
    };

    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
    $scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
        window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
    // $scope.uploader.onSuccess(function () {
    //   console.log('successfully uploaded!')
    // });

    $scope.onFileSelect = function($files, whichone) {
        $scope.isloading = true;
        $scope.selectedFiles = [];
        $scope.progress = [];

        console.log($files);

        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] !== null) {
                    $scope.upload[i].abort();
                }
            }
        }

        $scope.upload = [];
        $scope.uploadResult = uploadres;
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];

        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            console.log('$files', $files);
            if ($scope.fileReaderSupported && ($file.type.indexOf('image') || $file.type.indexOf('pdf')) > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);

                var loadFile = function(fileReader, index) {

                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    };
                }(fileReader, i);
            }
            $scope.progress[i] = -1;
            if ($scope.uploadRightAway) {
                $scope.start(i, whichone);
            }
        }
    };

    $scope.start = function(index, whichone) {
        // cfpLoadingBar.start();
        $scope.progress[index] = 0;
        $scope.errorMsg = null;
        $scope.howToSend = 1;
        if ($scope.howToSend == 1) {
            $scope.upload[index] = $upload.upload({
                url: uploadurl,
                method: "POST",
                headers: {
                    'Content-Type': 'Content-Type'
                },
                data: {
                    myModel: $scope.myModel
                },
                file: $scope.selectedFiles[index],
                fileFormDataName: 'file'
            });
            $scope.upload[index].then(function(response) {
                    $timeout(function() {
                        // cfpLoadingBar.complete();
                        $scope.uploadResult.push(response.data);
                        console.log(response);
                        if (response.data.files[0].fd !== "") {
                            $scope.isloading = false;
                            if (whichone == 1) {
                                $scope.userForm.image = response.data.files[0].fd;
                                $scope.userForm.icon = response.data.files[0].fd;
                            }
                            //  else {
                            //     $scope.userForm.images.push(response.data.files[0].fd);
                            //  }
                        }
                        console.log('response.data', response.data);
                    });
                },
                function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                },
                function(evt) {
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            $scope.upload[index].xhr(function(xhr) {});
        } else {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                $scope.upload[index] = $upload.http({
                    url: imgpath,
                    headers: {
                        'Content-Type': $scope.selectedFiles[index].type
                    },
                    data: e.target.result
                }).then(function(response) {
                    $scope.uploadResult.push(response.data);
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            };
            fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
        }
    };
})

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
    }]
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

    $scope.homeForm = {};
    $scope.homedata = [];
    $scope.userForm = {};

    $scope.allHomeRecord = function() {
        NavigationService.homeViewAll(function(data) {
            if (data.value == true) {
                $scope.userForm.images = data.data;
            }
        });
    };
    $scope.allHomeRecord();

    $scope.homeEditSubmitForm = function() {
        NavigationService.insertData($scope.userForm.images, function(data) {
            console.log(data);
        });
    };
    var modalInstance = '';
    $scope.editSingleSlider = function(modalData) {
        console.log(modalInstance);
        modalInstance.dismiss();
    }

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

    $scope.open = function(home) {
        console.log(home);
        $scope.modalData = home;
        // $scope.home = home;
        // if ($scope.home.status == 1) {
        //     $scope.home.status = true;
        // } else {
        //     $scope.home.status = false;
        // }
        // console.log('in open modal', $scope.home);
        // console.log('notification data: ', $scope.home);

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
            NavigationService.sortNavigation($scope.navigationdata, function(data) {

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
        console.log('formvalid', formValid);
        NavigationService.deleteNavigationData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allNavigationRecord();
            }
        });
    };

    $scope.makeDefault = function(nav) {
        console.log(nav);
        NavigationService.setDefault(nav._id, function(data) {

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

.controller('NavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Create Navigation"
    };

    $scope.navigationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.navigationCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                $state.go("navigation");
            });
        }
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

    NavigationService.getNavigationEditDetail($stateParams.id, function(data) {
        console.log('getNavigationEditDetail', data.data);
        $scope.userForm = data.data;
        console.log('status', $scope.userForm.status);
        if ($scope.userForm.status == 1) {
            $scope.userForm.status = true;
        } else {
            $scope.userForm.status = false;
        }
    });

    $scope.navigationSubmitForm = function(formValid) {;
        if (formValid.$valid) {
            NavigationService.editNavigationSubmit($scope.userForm, function(data) {
                console.log('my edit navigation', $scope.userForm);
                console.log('edit status', $scope.userForm.status);
                //console.log('response:', data);
                $state.go("navigation");
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
    $scope.login.hasLogin = true;
    $scope.login.google = true;
    $scope.login.facebook = true;
    $scope.login.twitter = true;

})

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("notifications");
    $scope.menutitle = NavigationService.makeactive("Notifications");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.notificationForm = {};

    $scope.notificationdata = [];
    $scope.allNotificationRecord = function() {
        NavigationService.notificationViewAll($scope.notificationForm, function(data) {
            $scope.notificationdata = data.data;
            $scope.notificationdata.sendingTime = new Date($scope.notificationdata.sendingTime);
        });
    };
    $scope.allNotificationRecord();

    $scope.deleteNotification = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteNotificationData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allNotificationRecord();
            }
        });
    };

    $scope.notificationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.notificationCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                $scope.allNotificationRecord();

            });
        }
    };

    $scope.notificationEditSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.editnotiicationSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                $scope.allNotificationRecord();

            });
            $state.go("notifications");
        }
    };

    $scope.animationsEnabled = true;

    $scope.open = function(noti) {
        $scope.noti = noti;
        if ($scope.noti.status == 1) {
            $scope.noti.status = true;
        } else {
            $scope.noti.status = false;
        }
        console.log('in open modal', $scope.noti);
        console.log('notification data: ', $scope.noti);
        $uibModal.open({
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
        console.log('formvalid', formValid);
        NavigationService.deleteEventsData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allEventsRecord();
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
    $scope.page = {
        header: "Create Event"
    };
    $scope.eventSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.eventCreateSubmit($scope.userForm, function(data) {
                $state.go("events");
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

.controller('EditEventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster, $stateParams, $filter) {

    //Used to name the .html file

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
                $state.go("events");
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
    $scope.userForm = {};

    $scope.oneAtATime = true;
    $scope.blogForm = {};
    $scope.allBlogsRecord = function() {
        NavigationService.blogViewAll(function(data) {
            console.log(data);
            $scope.blogdata = data.data;
        });
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

    };
    $scope.allBlogsRecord();

    $scope.deleteBlog = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteBlogData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allBlogsRecord();
            }
        });
    };
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
                    $state.go("blogs");
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
        if (formValid.$valid) {
            NavigationService.blogCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("blogs");
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
        NavigationService.deleteArticleData({
            id: formValid
        }, function(data) {
            if (data.value === true) {
                $scope.allArticlesRecord();
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
                    $state.go("articles");
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
                    $state.go("articles");
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
        NavigationService.homeViewAll(function(data) {
            $scope.photogaldata = data.data;

            console.log('$scope.photogaldata', data.data);
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
        $scope.photogal = photogal;
        // if ($scope.photogal.status == 1) {
        //     $scope.photogal.status = true;
        // } else {
        //     $scope.photogal.status = false;
        // }
        console.log('in open modal', $scope.photogal);
        console.log('photogal data: ', $scope.photogal);


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

})

.controller('PhotoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("photogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Photo Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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

    $scope.userForm = {};
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

.controller('VideoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogalleries");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.articleForm = {};
    NavigationService.videoGalleriesViewAll($scope.articleForm, function(data) {
        $scope.videogalleries = data.data;
        $scope.videogalleries.modificationTime = new Date($scope.videogalleries.modificationTime);
        //console.log('$scope.articledata.modificationTime',$scope.articledata.modificationTime);
        console.log('$scope.videogalleries', data.data);
    });

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
    $scope.header.name = 'Create Video Gallary';
    $scope.userForm = {};

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


    // $scope.videoGallerySubmitForm = function(formValid) {
    //     if (formValid.$valid) {
    //         console.log('in navi');
    //         NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
    //             console.log('userform', $scope.userForm);
    //             console.log('$scope.userForm.status', $scope.userForm.status);
    //             if ($scope.userForm.status =="Enable") {
    //                 $scope.userForm.status ="1";
    //             } else {
    //                 $scope.userForm.status ="0";
    //             }
    //         });
    //         $state.go("video-galleries");
    //     }
    // };

    $scope.videoGallerySubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                console.log('$scope.userForm.status', $scope.userForm.status);
                if ($scope.userForm.status == "Enable") {
                    $scope.userForm.status = 1;
                } else {
                    $scope.userForm.status = 0;
                }
                console.log('userform of status', $scope.userForm);
            });
            $state.go("video-galleries");

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
    $scope.header.name = 'Edit Video Gallary';
    $scope.userForm = {};



    //     $scope.items = [{
    //   value: 0,
    //   label: 'Enable',
    //
    // }, {
    //   value: 1,
    //   label: 'Disable',
    //
    // }];
    NavigationService.getVideoGalleryEditDetail($stateParams.id, function(data) {
        //console.log('getArticleEditDetail', data.data);
        // if($scope.userForm.status==0)
        // {
        //   $scope.userForm.status='Disable';
        // }else{
        //   $scope.userForm.status='Enable';
        // }
        $scope.userForm = data.data;
        console.log('userForm', $scope.userForm);
        console.log($scope.userForm.status);

    });



    $scope.videoGallerySubmitForm = function(formValid) {
        //console.log('form values: ', formData);
        //console.log('form values: ', formValid);
        //console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            NavigationService.editvideogallerySubmit($scope.userForm, function(data) {
                console.log('my edit article', $scope.userForm);
                console.log('edit status', $scope.userForm.status);
                // if($scope.userForm.status==0)
                // {
                //   $scope.userForm.status='Disable';
                // }else{
                //   $scope.userForm.status='Enable';
                // }
                $state.go("video-galleries");
            });

            // NavigationService.userSubmit($scope.userForm, function(data) {
            //
            // });
        } else {

        }
    };


    // $scope.submitForm = function(formData, formValid) {
    //   // console.log('form values: ', formData);
    //   // console.log('form values: ', formValid);
    //   console.log('form values: ', $scope.userForm);
    //   if (formValid.$valid) {
    //     $scope.formComplete = true;
    //     $state.go("video-galleries");
    //     // NavigationService.userSubmit($scope.userForm, function(data) {
    //     //
    //     // });
    //   } else {
    //
    //   }
    // };


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
        // console.log('form values: ', formData);
        // console.log('formvalid values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.contactCreateSubmit($scope.userForm, function(data) {

                console.log('create contact userform', $scope.userForm);
            });
            $state.go("contact");

        }
    };



    // $scope.initMap=function() {
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -33.8688, lng: 151.2195},
    //     zoom: 13
    //   });
    //   var input = /** @type {!HTMLInputElement} */(
    //       document.getElementById('pac-input'));
    //
    //   var types = document.getElementById('type-selector');
    //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    //
    //   var autocomplete = new google.maps.places.Autocomplete(input);
    //   autocomplete.bindTo('bounds', map);
    //
    //   var infowindow = new google.maps.InfoWindow();
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     anchorPoint: new google.maps.Point(0, -29)
    //   });
    //
    //   autocomplete.addListener('place_changed', function() {
    //     infowindow.close();
    //     marker.setVisible(false);
    //     var place = autocomplete.getPlace();
    //     if (!place.geometry) {
    //       window.alert("Autocomplete's returned place contains no geometry");
    //       return;
    //     }
    //
    //     // If the place has a geometry, then present it on a map.
    //     if (place.geometry.viewport) {
    //       map.fitBounds(place.geometry.viewport);
    //     } else {
    //       map.setCenter(place.geometry.location);
    //       map.setZoom(17);  // Why 17? Because it looks good.
    //     }
    //     marker.setIcon(/** @type {google.maps.Icon} */({
    //       url: place.icon,
    //       size: new google.maps.Size(71, 71),
    //       origin: new google.maps.Point(0, 0),
    //       anchor: new google.maps.Point(17, 34),
    //       scaledSize: new google.maps.Size(35, 35)
    //     }));
    //     marker.setPosition(place.geometry.location);
    //     marker.setVisible(true);
    //
    //     var address = '';
    //     if (place.address_components) {
    //       address = [
    //         (place.address_components[0] && place.address_components[0].short_name || ''),
    //         (place.address_components[1] && place.address_components[1].short_name || ''),
    //         (place.address_components[2] && place.address_components[2].short_name || '')
    //       ].join(' ');
    //     }
    //
    //     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    //     infowindow.open(map, marker);
    //   });
    //
    //   // Sets a listener on a radio button to change the filter type on Places
    //   // Autocomplete.
    //   function setupClickListener(id, types) {
    //     var radioButton = document.getElementById(id);
    //     radioButton.addEventListener('click', function() {
    //       autocomplete.setTypes(types);
    //     });
    //   }
    //
    //   setupClickListener('changetype-all', []);
    //   setupClickListener('changetype-address', ['address']);
    //   setupClickListener('changetype-establishment', ['establishment']);
    //   setupClickListener('changetype-geocode', ['geocode']);
    // };

    // $scope.initMap();







    //   $scope.initMap=function() {
    //   var myLatLng = {lat: userForm.lat, long: userForm.long};
    //
    //   // Create a map object and specify the DOM element for display.
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: myLatLng,
    //   });
    //
    //   // Create a marker and set its position.
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     position: myLatLng,
    //
    //   });
    // };



    //   $scope.contactSubmitForm = function(formValid) {
    //       // console.log('form values: ', formData);
    //       // console.log('formvalid values: ', formValid);
    //       console.log('form values: ', $scope.userForm);
    //       if (formValid.$valid) {
    //         console.log('in navi');
    //         NavigationService.contactCreateSubmit($scope.userForm, function(data) {
    //
    //             console.log('create contact userform', $scope.userForm);
    //         });
    //         $state.go("contact");
    //
    //     }
    // };
    $scope.initMap = function() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 10,
            key: "AIzaSyCqoHt9DpuP2vCOS-aDNyqN6pBIf7L9yyE"
        });
    };
    //$scope.initMap();
    $timeout(function() {
        $scope.initMap();
    }, 1000);



    // $scope.initMap=function() {
    //   // Create a map object and specify the DOM element for display.
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat:34.397,lng:150.644},
    //     disableDefaultUI: true,
    //     key:"AIzaSyCqoHt9DpuP2vCOS-aDNyqN6pBIf7L9yyE"
    //   });
    // };
    // $timeout(function () {
    //   $scope.initMap();
    // }, 1000);



    //
    //   $scope.initMap=function() {
    //   var myLatLng = {lat: -25.363, long: 131.044};
    //
    //   // Create a map object and specify the DOM element for display.
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: myLatLng,
    //   });
    //
    //   // Create a marker and set its position.
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     position: myLatLng,
    //     title: 'Hello World!'
    //   });
    // };

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
        console.log('userForm', $scope.userForm);
        console.log($scope.userForm.status);


    });
    $scope.contactSubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            NavigationService.editContactSubmit($scope.userForm, function(data) {
                console.log('my edit contact', $scope.userForm);
                console.log('edit status', $scope.userForm.status);
                // if($scope.userForm.status==0)
                // {
                //   $scope.userForm.status='Disable';
                // }else{
                //   $scope.userForm.status='Enable';
                // }
                $state.go("contact");
            });

            // NavigationService.userSubmit($scope.userForm, function(data) {
            //
            // });
        } else {

        }
    };
    //
    // <script>
    // function initialize() {
    //   var mapProp = {
    //     center:new google.maps.LatLng(51.508742,-0.120850),
    //     zoom:5,
    //     mapTypeId:google.maps.MapTypeId.ROADMAP
    //   };
    //   var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    // }
    // google.maps.event.addDomListener(window, 'load', initialize);
    // </script>


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
    $scope.userForm = {};
    $scope.audioGalleryForm = {};
    NavigationService.audioGalleryViewAll($scope.audioGalleryForm, function(data) {
        $scope.audioGallerydata = data.data;
        // $scope.audioGallerydata.modificationTime = new Date($scope.audioGallerydata.modificationTime);
        //console.log('$scope.articledata.modificationTime',$scope.articledata.modificationTime);
        console.log('$scope.audioGallerydata', data.data);
    });



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

.controller('IntroSliderCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("introslider");
    $scope.menutitle = NavigationService.makeactive("Intro Slider");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
            $scope.useredata = data.data;
            console.log('$scope.userdata', data.data);
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
            // console.log('form values: ', formData);
            // console.log('form values: ', formValid);
            console.log('form values: ', $scope.userForm);
            if (formValid.$valid) {
                NavigationService.userCreateSubmit($scope.userForm, function(data) {
                    console.log('userform', $scope.userForm);

                });
                $state.go("users");

            }
        };


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
            console.log('userForm', $scope.userForm);

        });

        $scope.userSubmitForm = function(formValid) {
            // console.log('form values: ', formData);
            // console.log('form values: ', formValid);
            console.log('form values: ', $scope.userForm);
            if (formValid.$valid) {
                NavigationService.editUserSubmit($scope.userForm, function(data) {
                    console.log('my edit users', $scope.userForm);
                    $state.go("users");
                });

            } else {

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
        $scope.submitForm = function(formData, formValid) {
            console.log('form values: ', formData);
            console.log('form values: ', formValid);
            console.log('form values: ', $scope.userForm);
            if (formValid.$valid) {
                $scope.formComplete = true;
                // NavigationService.userSubmit($scope.userForm, function(data) {
                //
                // });
            } else {

            }
        };

        $scope.oneAtATime = true;
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
    $scope.preview = "views/app-preview.html";
    $scope.searchBar = false;
    $scope.showBar = function() {
        $scope.searchBar = !$scope.searchBar;
    };
});
