require(["wikia.window", "jquery", "mw", "ext.wikia.design-system.loading-spinner"],
function PreviewInit(window, $, mw, Spinner){
    var __PREVIEWID__ = 0,
        __NAME__ = "ArticlePreview",
        __VERSION__ = "1.1.0a",
        __USETYPE__ = "stable",
        __TYPE__ = window.APuseVersion || "",
        __DEBUG__ = window.APdebug || false,
        __DISABLED__ = !!window.APdisabled || false,
        __APIURI__ = null;
    
    if (__DISABLED__) return;
    
    if (__TYPE__ === "" || __TYPE__ === "stable"){
        __USETYPE__ = "stable";
    } else if (__TYPE__ === "legacy" || __TYPE__ === "old"){
        __USETYPE__ = "legacy";
    } else if (__TYPE__ === "dev"){
        __USETYPE__ = "dev";
    } else {
        __USETYPE__ = "stable";
    }

    if (__USETYPE__ === "legacy"){
        importArticle({
            type: "script",
            article: "u:dev:MediaWiki:ArticlePreview/code.js"
        });
        return;
    } else if (__USETYPE__ === "dev"){
        importArticle({
            type: "script",
            article: "u:carnage-test:MediaWiki:ArticlePreview/dev.js"
        });
        return;
    } else {}

    function Preview(options){
        if (options === undefined){
            options = {};
        } else if (typeof options === "string"){
            var id = options;
            options = { id: id };
        } else if (typeof options === "object"){
            options = $.extend({}, options);
        } else {
            throw new ReferenceError("The argument in the Preview constructor must be the following: undefined, Object, or String.");
        }

        if (!(this instanceof Preview)){
            return new Preview(options);
        }

        // Primary (constant) properties
        this.__QUEUE = [];
        this.__ELEMCACHE = [];
        this.__CACHE = [];
        this.__DATA = {};
        this.__POS = {};
        this.__CALLBACKS = {};
        this.__EXCEPTIONS = [".free", ".toc a", ".wikia-button", ".button a", ".wikia-menu-button a", ".wds-button", ".button", ".wds-button a", ".external"];
        this.__ALLOWED = ["#mw-content-text", "#WikiaRail"];
        this.__THEME = {};
        this.__I18N = {};
        this.__COMPAT = false;
        this.__NOIMAGE = false;
        this.__ENABLED = true;
        this.__PREVIEWID = __PREVIEWID__;
        this.__APIURI = __APIURI__;

        // Configurable properties
        this.delay = 5;
        this.offset = 2;
        this.orientation = "variable";
        this.maxImgHeight = 600;
        this.maxImgWidth = 450;
        this.defImage = "File:Image placeholder.png";
        this.limit = 500;

        // Plugin objects
        this._colors_ = null;
        this._i18n_ = null;
        this._wds_ = null;
        this._loaded_ = { colors: false, wds: false, i18n: false };

        // Selectors
        this.$currElem = null;
        this.$base = null;
        this.$allowed = null;
        this.$wrapper = null;

        __PREVIEWID__++;

        this.setOpts(options);
    }

    // Static log methods
    Preview.log = function(){
        var a = Array.from(arguments);
        a.unshift(__NAME__);

        if (__DEBUG__) console.log.apply(this, a);
    };

    Preview.error = function(){
        var a = Array.from(arguments);
        a.unshift(__NAME__);

        if (__DEBUG__) console.error.apply(this, a);
    };

    Preview.warn = function(){
        var a = Array.from(arguments);
        a.unshift(__NAME__);

        if (__DEBUG__) console.warn.apply(this, a);
    };

    // Isset method
    Preview.isset = function(value){
        return value !== undefined && value !== null;
    };
    
    // URI methods
    Preview.createUri = function(title){};
    
    Preview.patterns = {};
    
    (function(){
        /* Characters and symbols */
        this._lower = "a-z";
		this._upper = "A-Z";
		this._digits = "0-9";
		this._locale = "\\u00c0-\\u00ff";
		this._wildcard = "(.*)";
		this._wildcardNC = "(?:.*)";
		this._lowerWithDigits = this._lower + this._digits;
		this._upperWithDigits = this._upper + this._digits;
		this._allLetters = this._lower + this._upper;
		this._allLettersWithDigits = this._lower + this._upper + this._digits;
		this._allLettersWithLocale = this._lower + this._upper + this._locale;
		this._allCharacters = this._allLettersWithDigits + this._locale;
		this._query = "\\?&";
		this._hash = "#";
		/* Character ranges */
		this._rangeStart = "[";
		this._rangeEnd = "]";
		this._rangePositiveIntegers = "[" + this._digits + "]";
		this._rangeIntegers = "(?:\\-)?" + this._rangePositiveIntegers;
		this._rangeNumbers = this._rangeIntegers + "*[\\.]?" + this._rangePositiveIntegers + "*" + this._rangePositiveIntegers;
		this._rangeLower = this._rangeStart + this._lower + this._rangeEnd;
		this._rangeUpper = this._rangeStart + this._upper + this._rangeEnd;
		this._rangeLetters = this._rangeStart + this._allLetters + this._rangeEnd;
		this._rangeLettersWithDigits = this._rangeStart + this._allLettersWithDigits + this._rangeEnd;
		this._rangeLettersWithLocale = this._rangeStart + this._allLettersWithLocale + this._rangeEnd;
		this._rangeLettersWithHyphen = this._rangeStart + this._allLettersWithDigits + "\\-" + this._rangeEnd;
		this._rangeLettersWithUnderscore = this._rangeStart + this._allLettersWithDigits + "_" + this._rangeEnd;
		this._rangeLettersWithUnderscoreH = this._rangeStart + this._allLettersWithDigits + "_\\-" + this._rangeEnd;
		this._rangeAllCharacters = this._rangeStart + this._allCharacters + this._rangeEnd;
		this._rangeAllCharactersWithHyphen = this._rangeStart + this._allCharacters + "\\-" + this._rangeEnd;
		/* URL Components */
		// #Protocols
		this.protocols = "https?\\:";
		// #Subdomains
		this.subdomain = this._rangeLettersWithDigits + "*" + this._rangeLettersWithHyphen + "*" + this._rangeLettersWithDigits + "+";
		this.subdomainC = "(" + this.subdomain + ")";
		this.subdomainNC = "(?:" + this.subdomain + ")";
		// #Domain
		this.domain = "(?:wikia|fandom)\\.(?:com|org)";
		this.domainC = "(" + this.domain + ")";
		this.domainNC = "(?:" + this.domain + ")";
		// #Path
		this.path = "\\/" + this._wildcard;
		this.pathNC = "\\/" + this._wildcardNC;
		// ##Wiki
		this.wikipath = "\\/wiki\\/";
		this.wiki = this.wikipath + this._wildcard;
		this.wikiNC = this.wikipath + this._wildcardNC;
		// ##Lang
		this.langFrag = "\\/(" + this._rangeLettersWithUnderscore + "*)";
		this.langFragNC = "\\/(?:" + this._rangeLettersWithUnderscore + "*)";
		this.lang = this.langFrag + "\\/" + this._wildcard;
		this.langNC = this.langFragNC + "\\/" + this._wildcardNC;
		this.langWiki = this.langFrag + "\\/" + this.wiki;
		this.langWikiNC = this.langFragNC + "\\/" + this.wikiNC;
		// ##Index
		this.index = "\\/index\\.php(?:\\?" + this._wildcardNC + ")?[" + this._query + "]title=([^&#]*)(?:&" + this._wildcardNC + ")?";
		this.indexNC = "\\/index\\.php(?:\\?" + this._wildcardNC + ")?[" + this._query + "]title=(?:[^&#]*)(?:&" + this._wildcardNC + ")?";
		// #Query
		this.query = "[" + this._query + "](" + this._rangeLettersWithUnderscore + ")(?:=([^&#]*)|&|" + this._hash + "|\\$)";
		this.queryNC = "[" + this._query + "](?:" + this._rangeLettersWithUnderscore + ")(?:=(?:[^&#]*)|&|" + this._hash + "|\\$)";
		// #Hash
		this.hash = this._hash + "([^&?#]*)";
		this.hashNC = this._hash + "(?:[^&?#]*)";
		// #URL
		// ##Host
		this.host = this.subdomainC + "\\." + this.domainC;
		this.hostNC = this.subdomainNC + "\\." + this.domainNC;
		// ##Full Host
		this.fullhost = this.protocols + "\\/\\/" + this.host;
		this.fullhostNC = this.protocols + "\\/\\/" + this.hostNC;
		// ##Full URL
		this.fullurl = this.fullhost + this.path;
		this.fullurlNC = this.fullhostNC + this.pathNC;
		// ##URL
		this.url = this.host + this.path;
		this.urlNC = this.hostNC + this.pathNC;
		// ##Full Wiki Link
		this.fullwikilink = this.fullhost + this.wiki;
		this.fullwikilinkNC = this.fullhostNC + this.wikiNC;
		// ##Wiki Link
		this.wikilink = this.host + this.wiki;
		this.wikilinkNC = this.hostNC + this.wiki;
		// ##Full index.php Link
		this.fullindexlink = this.fullhost + this.index;
		this.fullindexlinkNC = this.fullhost + this.indexNC;
		// ##Image
		this.imagelink = "(\\." + this.domain + "|(?:vignette|image)\\.wikia\\.nocookie\\.net)$";
		this.fullimagelink = "(?:" + this.protocols + "\\/\\/)" + this.imagelink;
        this.imglink = "(\\." + this.domain + "|(?:vignette|image)\\.wikia\\.nocookie\\.net)";
        this.fullimglink = "(?:" + this.protocols + "\\/\\/)" + this.imglink;
		this.scale = "\\/scale-to-width(?:\\-down|)\\/([\\d]+)?";
		this.scaleNC = "\\/scale-to-width(?:\\-down|)\\/(?:[\\d]+)?";
	}).call(Preview.patterns);
	
	Preview.regex = {};
	
	(function(){
	    // Full links
	    // #Capture
	    this.rfullhost = Preview.generateRegex("fullhost", "gi");
	    this.rfullurl = Preview.generateRegex("fullurl", "gi");
	    this.rfullwikilink = Preview.generateRegex("fullwikilink", "gi");
	    this.rfullindexlink = Preview.generateRegex("fullindexlink", "gi");
	    this.rfullimagelink = Preview.generateRegex("fullimagelink", "");
	    // #Noncapture
	    this.rfullhostnc = Preview.generateRegex("fullhostNC", "gi");
	    this.rfullurlnc = Preview.generateRegex("fullurlNC", "gi");
	    this.rfullwikilinknc = Preview.generateRegex("fullwikilinkNC", "gi");
	    this.rfullindexlinknc = Preview.generateRegex("fullindexlinkNC", "gi");
	    this.rfullimagelinknc = Preview.generateRegex("fullimagelinkNC", "");
 
	    // Short links
	    // #Capture
	    this.rhost = Preview.generateRegex("host", "gi");
	    this.rurl = Preview.generateRegex("url", "gi");
	    this.rwikilink = Preview.generateRegex("wiki", "gi");
	    this.rindexlink = Preview.generateRegex("index", "gi");
	    this.rimagelink = Preview.generateRegex("imagelink", "");
	    // #Noncapture
	    this.rhostnc = Preview.generateRegex("hostNC", "gi");
	    this.rurlnc = Preview.generateRegex("urlNC", "gi");
	    this.rwikilinknc = Preview.generateRegex("wikiNC", "gi");
	    this.rindexlinknc = Preview.generateRegex("indexNC", "gi");
 
	    // Scale
	    // #Capture
	    this.rscale = Preview.generateRegex("scale", "gi");
	    // #Noncapture
	    this.rscalenc = Preview.generateRegex("scaleNC", "gi");
 
	    // Query
	    // #Capture
	    this.rquery = Preview.generateRegex("query", "g");
	    // #Noncapture
	    this.rquerync = Preview.generateRegex("queryNC", "g");
 
	    // Hash
	    // #Capture
	    this.rhash = Preview.generateRegex("hash", "g");
	    // #Noncapture
	    this.rhashnc = Preview.generateRegex("hashNC", "g");
 
	    // Internationalization
	    // #Short lang links
	    this.rlang = Preview.generateRegex("lang", "gi");
	    this.rlangnc = Preview.generateRegex("langNC", "gi");
	    this.rlangwiki = Preview.generateRegex("langWiki", "gi");
	    this.rlangwikinc = Preview.generateRegex("langWikiNC", "gi");
	    // #Full lang links (full host)
	    this.rfulllangfh = Preview.generateRegex(["fullhost", "lang"], "gi");
	    this.rfulllangfhnc = Preview.generateRegex(["fullhostNC", "langNC"], "gi");
	    this.rfulllangwikifh = Preview.generateRegex(["fullhost", "langWiki"], "gi");
	    this.rfulllangwikifhnc = Preview.generateRegex(["fullhostNC", "langWikiNC"], "gi");
	    this.rfulllangindexfh = Preview.generateRegex(["fullhost", "langFrag", "index"], "gi");
	    this.rfulllangindexfhnc = Preview.generateRegex(["fullhostNC", "langFragNC", "indexNC"], "gi");
	    // #Full lang links
	    this.rfulllang = Preview.generateRegex(["host", "lang"], "gi");
	    this.rfulllangnc = Preview.generateRegex(["hostNC", "langNC"], "gi");
	    this.rfulllangwiki = Preview.generateRegex(["host", "langWiki"], "gi");
	    this.rfulllangwikinc = Preview.generateRegex(["hostNC", "langWikiNC"], "gi");
	    this.rfulllangindex = Preview.generateRegex(["host", "langFrag", "index"], "gi");
	    this.rfulllangindexnc = Preview.generateRegex(["hostNc", "langFragNC", "indexNC"], "gi");
	    // #Images
	    this.rimage = Preview.generateRegex("imagelink", "gi");
        this.rfullimage = Preview.generateRegex("fullimagelink", "gi");
        this.rimg = Preview.generateRegex("imglink", "gi");
        this.rfullimglink = Preview.generateRegex("fullimglink", "gi");
	}).call(Preview.regex);
	
	Preview.mw = {};
	
	(function(){
	    this.host = mw.config.get("wgServer");
	    this.page = mw.config.get("wgPageName");
	    this.path = mw.config.get("wgArticlePath");
	    this.action = mw.config.get("wgAction");
	    this.groups = mw.config.get("wgUserGroups");
	    this.ns = mw.config.get("wgNamespaceNumber");
	    this.namespaces = mw.config.get("wgFormattedNamespaces");
	    this.namespaceNumbers = {};
	    this.namespace = this.namespaces[this.ns];
 
	    if (this.namespace === "Main") this.namespace = "";
 
	    var keys = Object.keys(this.namespaces);
 
	    keys.forEach(function(key){
	        var value = this.namespaces[key];
	        this.namespaceNumbers[value] = key;
	    }, this);
 
	    this.isAdmin = false;
	    this.admin = ["staff", "helper", "wiki-manager", "content-team-member", "vstf", "sysop"];
 
	    var c = [].concat(this.admin);
 
	    while (c.length){
	        var d = c.shift();
	        if (this.groups.indexOf(d) > -1){ this.isAdmin = true; break; }
	    }
	}).call(Preview.mw);
	
	Preview.getRegexKey = function(name, opts){
	    var key = "r", patterns = Preview.regex;
	    if (name === undefined || typeof name !== "string") return null;
	    if (opts === undefined || typeof opts !== "object") opts = {};
	    
	    var c = !!opts.capture || true, f = !!opts.full || false,
	        fh = !!opts.fullhost || false, l = !!opts.lang || false;
	    
	    if (f) key = key.concat("full");
	    if (l) key = key.concat("lang");
	    key = key.concat(name);
	    if (fh) key = key.concat("fh");
	    if (!c) key = key.concat("nc");
	    if (!(key in patterns)) return null;
	    return patterns[key];
	};

    Preview.makePattern = function(name, flags){
	    if (flags === undefined) flags = "g";
	    else if (Array.isArray(flags)) flags = flags.join("");
 
	    var result = "", patterns = Preview.patterns;
	    if (Array.isArray(name)){
            while (name.length){
                var key = name.shift(),
                    isInternal = key.indexOf("_", 0) === 0,
                    string = null;
                if (isInternal) continue;
 
                if (!(key in patterns)){
                    var b = "regex:", i = key.indexOf(b, 0);
                    if (i === 0){
                        string = key.slice(b.length).trim();
                    } else continue;
                } else {
                    string = patterns[key];
                }
 
                console.log(string);
 
                if (typeof string !== "string") continue;
 
                result = result.concat(string);
            }
	    } else {
	        var isInternal = name.indexOf("_", 0) === 0, string = null;
	        if (isInternal) return null;
 
	        if (!(name in patterns)){
	            var b = "regex:", i = name.indexOf(b, 0);
	            if (i === 0){
	                string = name.slice(b.length).trim();
	            } else return null;
	        } else {
	            string = patterns[name];
	        }
 
	        if (typeof string !== "string") return null;
 
	        result = result.concat(string);
	    }
 
	    return new RegExp(result, flags);
	};

    Preview.prototype = {
        constructor: Preview,
        setOpts: function setOpts(opts){
            if (opts === undefined || opts === null) opts = {};

            var k = ["exceptions", "allowed"];

            k.forEach(function(key){
                if (key in opts){
                    var value = opts[key], a = [];

                    if (value === undefined){
                        delete opts[key];
                    } else if (["string", "number"].indexOf(typeof value) > -1){
                        opts[key] = [value];
                    } else if (typeof value === "object"){
                        if (!Array.isArray(value)){
                            var l = Object.keys(value), o = {};

                            l.forEach(function(m){
                                var v = value[m];

                                if (!!v){ o[m] = v; }
                            });

                            opts[key] = [o];
                        } else {
                            a = a.concat(opts[key]);

                            opts[key] = a;
                        }
                    }
                }
            });

            this.delay = opts.delay || this.delay;
            this.offset = opts.offset || this.offset;
            this.orientation = opts.orientation || this.orientation;

            var orientations = ["left", "right", "top", "bottom", "fluid"];

            if (orientations.indexOf(this.orientation) === -1){
                this.orientation = "fluid";
            }

            if (this.delay < 0 || !isFinite(this.delay)) this.delay = 0;
            if (this.offset < 0 || !isFinite(this.delay)) this.offset = 0;

            var maxWidth = this.maxImgWidth, maxHeight = this.maxImgHeight,
                size = opts.size || {}, width = size.width || maxWidth, height = size.height || maxHeight;

            width = (width = Number(width)) < 0 ? 0 : width;
            height = (height = Number(height)) < 0 ? 0 : height;

            this.maxImgWidth = (width > maxWidth) ? maxWidth : width;
            this.maxImgHeight = (height > maxHeight) ? maxHeight : height;
            this.defImage = opts.defImage || this.defImage;
            this.limit = opts.limit || this.limit;

            this.__EXCEPTIONS = this.__EXCEPTIONS.concat(opts.exceptions);
            this.__ALLOWED = this.__ALLOWED.concat(opts.allowed);

            if ("include" in opts){
                var inclusions = opts.include, index;
                if (typeof inclusions === "string"){
                    index = this.__EXCEPTIONS.indexOf(inclusions);

                    if (index > -1){
                        this.__EXCEPTIONS.splice(index, 1);
                    }
                } else if (typeof inclusions === "object"){
                    if (Array.isArray(inclusions)){
                        inclusions.forEach(function(inclusion){
                            index = this.__EXCEPTIONS.indexOf(inclusion);

                            if (index > -1){
                                this.__EXCEPTIONS.splice(index, 1);
                            }
                        }, this);
                    } else {}
                } else {}
            }
            this.processTheme();
            this.processTranslations();
            this.processIcons();
        },
        processTheme: function(){
            function setLightness(value, isBright){
                if (isBright === undefined) isBright = true;

                value = Number(value);

                if (isNaN(value)) return 0;

                return !isBright ? value * -1 : value;
            }

            function prep(deferred){
                var ctx = this;
                
                $.when(deferred).done(function(colors){
                    var FANDOMtheme = colors.wikia, isBright = colors.parse(FANDOMtheme.page).isBright();
                    ctx.__THEME = $.extend({}, ctx.__THEME);
                    ctx.__THEME.shadow = colors.parse(FANDOMtheme.menu).lighten(setLightness(-16, isBright)).hex();
                    ctx.__THEME.container = colors.parse(FANDOMtheme.menu).lighten(setLightness(15, isBright)).hex();
                    ctx.__THEME.text = colors.parse(FANDOMtheme.text).lighen(setLightness(25, isBright)).hex();
                    ctx.__THEME.button = colors.parse(FANDOMtheme.menu).lighten(setLightness(4, isBright)).hex();
                    ctx.__THEME.buttonText = colors.parse(FANDOMtheme.text).lighten(setLightness(-7, isBright)).hex();
                    ctx._colors_ = colors;
                    ctx._loaded_.colors = true;
                });
            }

            var $deferred = $.Deferred(prep.bind(this));
            mw.hook("dev.colors").add($deferred.resolve);
        },
        processTranslations: function(){
            function prep(deferred){
                var ctx = this;

                $.when(deferred).done(function(i18no){
                    $.when(i18no.loadMessages(__NAME__)).done(function(i18n){
                        ctx.__I18N = $.extend({}, ctx.__I18n);
                        var msgs = Object.keys(i18n._messages.en);

                        msgs.forEach(function(msg){
                            this[msg] = {};
                            this[msg].parse = i18n.msg(msg).parse();
                            this[msg].escape = i18n.msg(msg).escape();
                            this[msg].plain = i18n.msg(msg).plain();
                            this[msg].replace = function(){
                                var a = Array.from(arguments), o = {}, r = null;
                                a.unshift(msg);

                                r = i18n.msg.apply(i18n, a);
                                o.parse = r.parse();
                                o.escape = r.escape();
                                o.plain = r.plain();

                                return o;
                            }
                        }, ctx.__I18N);
                    });

                    ctx._i18n_ = i18no;
                    ctx._loaded_.i18n = true;
                });
            }

            var $deferred = $.Deferred(prep.bind(this));
            mw.hook("dev.i18n").add($deferred.resolve);
        },
        processIcons: function(){
            function prep(deferred){
                var ctx = this;

                $.when(deferred).done(function(wds){
                    ctx._wds_ = wds;
                    ctx._loaded_.wds = true;
                });
            }

            var $deferred = $.Deferred(prep.bind(this));
            mw.hook("dev.wds").add($deferred.resolve);
        },
        disable: function(){
            var clearAllCaches = false;

            if (arguments.length){
                clearAllCaches = !!arguments[0];
            }

            this.clearQueue();
            this.clearCache(clearAllCaches);
            this.$currElem = null;
            this.__ENABLED = false;
            this.emit("disable");

            return this;
        },
        enable: function(){
            this.__ENABLED = true;
            this.emit("enable");

            return this;
        },
        toggle: function(){
            var state;

            if (arguments.length > 0){
                state = !!arguments[0];
                this.__ENABLED = state;

                return this;
            } else {
                return this.__ENABLED ? this.disable() : this.enable();
            }
        },
        clearQueue: function(){
            var i = 0, l = this.__QUEUE.length;

            for (i; i < l; i++) this.__QUEUE[i] = null;
            this.__QUEUE = this.__QUEUE.filter(Preview.isset);
        },
        clearCache: function(){
            var clearAll = false, i = 0, l = this.__CACHE.length;

            if (arguments.length > 0){
                clearAll = !!arguments[0];
            }

            for (i; i < l; i++) this.__CACHE[i] = null;
            this.__CACHE = this.__CACHE.filter(Preview.isset);

            if (clearAll){
                this.clearElemCache();
            }
        },
        clearElemCache: function(){
            var i = 0, l = this.__ELEMCACHE.length;

            for (i; i < l; i++) this.__ELEMCACHE[i] = null;
            this.__ELEMCACHE = this.__ELEMCACHE.filter(Preview.isset);
        },
        loadContent: function(){
            if (arguments.length === 0) return $.Deferred().reject();
            var page = arguments[0], params = {
                format: "json",
                action: "parse",
                prop: "images|text",
                disablepp: "",
                redirects: ""
            };

            if (typeof page === "object"){
                params = $.extend({}, params, page);
            } else {
                params = $.extend({}, params, { page: page });
            }

            return $.ajax({
                method: "GET",
                dataType: "json",
                url: mw.util.wikiScript("api"),
                data: params
            });
        },
        processContent: function(response){
            if (data.error || !data.parse){
                return;
            }

            var parse = (response || {}).parse,
                image = (parse || {}).images,
                content = (parse || {}).text;
            
            if (image === undefined || image === null){
                image = this.defImage;
            } else {
                image = image.map(function(img){
                    return this.ignoreImage(img) ? false : img;
                }, this).filter(Boolean)[0];
            }

            if (content === undefined || content === null){
                content = Preview.msg("no-content").parse;
            }

            content = this.preprocessText(content);

            var $tmp = $("<div>").html(content);
            $tmp.find("aside").prevAll().remove();
            $tmp.find("aside, table").remove();

            content = $tmp.text();

            content = content ? content.replace(this.__RTAGS, "") : "";

            content = content.trim().substr(0, this.limit);

            content = mw.html.escape(content);

            var title = parse.title || "";

            if (!title){ return; }

            if (content.indexOf(title) > -1){
                var temp = "",
                    i = content.indexOf(title),
                    j = i + title.length,
                    t = "", $t = null;
                
                if (i === 0){
                    temp = content.slice(j);
                    t = content.slice(0, j);
                    $t = $("<span>", { "class": "bold" }).text(t);
                    t = $t.prop("outerHTML");
                    content = t + temp;
                } else {
                    temp = [];
                    temp[0] = content.slice(0, i);
                    temp[1] = content.slice(i, j);
                    temp[2] = content.slice(j);
                    t = temp[1];
                    $t = $("<span>", { "class": "bold" }).text(t);
                    t = $t.prop("outerHTML");
                    temp[1] = t;
                    content = temp.join("");
                }
            }

            this.content = content;
        },
        loadImages: function(){
            if (arguments.length === 0) return $.Deferred().reject();
            var imageSrc = arguments[0], params = {
                action: "query",
                redirects: true,
                iiprop: "url",
                prop: "imageinfo",
                indexpageids: true,
                format: "json"
            };

            if (typeof imageSrc === "object"){
                params = $.extend({}, params, imageSrc);
            } else {
                params = $.extend({}, params, { titles: imageSrc });
            }

            return $.ajax({
                method: "GET",
                dataType: "json",
                url: mw.util.wikiScript("api"),
                data: params
            });
        }
    }
});