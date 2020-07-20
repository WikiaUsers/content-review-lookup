(function(window, $, mw){
    function MenuScreen(){
        var args = [].slice.call(arguments),
            title, config, open;
        if (typeof args[0] === 'string'){
            title = args[0];
            config = $.extend({}, args[1]);
            config.title = title;
        } else if (args[0] instanceof Object){
            config = $.extend({}, args[0]);
        } else config = {};
        this.title = this.def(config.title, '');
        this.classNames = this.merge(config.classNames, []);
        this.id = this.def(config.id, '');
        this.buttons = this.commands = this.merge(config.buttons, []);
        this.content = this.def(config.content, '');
        this.delay = this.def(config.delay, 500);
        this.fullscreen = this.def(config.fullscreen, true);
        this.width = this.fullscreen ? $(window).width() : 
            this.def(config.width, 650);
        this.height = this.fullscreen ? $(window).height() :
            this.def(config.height, 400);
        this.index = $('.MenuScreenWrapper').length + 1;
        this.loaded = false;
        this.opened = false;
    }
    
    MenuScreen.prototype = {
        constructor: MenuScreen,
        def: function(){
            var args = [].slice.call(arguments),
                len = args.length, i = 0, r;
            while (typeof r === 'undefined' && i < len){
                v = args[i]; i++;
            }
            if (typeof v === 'undefined') return null;
            return v;
        },
        merge: function(){
            var args = [].slice.call(arguments),
                len = args.length, i = 0, r = [];
            while (i < len){
                if (args[i] instanceof Array)
                    r = r.concat(args[i]);
                i++;
            }
            return r.filter(function(e, i, a){
                return a.indexOf(e) === i;
            });
        },
        has: function(){
            var args = [].slice.call(arguments),
                obj = args[0], key = args[1];
            return Object.prototype.hasOwnProperty.call(obj, key);
        },
        exists: function(key){
            return this.has(this, key);
        },
        get: function(){
            var args = [].slice.call(arguments), arr = null, obj = {};
            if (args[0] instanceof Array || args.length > 1){
                arr = args.length > 1 ? args : args[0];
                arr.forEach(function(key){
                    if (this.exists(key)) obj[key] = this[key];
                }, this);
                return obj;
            } else if (typeof args[0] === 'string'){
                if (this.exists(key)) return this[key];
                return null;
            } else return null;
        },
        set: function(){
            var args = [].slice.call(arguments), key, value, obj;
            if (args[0] instanceof Object){
                obj = args[0];
                Object.keys(obj).forEach(function(k){
                    if (!this.has(obj, k)) return;
                    var v, rv;
                    if (obj[k] instanceof Function)
                        rv = obj[k].call(this, k, obj);
                    v = this.def(rv, obj[k]);
                    this[k] = v;
                }, this);
            } else {
                key = args[0]; value = args[1];
                var rv;
                if (value instanceof Function)
                    rv = value.call(this, key);
                this[key] = this.def(rv, value);
            }
        },
        create: function(){
            // Wrapper elements
            this.$wrapper = $('<div>').addClass('MenuScreenWrapper menu-screen-wrapper')
                .attr({ 'id': this.id, 'data-title': this.title, 'data-index': this.index });
            this.$container = $('<section>').addClass('MenuScreen menu-screen');
            // Screen title
            this.$header = $('<header>').addClass('MenuScreenHeader menu-screen-header');
            this.$titlewrapper = $('<div>').addClass('MenuScreenTitleWrapper menu-screen-title-wrapper');
            this.$title = $('<h2>').addClass('MenuScreenTitle menu-screen-title');
            this.$subtitle = $('<h3>').addClass('MenuScreenSubtitle menu-screen-subtitle');
            this.$close = $('<a>').addClass('MenuScreenClose menu-screen-close')
                .attr('href', '#').text('&times;')
                .on('click', $.proxy(this.close, this));
            this.$titlehtml = [this.$title.html(this.title)];
            if (this.exists('subtitle'))
                this.titlehtml.push(this.$subtitle.html(this.subtitle));
            this.$titlewrapper.html(this.$titlehtml);
            this.$title.html([this.$titlewrapper, this.$close]);
            // Screen content
            this.$content = $('<article>').addClass('MenuScreenContent menu-screen-content');
            this.$content.html($.proxy(this.addContent, this));
            // Screen footer
            this.$footer = $('<footer>').addClass('MenuScreenFooter menu-screen-footer');
            this.$toolbar = $('<nav>').addClass('MenuScreenToolbar menu-screen-toolbar');
            this.$buttons = this.buttons.map(this.addButton, this);
            this.$footer.html(this.$toolbar.html(this.buttons));
            // Putting together content
            this.$container.html([this.$header, this.$content, this.$footer]);
            this.$wrapper.html(this.$container);
            return this;
        }
    };
    return (window.MenuScreen = MenuScreen);
}(this, jQuery, mediaWiki)).init();