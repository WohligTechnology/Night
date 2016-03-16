var adminurl = "http://192.168.0.124:1337/";
var imgpath = "http://vignesh.com/uploadfile/upload/";



//var imgpath = "http://europratik.com/admin/uploads/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Dashboard",
    classis: "active",
    anchor: "dashboard",
    icon: "ln-chart-growth",
  },{
    name: "Theme",
    classis: "active",
    anchor: "theme",
    icon: "ln-paintbrush",
  },{
    name: "Home",
    classis: "active",
    anchor: "home",
    icon: "ln-home3",
  },{
    name: "Navigation",
    classis: "active",
    anchor: "navigation",
    icon: "ln-compass",
  },{
    name: "Login & Signup",
    classis: "active",
    anchor: "login-signup",
    icon: "ln-unlock",
  },{
    name: "Notifications",
    classis: "active",
    anchor: "notifications",
    icon: "ln-bell",
  },{
    name: "Events",
    classis: "active",
    anchor: "events",
    icon: "ln-calendar2",
  },{
    name: "Blogs",
    classis: "active",
    anchor: "blogs",
    icon: "ln-edit2",
  },{
    name: "Articles",
    classis: "active",
    anchor: "articles",
    icon: "ln-papers",
  },{
    name: "Photo Galleries",
    classis: "active",
    anchor: "photo-galleries",
    icon: "ln-picture",
  },{
    name: "Video Galleries",
    classis: "active",
    anchor: "video-galleries",
    icon: "ln-film-play",
  },{
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
  },{
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
  },
  {
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
                "order": formData.order,
                "status": formData.status
            }
        }).success(callback);
    },

    eventsViewAll: function(formData, callback) {
        // console.log('form data: ', formData);
        $http({
            url: adminurl + 'events/viewAll',
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
            url: adminurl + 'events/create',
            method: 'POST',
            withCredentials: true,
            data: {
                "title": formData.title,
                "_id": formData._id,
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
