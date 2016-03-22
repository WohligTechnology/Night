var adminurl = "http://192.168.0.124:1337/";
var imgpath = "http://vignesh.com:81/uploadfile/resize?";



//var imgpath = "http://europratik.com/admin/uploads/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            icon: "ln-chart-growth",
        }, {
            name: "Theme",
            classis: "active",
            anchor: "theme",
            icon: "ln-paintbrush",
        }, {
            name: "Home",
            classis: "active",
            anchor: "home",
            icon: "ln-home3",
        }, {
            name: "Navigation",
            classis: "active",
            anchor: "navigation",
            icon: "ln-compass",
        }, {
            name: "Login & Signup",
            classis: "active",
            anchor: "login-signup",
            icon: "ln-unlock",
        }, {
            name: "Notifications",
            classis: "active",
            anchor: "notifications",
            icon: "ln-bell",
        }, {
            name: "Events",
            classis: "active",
            anchor: "events",
            icon: "ln-calendar2",
        }, {
            name: "Blogs",
            classis: "active",
            anchor: "blogs",
            icon: "ln-edit2",
        }, {
            name: "Articles",
            classis: "active",
            anchor: "articles",
            icon: "ln-papers",
        }, {
            name: "Photo Galleries",
            classis: "active",
            anchor: "photo-galleries",
            icon: "ln-picture",
        }, {
            name: "Video Galleries",
            classis: "active",
            anchor: "video-galleries",
            icon: "ln-film-play",
        }, {
            name: "Contact",
            classis: "active",
            anchor: "contact",
            icon: "ln-contacts",
        },
        // ,
        // {
        //   name: "Search",
        //   classis: "active",
        //   anchor: "search",
        //   icon: "ln-magnifier",
        // }
        {
            name: "Audio Galleries",
            classis: "active",
            anchor: "audio-galleries",
            icon: "ln-headset",
        }, {
            name: "Intro Slider",
            classis: "active",
            anchor: "intro-slider",
            icon: "ln-file-image",
        },
        // ,
        // {
        //   name: "Social Feeds",
        //   classis: "active",
        //   anchor: "social-feeds",
        //   icon: "ln-thumbs-up",
        // }
        // ,{
        //   name: "Forms",
        //   classis: "active",
        //   anchor: "forms",
        //   icon: "ln-register",
        // }
        {
            name: "Users",
            classis: "active",
            anchor: "users",
            icon: "ln-users2",
        }, {
            name: "Configuration",
            classis: "active",
            anchor: "configuration",
            icon: "ln-gear2",
        }
    ];

    return {
        getnav: function() {
            return navigation;
        },



        blogViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                  "blogtitle": formData.blogtitle,
                  "content": formData.content,
                  "timestamp": formData.timestamp,


                }
            }).success(callback);
        },

        deleteBlogData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        blogCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/save',
                method: 'POST',
                withCredentials: true,
                data: {
                  "blogtitle": formData.blogtitle,
                  "content": formData.content,
                  "timestamp": formData.timestamp,
                   "image": formData.image,
                }
            }).success(callback);
        },
        getBlogEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editblogSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'blog/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "blogtitle": formData.blogtitle,
                    "content": formData.content,
                    "timestamp": formData.timestamp,
                     "image": formData.image,

                }
            }).success(callback);
        },



                contactViewAll: function(formData, callback) {
                    // console.log('form data: ', formData);
                    $http({
                        url: adminurl + 'contact/getAll',
                        method: 'POST',
                        withCredentials: true,
                        data: {
                            "title": formData.title,
                            "email": formData.email,
                            "address": formData.address,
                             //"link": formData.link,
                            // "socialid": formData.socialid,
                            // "contact": formData.contact,
                            // "accesslevel": formData.accesslevel,
                            // "address": formData.address,
                            // "image": formData.image,
                            // "image1": formData.image1,

                        }
                    }).success(callback);
                },

                deleteContactData: function(formData, callback) {
                    // console.log('form data: ', formData);
                    $http({
                        url: adminurl + 'contact/delete',
                        method: 'POST',
                        withCredentials: true,
                        data: {
                            "_id": formData.id,

                        }
                    }).success(callback);
                },
                contactCreateSubmit: function(formData, callback) {
                    // console.log('form data: ', formData);
                    $http({
                        url: adminurl + 'contact/save',
                        method: 'POST',
                        withCredentials: true,
                        data: {
                          "title": formData.title,
                          "email": formData.email,
                          "address": formData.address,
                           "lat": formData.lat,
                            "long": formData.long,
                        }
                    }).success(callback);
                },
                getContactEditDetail: function(id, callback) {
                    // console.log('form data: ', formData);
                    $http({
                        url: adminurl + 'contact/get',
                        method: 'POST',
                        withCredentials: true,
                        data: {
                            "_id": id

                        }
                    }).success(callback);
                },
                editContactSubmit: function(formData, callback) {
                    // console.log('form data: ', formData);
                    $http({
                        url: adminurl + 'contact/save',
                        method: 'POST',
                        withCredentials: true,
                        data: {
                            "_id": formData._id,
                            "title": formData.title,
                            "email": formData.email,
                            "address": formData.address,
                            "lat": formData.lat,
                             "long": formData.long,

                        }
                    }).success(callback);
                },




        videoGalleryCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'videogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "image": formData.image,
                    "order": formData.order,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    //"views": formData.views,

                }
            }).success(callback);
        },
        videoGalleriesViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'videogallerycategory/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "image": formData.image,
                    "order": formData.order,
                    "modificationTime": formData.modificationTime,
                    "status": formData.status,
                    //"views": formData.views,

                }
            }).success(callback);
        },
        getVideoGalleryEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'videogallerycategory/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editvideogallerySubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'videogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "image": formData.image,
                    "order": formData.order,
                    "modificationTime": formData.modificationTime,
                    "status": formData.status,

                }
            }).success(callback);
        },



        audioGalleryCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "audiotitle": formData.audiotitle,
                    "image": formData.image,
                    "date": formData.date,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    //"views": formData.views,

                }
            }).success(callback);
        },
        audioGalleryViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/getAll',
                method: 'POST',
                withCredentials: true,
                data: {

                    "image": formData.image,

                    //"views": formData.views,

                }
            }).success(callback);
        },
        getAudioEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editAudioGallerySubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "audiotitle": formData.audiotitle,
                    "image": formData.image,
                    "date": formData.date,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,

                }
            }).success(callback);
        },



        userViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "email": formData.email,
                    "tags": formData.tags,
                    "logintype": formData.logintype,
                    "socialid": formData.socialid,
                    "contact": formData.contact,
                    "accesslevel": formData.accesslevel,
                    "address": formData.address,
                    "image": formData.image,
                    "image1": formData.image1,

                }
            }).success(callback);
        },

        deleteUserData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        userCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "email": formData.email,
                    "tags": formData.tags,
                    "logintype": formData.logintype,
                    "socialid": formData.socialid,
                    "contact": formData.contact,
                    "accesslevel": formData.accesslevel,
                    "address": formData.address,
                    "image": formData.image,
                    "image1": formData.image1,
                }
            }).success(callback);
        },
        getUserEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editUserSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "email": formData.email,
                    "tags": formData.tags,
                    "logintype": formData.logintype,
                    "socialid": formData.socialid,
                    "contact": formData.contact,
                    "accesslevel": formData.accesslevel,
                    "address": formData.address,
                    "image": formData.image,
                    "image1": formData.image1,

                }
            }).success(callback);
        },








        articleViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "content": formData.content,
                    "tags": formData.tags,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    //"views": formData.views,

                }
            }).success(callback);
        },

        deleteArticleData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        articleCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "content": formData.content,
                    "tags": formData.tags,
                    "image": formData.image,
                    "status": formData.status,
                    //"views": formData.views,

                }
            }).success(callback);
        },
        getArticleEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editarticleSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "content": formData.content,
                    "tags": formData.tags,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    "image": formData.image

                }
            }).success(callback);
        },



        navigationViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "type": formData.type,
                    "iconType": formData.iconType,
                    //"order": formData.order,
                    "status": formData.status,
                    "icon": formData.icon,

                }
            }).success(callback);
        },

        deleteNavigationData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },

        navigationCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "type": formData.type,
                    "iconType": formData.iconType,
                    //"order": formData.order,
                    "status": formData.status,
                    "icon": formData.icon,
                    "link": formData.link

                }
            }).success(callback);
        },

        getNavigationEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },

        editNavigationSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "type": formData.type,
                    "iconType": formData.iconType,
                    //"order": formData.order,
                    "status": formData.status,
                    "icon": formData.icon,
                    "link": formData.link

                }
            }).success(callback);
        },



        eventsViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'events/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "title": formData.title,
                    "date": formData.date,
                }
            }).success(callback);
        },
        deleteEventsData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'events/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },

        eventCreateSubmit: function(formData, callback) {
            console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'events/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "title": formData.title,
                    //  "_id": formData._id,
                    "venue": formData.venue,
                    "date": formData.date,
                    "content": formData.content,
                    "time": formData.time,
                    //"status": formData.status
                    // "name": formData.name,
                    // "contact":formData.contact,
                    // "facebook":formData.facebook,
                    // "google":formData.google,
                    // "logintype":formData.logintype,
                    // "twitter":formData.twitter
                }
            }).success(callback);
        },
        getEventsEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'events/get',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },

        editEventSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'events/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "title": formData.title,
                    "venue": formData.venue,
                    "date": formData.date,
                    "content": formData.content,
                    "time": formData.time,
                }
            }).success(callback);
        },





        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

    };
});
