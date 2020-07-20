(function(window, $, mw, undefined){
    var config = $.extend({}, window.SlideshowConfig);
    
    function Slideshow($elem){
        this.$data = this.val(config.elem, $elem);
        this.addDescription = this.val(config.description, true);
        this.showDescription = this.val(config.showDescription, false);
        this.height = this.val(config.height, 300);
        this.width = this.val(config.width, 500);
        this.delay = this.val(config.delay, 100);
        this.load = this.val(!!this.$data.data('load'), false);
        this.title = this.val(this.$data.data('title'), '');
        this.source = this.val(this.$data.data('page'), this.title, '');
        this.fallback = this.val(config.fallback, '');
        this.hasChildren = !!this.$data.children('.slide-data').length;
        this.$children = this.$data.children('.slide-data');
        this.defaultIndex = 0;
        this.currentIndex = this.defaultIndex;
        this.items = [];
    }
    
    Slideshow.prototype = {
        constructor: Slideshow,
        loadItems: function(){
            var replace = this.val(!!arguments[0], false);
            if (this.load && this.source && this.hasChildren)
                this.loadFromPage($.proxy(this.parse, this), replace);
            else this.$children.each($.proxy(this.addItem, this));
        },
        addItem: function(index, elem){
            var $target = $(elem), res = {}, len = this.items.length;
            $.extend(res, {
                title: this.val($target.data('title'), ''),
                link: this.val($target.data('link'), ''),
                file: this.val($target.data('file'), ''),
                imgSrc: this.val($target.find('img').attr('src'), ''),
                desc: this.val($target.html(), ''),
                index: index || 0
            });
            
            $.extend(res, {
                fullurl: (new mw.Title(res.link)).getUrl(),
                show: res.index == this.defaultIndex
            });
            
            this.items[len] = obj;
        },
        loadFromPage: function(callback, replace){
            var Api = new mw.Api();
            if (replace){
                this.params = {};
                $.extend(this.params, {
                    format: 'json',
                    action: 'query',
                    prop: 'revisions',
                    rvprop: 'content',
                    titles: this.source,
                    indexpageids: 1
                });
            } else {
                this.params = $.extend({}, this.params);
                $.extend(this.params, {
                    format: 'json',
                    action: this.val(this.params.format, 'query'),
                    prop: this.val(this.params.prop, 'revisions'),
                    rvprop: this.val(this.params.rvprop, 'content'),
                    titles: this.val(this.params.titles, this.source),
                    indexpageids: this.val(this.params.indexpageids, 1)
                });
            }
            Api.get(this.params).always(callback);
        }
    };
}(this, jQuery, mediaWiki, void 0));