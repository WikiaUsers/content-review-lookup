(function(window, $, mw){
    if (window.GlobalModuleLoaded) return;
    window.GlobalModuleLoaded = true;
    
    const CLASSNAMES = Object.freeze({
        // Wrapper element
        WRAPPER: "GlobalModule global-module",
        // Container element
        CONTAINER: "GlobalModuleContainer global-module__container",
        // Header element
        HEADER: "GlobalModuleHeader global-module__header",
        // Header element > heading
        HEADING: "GlobalModuleHeading global-module__heading",
        // Header element > close
        CLOSE: "GlobalModuleClose global-module__close",
        // Main content
        MAIN: "GlobalModuleMain global-module__main",
        // Navigation
        NAVIGATION: "GlobalModuleNavigation global-module__navigation",
        // Navigation > navigation header
        NAV_HEADER: "GlobalModuleNavHeader global-module__nav-header",
        // Navigation > navigation header > heading
        NAV_HEADING: "GlobalModuleNavHeading global-module__nav-heading",
        // Navigation > navigation element
        NAV: "GlobalModuleNav global-module__nav",
        // Navigation > navigation element > navigation item
        NAV_ITEM: "GlobalModuleNavItem global-module__nav-item",
        // Navigation > navigation element > navigation item > navigation link
        NAV_LINK: "GlobalModuleNavLink global-module__nav-link",
        // Content wrapper
        CONTENT: "GlobalModuleContent global-module__content",
        // Toolbar
        TOOLBAR: "GlobalModuleToolbar global-module__toolbar",
        // Toolbar > button
        BUTTON: "GlobalModuleButton global-module__button",
        // Toolbar > primary button
        BUTTON_PRIMARY: "GlobalModuleButtonPrimary global-module__button-primary"
    });
    
    function curry(fn){
        var args = Array.from(arguments).slice(1);
        return function currier(){
            var a = Array.from(arguments);
            return fn.apply(this, args.concat(a));
        };
    }
    
    function revcurry(fn){
        var args = Array.from(arguments).slice(1);
        return function currier(){
            var a = Array.from(arguments);
            return fn.apply(this, a.concat(args));
        };
    }
    
    function closeIcon(size){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("version", "1.1");
        svg.setAttribute("x", "0px");
        svg.setAttribute("y", "0px");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        
        var viewbox = "0 0 60 60";
        svg.setAttribute("xml:space", "preserve");
        svg.setAttribute("viewBox", viewbox);
        svg.setAttribute("enable-background", "new " + viewbox);
        
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        var lines = [{
            fill: "none",
            stroke: "black",
            "stroke-width": "10",
            transform: "translate(5, 5)",
            "stroke-miterlimit": "10",
            x1: "5", y1: "5",
            x2: "50", y2: "50",
            "stroke-linecap": "round"
        }, {
            fill: "none",
            stroke: "black",
            "stroke-width": "10",
            transform: "translate(5, 5)",
            "stroke-miterlimit": "10",
            x1: "5", y1: "50",
            x2: "50", y2: "5",
            "stroke-linecap": "round"
        }];
        
        lines.forEach(function(line){
            var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
            Object.entries(line).forEach(function(entry){
                var [prop, value] = entry;
                l.setAttribute(prop, value);
            });
            g.appendChild(l);
        });
        
        svg.appendChild(g);
        return svg;
    }
    
    function GlobalModule(content, options){
        options = $.extend({}, options);
        if (typeof content === "object") options = $.extend({}, options, content);
        
        if ("content" in options) content = options.content;
        else if (!("content" in options) && !content) content = "";
        
        this.data = {};
        this.state = false;
        this.sectioned = false;
        this.hasToolbar = false;
        this.hasHeading = false;
        
        this.$wrapper = $("<section>", { "class": CLASSNAMES.WRAPPER });
        this.$container = $("<div>", { "class": CLASSNAMES.CONTAINER });
        
        this.$header = $("<header>", { "class": CLASSNAMES.HEADER });
        this.$heading = $("<h2>", { "class": CLASSNAMES.HEADING });
        this.$close = $("<a>", { "class": CLASSNAMES.CLOSE });

        this.$main = $("<article>", { "class": CLASSNAMES.MAIN });

        this.$navigation = $("<aside>", { "class": CLASSNAMES.NAVIGATION });
        this.$nav_header = $("<header>", { "class": CLASSNAMES.NAV_HEADER });
        this.$nav = $("<ul>", { "class": CLASSNAMES.NAV });

        this.$content = $("<section>", { "class": CLASSNAMES.CONTENT });

        this.$toolbar = $("<footer>", { "class": CLASSNAMES.TOOLBAR });
        
        this.fullscreen = !!options.fullscreen || true;
        this.title = options.title || "";
        this.buttons = options.buttons || [];
        this.id = options.id || "";
        this.theme = options.theme || "";
        
        if (!this.id) throw new ReferenceError("An ID is required for global modules.");
        
        this.process(content);
        return this;
    }
    
    GlobalModule.prototype = {
        constructor: GlobalModule,
        process: function(content){
            if (!this.fullscreen) this.$wrapper.addClass("not-fullscreen");
            
            this.$close.html(this.closeIcon(40));
            this.$close.on("click", this.closeFromButton.bind(this));
            
            if (Array.isArray(content)){
                this.sectioned = true;
                $.when(this.generateContent(content).call(this))
                    .done(this.createContent.bind(this));
            } else {
                this.$content.html(content);
            }
        },
        generateContent: function(content){
            return curry(function(navigation){
                return $.Deferred(curry(function(deferred){
                    this.sections = [];
                    navigation.forEach(function(item){
                        var params = {};
                        if (typeof item !== "object") return;
                        if (!("id" in item)) return;

                        params.id = item.id;
                        params.classNames = item.classNames || "";
                        params.text = item.text || "";
                        params.msg = item.msg || "";

                        params.loadFrom = item.loadFrom || "";

                        this.sections.push(params);
                    }, this);
                    deferred.resolve();
                }).bind(this));
            }, content);
        },
        createContent: function(navigation){
            
        }
    };
    
    
    function processI18n(i18no){
        $.when($.Deferred(function(deferred){
            $.when(i18no.loadMessages("GlobalModule")).done(deferred.resolve);
        })).done(GlobalModule.loadMessages);
    }
    
    GlobalModule.resources = {
        "i18n": { script: "u:dev:MediaWiki:I18n-js/code.js", $deferred: $.Deferred(), processor: processI18n },
        "wds": { script: "u:dev:MediaWiki:WDSIcons/code.js", $deferred: $.Deferred() },
        "colors": { script: "u:dev:MediaWiki:Colors/code.js", $deferred: $.Deferred() },
        "enablewallext": { script: "u:dev:MediaWiki:WgMessageWallsExist.js", $deferred: $.Deferred() }
    };
    
    GlobalModule.i18n = {};
    
    GlobalModule.$deferred = $.Deferred();
    
    GlobalModule.loadResources = function loadResources(){
        var resources = GlobalModule.resources, 
            l = Object.keys(resources).length - 1,
            deferreds = [];
        
        Object.entries(resources).forEach(function(entry, index){
            var [key, value] = entry;
            
            var script = value.script, processor = value.processor || null,
                $deferred = value.$deferred;
            
            deferreds.push($deferred);
            
            if (typeof processor !== "function") processor = null;
            
            function process(){
                return mw.hook("dev." + key).add(function(arg){
                    if (processor !== null) processor(arg);
                    GlobalModule[key === "i18n" ? "i18no" : key] = arg;
                    $deferred.resolve();
                });
            }
            
            $(importArticle({ type: "script", article: script }))
                .on("load", process);
        });
        
        $.when.apply(null, deferreds).done(GlobalModule.$deferred.resolve);
    };
    
    GlobalModule.loadMessages = function(i18n){
        var messages = Object.keys(i18n._messages.en);
        GlobalModule.i18n.messages = {};
        messages.forEach(function(msg){
            this[msg] = {};
            this[msg].parse = i18n.msg(msg).parse();
            this[msg].escape = i18n.msg(msg).escape();
            this[msg].plain = i18n.msg(msg).plain();
            this[msg].replace = function(){
                var a = Array.from(arguments), p = i18n.msg.apply(i18n, a), o = {};
                o.parse = p.parse(); o.escape = p.escape(); o.plain = p.plain();
                return o;
            };
        }, GlobalModule.i18n.messages);
    };
    
    GlobalModule.loadResources();

    window.GlobalModule = GlobalModule;
})(window, jQuery, mediaWiki);