/**
 * @title       StickyRail
 * @desc        This script allows the rail to stick to the
 *              top and scroll along with the screen.
 * @author      Ultimate Dark Carnage
 */

(function(window, $, mw){
    function ResizeRail(){
        if (!(this instanceof ResizeRail)){
            return new ResizeRail(arguments[0]);
        }

        var config = $.extend({}, arguments[0]);

        this.version = "v0.4";
        this.name = "ResizeRail";
        this.styleSrc = "MediaWiki:Gadget-StickyRail.css";
        this.guid = this.generateGUID();

        this.railHeight = 0;
        this.contentHeight = 0;
        this.windowHeight = 0;
        this.top = 0;

        this.$target = $("#WikiaRail");
        this.$contentWrapper = $("#WikiaMainContent");
        this.$wikiaBar = $("#WikiaBarWrapper");
        this.$globalNav = $("#globalNavigation");

        this.active = !config.disabled && true;
        this.minWidth = config.minWidth || 1024;
    }

    ResizeRail.prototype = {
        constructor: ResizeRail,
        generateGUID: function(){
            var n = new Array(5), r = [];
            for (var i = 0; i < n.length; i++){
                r[i] = Math.floor(Math.random() * 10);
            }
            r = Number(r.map(String).join(""));
            return r;
        },
        calculate: function(){
            this.contentHeight = this.$contentWrapper.height();
            this.windowHeight = $(window).height() - this.$wikiaBar.height() - this.$globalNav.height();
            if (this.contentHeight < this.windowHeight){
                this.railHeight = this.contentHeight;
            } else {
                this.railHeight = this.windowHeight;
            }
            this.top = this.$globalNav.height() + 14;
        },
        init: function(){
            importArticle({
                type: 'style',
                article: this.styleSrc
            });
            this.resize();
        },
        resize: function(){
            if ($(window).width() < 1024){
                $('#WikiaRail').attr('style', '');
            } else {
                this.calculate();
                this.$target.css({
                    "height": this.railHeight,
                    "top": this.top
                });
            }
        }
    };

    var instance = ResizeRail(window.resizeRail);
    $(window).on({
        "load": $.proxy(instance.init, instance),
        "resize": $.proxy(instance.resize, instance)
    });
    
    window.ResizeRail = ResizeRail;
}(this, jQuery, mediaWiki));