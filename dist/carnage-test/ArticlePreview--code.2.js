require(["wikia.window", "jquery", "mediawiki", "ext.wikia.design-system.loading-spinner"],
function(window, $, mw, Spinner){
    var a = [], slice = a.slice, each = a.forEach, o = ({}), has = o.hasOwnProperty,
        coreDeps = ["mediawiki.api", "mediawiki.util", "mediawiki.Title", "mediawiki.Uri", "jquery.client"],
        coreScripts = ["u:dev:MediaWiki:Colors/code.js", "u:dev:MediaWiki:I18n-js/code.js"],
        coreStyles = ["u:dev:MediaWiki:ArticlePreview.css"];
    
    // Importing scripts
    importArticles({ type: "script", articles: coreScripts });

    // Importing styles
    importArticles({ type: "style", articles: coreStyles });
    
    // Loading MediaWiki dependencies
    mw.loader.load(coreDeps, null, true);

    // Creating the ArticlePreview object
    function ArticlePreview(options){
        if (!(this instanceof ArticlePreview)){
            return new ArticlePreview(options);
        }
        this.currTarget = {};
        this.loaded = false;
        this.active = false;
        this._callbacks = {};
        this._defaultPos = { left: 5, top: 5 };
        this.i18n = {};
        this.host = mw.config.get("wgServer");
        this.page = mw.config.get("wgPageName");
        this.articlePath = mw.config.get("wgArticlePath");
        this.namespace = mw.config.get("wgNamespaceNumber");
        this.action = mw.config.get("wgAction");
        this.groups = mw.config.get("wgUserGroups");
        this.namespaces = {};
        this.formattedNamespaces = mw.config.get("wgFormattedNamespaces");
        // Regular expression patterns
        this.rlink1 = /https?:\/\/([\w\d\-]*[\w\d]*)\.((?:wikia|fandom)\.(?:org|com))/gi;
        this.rlink2 = /\/(?:wiki\/|index\.php\?title=)(.*)/gi;
        this.rimage1 = /(?:https?:\/\/|)(\.(?:wikia|fandom)\.(?:com|org)|(?:vignette|image)\.wikia\.nocookie\.net)$/;
        this.rimage2 = /(\.wikia\.(com|org)|\.fandom\.com|\.wikia\.nocookie\.net)$/;
        this.rwiki = /^.*?\/wiki\//i;
        this.rscale = /\/scale-to-width(?:-down|)\/([\d]+)\?/;
        // Configurable properties
        this.maxSize = _default(options.maxSize, 350);
        this.noImage = _default(options.noImage, false);
        this.defImage = _default(options.defImage, "File:Image placeholder.png");
        this.maxLength = _is(options.length && options.length > 400, 400, options.length);
        this.exceptions = _merge(
            [".free", ".toc a", ".wikia-button", ".button a", ".wikia-menu-button a",
             ".wds-button", ".button", ".wds-button a", ".new", ".external"],
            options.exceptions
        );
        this.allowed = _merge(
            ["#WikiaRail .rail-module a", "##mw-content-text a", "#article-comments a"],
            options.allowed
        );
        this.buttons = _merge(
            [{ msg: "edit", handler: "?action=edit" },
             { msg: "history", handler: "?action=history"},
             { msg: "delete", handler: "?action=delete", admin: true }], 
            options.buttons
        );
        return this;
    }

    ArticlePreview.prototype = {
        constructor: ArticlePreview,
        fire: function(name){
            var args = slice.call(arguments, 1);
            if (!has.call(this._callbacks, name)){
                this._callbacks[name] = $.Callbacks("memory");
            }
            this._callbacks[name].fireWith(this, args);
        },
        on: function(name, callback){
            if (!has.call(this._callbacks, name)){
                this._callbacks[name] = $.Callbacks("memory");
            }
            this._callbacks[name].add(callback);
        },
        off: function(name, callback){
            callback = _is(Object(callback) instanceof Function, callback);
            if (!has.call(this._callbacks, name)){
                this._callbacks[name] = $.Callbacks("memory");
            }
            if (callback){
                this._callbacks[name].remove(callback);
            } else {
                this._callbacks[name].remove();
            }
        },
        getLinks: function(){
            var $links = $(this.allowed.join(", ")).not(_bind(function(index, elem){
                return $(elem).is(this.exceptions.join(", "));
            }, this));
            this.$links = $links;
        },
        loadI18n: function(){
            mw.hook("dev.i18n").add(_bind(this.setI18n, this));
        },
        setI18n: function(i18no){
            i18no.loadMessages("ArticlePreview").then(_bind(function(i18n){
                var msgs = i18n._messages.en, keys = Object.keys(msgs);
                while (keys.lengh){
                    var msg = keys.shift();
                    this.i18n[msg] = {
                        parse: i18n.msg(msg).parse(),
                        escape: i18n.msg(msg).escape(),
                        plain: i18n.msg(msg).plain,
                        _default: "escape"
                    };
                }
            }, this));
        },
        setNamespaces: function(){
            var namespaces = Object.keys(this.formattedNamespaces);
            while (namespaces.length){
                var key = namespaces.shift(),
                    value = this.formattedNamespaces[key];
                this.namespaces[value] = key;
            }
        },
        checkLink: function(link){
            var m = "";
        },
        getCSS: function(){}
    };

    var _merge = ArticlePreview._merge = function(){
        var target, args = slice.call(arguments);
        while (target === void 0 && args.length){
            var arg = args.shift();
            if (Object(arg) instanceof Array){
                target = arg;
                break;
            }
        }
        if (target === void 0) return;
        while (args.length){
            var value = args.shift();
            if (!(Object(value) instanceof Array)) continue;
            target = target.concat(value);
        }
        return target.filter(function(v, i, arr){
            return arr.indexOf(v) === i;
        });
    };

    var _default = ArticlePreview._default = ArticlePreview._val = function(){
        var args = slice.call(arguments);
        while (args.length){
            var value = args.shift();
            if (typeof value !== "undefined") return value;
        }
        return null;
    };

    var _is = ArticlePreview._is = ArticlePreview._check = function(){
        var args = slice.call(arguments),
            condition = args[0], value1 = args[1],
            value = args[2] || false;
        
        if (Object(condition) instanceof Function){
            condition = condition.call(window);
            if (condition === void 0) condition = false;
        }

        return condition ? (value1 || true) : (value2 || false);
    };

    var _bind = ArticlePreview._bind = function(fn, ctx){
        var args = slice.call(arguments, 2);
        if ("bind" in Function.prototype){
            return fn.bind.apply(fn, [ctx].concat(args));
        } else {
            return $.proxy.apply($, [fn, ctx].concat(args));
        }
    };
});