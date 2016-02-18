var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
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
  },{
    name: "Search",
    classis: "active",
    anchor: "search",
    icon: "ln-magnifier",
  },{
    name: "Audio Players",
    classis: "active",
    anchor: "audio-players",
    icon: "ln-headset",
  },{
    name: "Intro Slider",
    classis: "active",
    anchor: "intro-slider",
    icon: "ln-file-image",
  },{
    name: "Social Feeds",
    classis: "active",
    anchor: "social-feeds",
    icon: "ln-thumbs-up",
  },{
    name: "Forms",
    classis: "active",
    anchor: "forms",
    icon: "ln-register",
  },{
    name: "Users",
    classis: "active",
    anchor: "users",
    icon: "ln-users2",
  }];

  return {
    getnav: function() {
      return navigation;
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
