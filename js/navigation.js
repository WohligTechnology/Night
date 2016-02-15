var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "Dashboard",
    classis: "active",
    link: "#/dashboard",
  },{
    name: "Theme",
    classis: "active",
    link: "#/theme",
  },{
    name: "Home",
    classis: "active",
    link: "#/home",
  },{
    name: "Navigation",
    classis: "active",
    link: "#/navigation",
  },{
    name: "Login/Signup",
    classis: "active",
    link: "#/login/signup",
  },{
    name: "Notification",
    classis: "active",
    link: "#/notification",
  },{
    name: "Event",
    classis: "active",
    link: "#/event",
  },{
    name: "Blog",
    classis: "active",
    link: "#/blog",
  },{
    name: "Static Page",
    classis: "active",
    link: "#/static page",
  },{
    name: "Photo gallery",
    classis: "active",
    link: "#/photo-gallery",
  },{
    name: "Video gallery",
    classis: "active",
    link: "#/video-gallery",
  },{
    name: "Contact",
    classis: "active",
    link: "#/contact",
  },{
    name: "Search",
    classis: "active",
    link: "#/search",
  },{
    name: "Audio player",
    classis: "active",
    link: "#/audio-player",
  },{
    name: "Intro slider",
    classis: "active",
    link: "#/intro-slider",
  },{
    name: "Social feeds",
    classis: "active",
    link: "#/Social-eeds",
  },{
    name: "Custom Forms",
    classis: "active",
    link: "#/Custom-forms",
  },{
    name: "Appuser",
    classis: "active",
    link: "#/Appuser",
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
