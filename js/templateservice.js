var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function() {
    this.title = "Home";
    this.meta = "Google";
    this.metadesc = "Home";

    var d = new Date();
    this.year = d.getFullYear();

    this.init = function() {
        this.header = "views/header.html";
        this.menu = "views/menu.html";

        this.slider = "views/slider.html";
        this.content = "views/content/content.html";
        this.sidemenu = "views/sidemenu.html";
        this.preview = "views/app-preview.html";
        this.contentside = "views/contentside.html";
        this.footer = "views/footer.html";
    };

    this.changecontent = function(page) {
        this.init();
        var data = this;
        data.content = "views/content/" + page + ".html";
        data.tinymceconfig = {
            onChange: function(e) {
                // put logic here for keypress and cut/paste changes
            },
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview',
            skin: 'lightgray',
            theme: 'modern'
        };
        return data;
    };

    this.init();

});
