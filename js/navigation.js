var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "Dashboard",
    classis: "active",
    link: "#/dashboard",
    icon: "ln-chart-growth",
  },{
    name: "Theme",
    classis: "active",
    link: "#/theme",
    icon: "ln-paintbrush",
  },{
    name: "Home",
    classis: "active",
    link: "#/home",
    icon: "ln-home3",
  },{
    name: "Navigation",
    classis: "active",
    link: "#/navigation",
    icon: "ln-compass",
  },{
    name: "Login/Signup",
    classis: "active",
    link: "#/login/signup",
    icon: "ln-unlock",
  },{
    name: "Notification",
    classis: "active",
    link: "#/notification",
    icon: "ln-bell",
  },{
    name: "Event",
    classis: "active",
    link: "#/event",
    icon: "ln-calendar2",
  },{
    name: "Blog",
    classis: "active",
    link: "#/blog",
    icon: "ln-edit2",
  },{
    name: "Static Page",
    classis: "active",
    link: "#/static page",
    icon: "ln-papers",
  },{
    name: "Photo gallery",
    classis: "active",
    link: "#/photo-gallery",
    icon: "ln-picture",
  },{
    name: "Video gallery",
    classis: "active",
    link: "#/video-gallery",
    icon: "ln-film-play",
  },{
    name: "Contact",
    classis: "active",
    link: "#/contact",
    icon: "ln-contacts",
  },{
    name: "Search",
    classis: "active",
    link: "#/search",
    icon: "ln-magnifier",
  },{
    name: "Audio player",
    classis: "active",
    link: "#/audio-player",
    icon: "ln-headset",
  },{
    name: "Intro slider",
    classis: "active",
    link: "#/intro-slider",
    icon: "ln-file-image",
  },{
    name: "Social feeds",
    classis: "active",
    link: "#/Social-eeds",
    icon: "ln-thumbs-up",
  },{
    name: "Custom Forms",
    classis: "active",
    link: "#/Custom-forms",
    icon: "ln-register",
  },{
    name: "Appuser",
    classis: "active",
    link: "#/Appuser",
    icon: "ln-accessibility",
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
