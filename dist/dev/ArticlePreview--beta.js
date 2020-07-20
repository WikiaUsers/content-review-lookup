/**
 * @title           ArticlePreview
 * @version         v2.0
 * @author          Ultimate Dark Carnage
 * @description     This script allows the viewer to see a preview of
 *                  an article by hovering a local link.
 * @file            File:ArticlePreview_placeholder.png
 **/
require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw",
    require.optional("ext.wikia.design-system.loading-spinner")
], function(window, document, $, mw, Spinner){
    "use strict";
    // Script name
    var NAME = "ArticlePreview";
    // Script version
    var VERSION = "v2.0";
    // Creating a RegExp escape function
    function regesc(string){
        return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    }
    // Checks if the object is empty
    function isEmpty(obj){
        for (var key in obj) return false;
        return true;
    }
    // User groups that allow for admin functions
    var ADMIN_GROUPS = Object.freeze([
        "staff", "helper", "wiki-manager", "content-team-member", "vstf", "sysop"
    ]);
    // The user's rights
    var USER_GROUPS = mw.config.get("wgUserGroups");
    // Checking if the user is allowed to use admin function
    var IS_ADMIN = USER_GROUPS.some(function(group){
        return ADMIN_GROUPS.indexOf(group) > -1;
    });
    // Proxy handler
    var PROXY_HANDLER = Object.freeze({
        get: function getter(object, property){
            return property in object ? object[property] : null;
        }
    });
    // Page cache
    var CACHE = new Proxy({}, PROXY_HANDLER);
    // Scripts to import
    var SCRIPTS = Object.freeze([
        "u:dev:MediaWiki:I18n-js/code.js",
        "u:dev:MediaWiki:Colors/code.js",
        "u:dev:MediaWiki:WDSIcons/code.js"
    ]);
    // Importing integral scripts
    importArticles({ type: 'script', articles: SCRIPTS });
    // Importing the main stylesheet
    importArticle({ type: 'style', article: 'u:dev:MediaWiki:ArticlePreview.css' });
    // Current host name
    var HOST = mw.config.get("wgServer");
    // Current page name
    var PAGE = mw.config.get("wgPageName");
    // Namespace number
    var NAMESPACE = mw.config.get("wgNamespaceNumber");
    // Article path
    var ARTICLE_PATH = mw.config.get('wgArticlePath');
    // Formatted namespaces
    var FORMATTED_NAMESPACES = mw.config.get('wgFormattedNamespaces');
    // Page action
    var ACTION = mw.config.get('wgAction');
    // Database pattern
    var DATABASE_PATTERN = /https?:\/\/([\w\d][\w\d\-\_\.]*[\w\d])\.(?:wikia|fandom)\.(?:com|org)/g;
    // Database name
    var DATABASE_NAME = HOST.replace(DATABASE_PATTERN, '$1');
    // Default configurations
    var DEFAULTS = Object.freeze({
        allowPlaceholder: false,
        force: false,
        exceptions: Object.freeze([
            '.free', '.toc a', '.wikia-button', '.button a', 
            '.wikia-menu-button a', '.wds-button', '.wds-button a',
            '.wds-tabs a', '.wds-dropdown a'
        ]),
        scope: Object.freeze(['#WikiaRail .rail-module', '.mw-content-text']),
        namespaces: Object.freeze([
            "-1", 0, 1, 2, 3, 4, 5, 
            10, 11, 14, 15, 110, 
            111, 500, 501, 502
        ]),
        actions: Object.freeze(["", "view", "history", "purge"]),
        ignorePages: [],
        buttons: [],
        characterLimit: 350,
        delay: 1500
    });
    // Pattern object
    var PATTERNS = Object.freeze({
        fullLink: /^https?:\/\/([\w\d][\w\d\-\_]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/(?:wiki\/|index\.php\?(?:.*\&)?title=)([^?&#]*)(?:.*)?$/,
        wikiLink: /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/?$/,
        wikiLink2: /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/?/,
        wikiLink3: /https?:\/\/(?:[\w\d][\w\d]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/?/,
        database: DATABASE_PATTERN,
        shortLink: /^\/(?:wiki\/|index\.php\?(?:.*\&)?title=)([^?&#]*)(?:.*)?$/,
        ns: /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/(?:wiki\/|index\.php\?(?:.*\&)?title=)([^?&#:]*)\:([^?&#]*)(?:.*)?$/,
        ns2: /^\/(?:wiki\/|index\.php\?(?:.*)?title=)([^?&#]*)(?:.*)?$/,
        urlparams: /[?&]([^?&#=]*)(?:=([^?&#=])|#)/g,
        tags: /<.*>/gm,
        prep: Object.freeze({
            script: /<script[^\>]*>[\s\S]*?<\/script>/gim,
            ref: /<ref>[\s\S]*?<\/ref>/gim
        }),
        image: /^https?:\/\/(?:vignette|image)\.wikia\.nocookie\.net(?:\/.*)$/,
        image2: /(\.(?:wikia(?:\.nocookie)?|fandom)\.(?:com|org|net))$/
    });
    // Namespaces
    var NAMESPACES = Object.keys(namespaces).reduce(function(O, n){
        var namespace = namespaces[n];
        O[namespace] = n;
        return O;
    }, {});
    // Clamp function
    function clamp(n, min, max){
        var x = min, y = max;
        min = y < x ? y : x;
        max = y < x ? x : y;
        if (isNaN(n)) return min;
        n = Number(n);
        return Math.max(min, Math.min(n, max));
    }
    // Promisifying the function
    function promisify(deferred){
        return new Promise(function(resolve, reject){
            $.when(deferred).done(resolve).fail(reject);
        });
    }
    // Creating the controller constructor
    function Controller(options){
        if (!this.__previewLoaded) return new Controller(options);
        options = Object.assign({}, options);
        Object.keys(DEFAULTS).forEach(function(key){
            var curr = options[key] !== void 0 ? options[key] : null;
            options[key] = curr !== null ? curr : DEFAULTS[key];
            if (key === "characterLimit") options[key] = clamp(options[key], 300, 1200);
            else if (key === "delay") options[key] = clamp(options[key], 200, 60*60*1000);
        });
        this.__NAME__ = NAME;
        this.__VERSION__ = VERSION;
        this.isAdmin = IS_ADMIN;
        this.options = options;
        this.patterns = Object.assign({}, PATTERNS);
        this.currentUri = {};
        this.position = { x: 0, y: 0, clientX: 0, clientY: 0 };
        this.__process();
        return this;
    }
    
    Controller.prototype.__process = function __process(){
        this.getLinks = new Links({
            exclude: this.options.exceptions,
            scope: this.options.scope,
            referrer: this
        });
    };
    
    function Links(options){
        if (!this.__length) return new Links(options);
        this.elements = [];
        this.options = Object.assign({}, options);
        this.__length = 0;
        this.__process();
        return this;
    }
    
    Links.prototype.__process = function __process(){
        if (!Array.isArray(this.options.scope)) return false;
        var scope = this.options.scope,
            exceptions = Array.isArray(this.options.exceptions) ? this.options.exceptions : [];
        Array.from(scope).forEach(function(selector){
            var links = document.querySelectorAll(selector + ' a');
        }, this);
    };
});

require(["wikia.window", "jquery", "mw", "ext.wikia.design-system.loading-spinner"], function(window, $, mw, Spinner){
    /**
     * Converting string to objects
     **/
    var toObject = AP.toObject = function toObject(val, ctx){
        ctx = ctx || this;
        var rarr = /([^\[\]\d][^\[\]]*)\[((?:[\d]+)|(?:\".*\")|(?:\'.*\'))\]/g,
            rq1 = /\"(.*)\"/g, rq2 = /\'(.*)\'/g,
            keys = val.split("."), curr = ctx;
        while (keys.length && typeof curr == "object"){
            var key = keys.shift(), prop = "";
            if (rarr.test(key)){
                prop = key.replace(rarr, "$2");
                if (rq1.test(prop)) prop = prop.replace(rq1, "$1");
                else if (rq2.test(prop)) prop = prop.replace(rq2, "$1");
                else { if (!isNaN(prop)) prop = parseInt(prop); else prop = "" }
                key = key.replace(rarr, "$1");
            }
            if (prop) curr = curr[key][prop];
            else curr = curr[key];
        }
        return curr;
    };

    AP.controller = function Controller(options){
        if (!(this instanceof AP.controller)){
            return new AP.controller(options);
        }
        options = $.extend({}, options);
        // MediaWiki variables
        this.formattedNamespaces = mw.config.get("wgFormattedNamespaces");
        this.wikiHost = mw.config.get("wgServer");
        this.userName = mw.config.get("wgUserName");
        this.pageName = mw.config.get("wgPageName");
        this.siteName = mw.config.get("wgSiteName");
        this.articlePath = mw.config.get("wgArticlePath");
        this.namespaceNumber = mw.config.get("wgNamespaceNumber");
        this.action = mw.config.get("wgAction");
        this.namespaces = invert(this.formattedNamespaces);
        this.apiURL = new mw.Uri({ path: mw.config.get("wgScriptPath") + "/api.php" });
        // Constant properties
        this.VERSION = "2.0b";
        this.NAME = "ArticlePreview";
        // Configurable properties
        this.EXCEPTIONS = merge(options.exceptions, [".free", ".toc a", "a.wikia-button", ".wikia-button a", "a.button", ".button a", "a.wds-button", ".wds-button a", ".wikia-menu-button a", ".wds-dropdown a"]);
        this.NAMESPACES = merge(options.namespaces, ["-1", 0, 1, 2, 3, 4, 5, 10, 11, 14, 15, 110, 111, 500, 501, 502]);
        this.ACTIONS = merge(options.actions, ["", "view", "history", "purge"]);
        this.DEFAULT_IMAGE = def(options.defaultImage, options.defImage, "https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png");
        this.IGNORE = merge(options.ignorePages, []);
        this.FORCE_POS = def(options.force, false);
        this.CHAR_LIMIT = Math.min(1200, Math.max(350, def(options.charLimit, 350)));
        this.DELAY = def(!isNaN(options.delay) ? options.delay : null, false);
        this.FADE = def(options.fade === true ? null : options.fade, false);
        this.elems = def(options.elems);
        this.content = def(options.content, "#mw-content-text, #WikiaRail .rail-module");
        this.ronlyinclude = def(options.ronlyinclude, []);
        this.riclasses = def(options.riclasses, []);
        this.riparents = def(options.riparents, []);
        this.ripages = def(options.ripages, []);
        this.riimages = def(options.riimages, []);
        // Elements
        this.$links = null;
        this.$elem = null;
        // Other properties
        this._callbacks = {};
        this.href = "";
        this.uri = {};
        this.hasImage = false;
        this.namespace = "";
        this.ns = 0;
        this.page = "";
        this.ui = null;
        this.isAllowedNs = true;
        this.new = false;
        this.ignorePage = false;
        this.loc = { x: 5, y: 5 };
        this.pos = { x: null, y: null, clientX: null, clientY: null };
        this.IS_ADMIN = isAdmin();
        this.currPage = this.createURIObj(window.location).truepath;
        this.currLink = window.location.href;

        this.rilinks.push(this.currPage);
        this.rilinks.push(new RegExp(this.apiUri.path));
        return this;
    };

    AP.controller.prototype = {
		constructor: AP.controller,
		set state(value){
			this.fire("statechange", { value: value });
		},
        process: function(){
            this.$links = def(this.elems, $(this.content).find("a[href]").not($.proxy(function(i, elem){
                return $(elem).is(this.EXCEPTIONS.join(", "));
            }, this)));
            this.buttons = [{
                name: "edit",
                link: "?action=edit",
                condition: $.proxy(function(){
                    return !this.new;
                }, this)
            }, {
                name: "create",
                link: "?action=edit",
                condition: $.proxy(function(){
                    return this.new;
                }, this)
            }, {
                name: "history",
                link: "?action=history"
            }, {
                name: "delete",
                link: "?action=delete",
                condition: isAdmin
            }, {
                name: "watch",
                link: "?action=watch"
            }];
            this.$links.on({
                "mouseover": $.proxy(this.mouseover, this),
                "mouseout": $.proxy(this.mouseout, this)
            });
            return this;
        },
        check: function(callback){
            var args = slice.call(arguments, 1);
            if (this.rns1.test(this.link)){
                this.namespace = this.link.replace(this.rns1, "$1");
            } else if (this.rns2.test(this.link)){
                this.namespace = this.link.replace(this.rns2, "$1");
            }

            this.namespace = encodeURIComponent(this.namespace);
            this.ns = this.namespaces[this.namespace];
            this.isAllowedNs = has.call(this.NAMESPACES, this.ns);

            if (this.rfulllink.test(this.link)){
                this.wiki = this.link.replace(this.rfulllink, "$1");
                this.page = this.link.replace(this.rfulllink, "$2");
            } else if (this.rwikilink1.test(this.link)){
                this.wiki = this.link.replace(this.rwikilink1, "$1");
                this.page = this.siteName;
            } else if (this.rshortlink.test(this.link)){
                this.wiki = this.wikiHost.replace(this.rwikilink1, "$1");
                this.page = this.link.replace(this.rshortlink, "$1");
            } else {
                this.wiki = this.wikiHost.replace(this.rwikilink1, "$1");
                this.page = this.siteName;
            }

            this.currWiki = this.wikiHost.replace(this.rwikilink1, "$1");

            this.wiki = encodeURIComponent(this.wiki);
            this.page = encodeURIComponent(this.page);
            this.currWiki = encodeURIComponent(this.currWiki);
            
            if (
                (!$.isEmptyObject(this.uri) && this.uri.interwiki) ||
                (this.IGNORE.indexOf(this.page) > -1) ||
                (this.ignorePage(this.page)) ||
                (!this.isAllowedNs) ||
                (this.wiki !== this.currWiki)
            ) return false;

            return callback.apply(this, args);
        },
        ignorePage: function(page){
            if (!(this.ripages || []).length) return false;
			var res = false;
            for (var i = 0; i < this.ripages.length; i++){
				if (((Object((pattern = this.ripages[i])) instanceof RegExp) ? pattern : {}).test && pattern.test(page)) res = true;
			}
			return res;
		},
		ignoreLink: function(link){
			if (!(this.rilinks || []).length) return false;
			var res = false;
			for (var i = 0; i < this.rilinks.length; i++){
				if (((Object((pattern = this.rilinks[i])) instanceof RegExp) ? pattern : {}).test && pattern.test(link)) res = true;
			}
			return res;
        },
        ignoreImage: function(src){
            if (!(this.rimages || []).length) return false;
            var res = false;
            for (var i = 0; i < this.rimages.length; i++){
                if (((Object((pattern = this.rimages[i])) instanceof RegExp) ? pattern : {}).test && pattern.test(src)) res = true;
            }
            return res;
        },
        load: function(){
            $.ajax({
                method: "GET",
                dataType: "json",
                url: "/api.php",
                xhr: $.proxy(function(){
                    var xhr = $.ajaxSettings.xhr();

                    xhr.addEventListener("progress", $.proxy(function(event){
                        this.fire("progress", [event]);
                    }, this));

                    return xhr;
                }, this),
                data: {
                    format: "json",
                    action: "parse",
                    page: this.page,
                    prop: "images|text",
                    disablepp: "",
                    redirects: ""
                }
            }).done($.proxy(function(data){
                if (data.error || !data.parse){
                    this.state = "failed";
                    this.fire("failed error", data);
                    this.new = true;

                    this.ui.set({
                        type: "new",
                        content: i18n.get("notfound"),
                        image: this.DEFAULT_IMAGE
                    }).addButtons(this.buttons);
                    return this;
                }

                var image = data.parse.images.map(function(img){
                        if (this.ignoreImage(img)) return false;
                        return img;
                    }, this).filter(Boolean)[0],
                    content = data.parse.text["*"];
                if (!image) image = this.DEFAULT_IMAGE;

                if (!content){
                    this.state = "missing";
                    this.fire("missing", data);
                    this.new = true;
                    this.ui.set({
                        type: "missing",
                        content: i18n.get("missing"),
                        image: this.DEFAULT_IMAGE
                    }).addButtons(this.buttons);
                    return this;
                }

                content = this.preprocess(content);
                var $temp = $('<div>').html(content);
                $temp.find("aside").prevAll().remove();
                $temp.find("aside, table").remove();

                // Step 1
                content = $temp.text();
                // Step 2
                content = content ? content.replace(this.rtags, "") : "";
                // Step 3
                content = content.trim().substr(0, this.CHAR_LIMIT);
                // Step 4
                content = mw.html.escape(content);
                // Step 5
                if (content.indexOf(this.page) > -1){
                    content = content.replace(this.page, "<span class='bold'>$&</span>")
                }
                this.ui.set("type", "content");
                this.ui.set("content", content);

                if (image !== this.DEFAULT_IMAGE){
                    var imgSrc = "File:" + image.trim(),
                        apiimage = new mw.Uri({ path: ("interwiki" in this.uri && this.uri.interwiki) || "" + "/api.php" });
                    apiimage.extend({
                        "action": "query",
                        "redirects": true,
                        "titles": imgSrc,
                        "iiprop": "url",
                        "prop": "imageinfo",
                        "format": "json",
                        "indexpageids": true
                    });
                    $.getJSON(apiimage.toString()).done($.proxy(function(response){
                        var img, query = response.query;
                        if (query.redirects && query.redirects.length){
                            var redirect = query.redirects[0],
                                r = redirect.to;
                            if (r.length > 0) r = r[0];
                            else {
                                this.fire("noimage", { image: this.DEFAULT_IMAGE });
                                this.ui.set("image", this.DEFAULT_IMAGE);
                                return this;
                            }
                            var apiimg = apiimage.clone().extend({ titles: r });

                            $.getJSON(apiimg.toString(), $.proxy(function(d){
                                var pageid = d.query.pageids[0];
                                img = data.query.pages[pageid].url;
                                
                                if (img.length > 0) img = img[0];
                                else img = false;

                                if (!img){ 
                                    this.fire("noimage", { image: this.DEFAULT_IMAGE });
                                    this.ui.set("img", this.DEFAULT_IMAGE);
                                } else {
                                    this.fire("imagefound", { image: img });
                                    this.ui.set("img", img);
                                }
                            }, this));
                        } else {
                            var id = query.pageids[0], page = query.pages[id];
                            img = page.imageinfo[0].url;
                            if (img.length > 0) img = img[0];
                            else img = false;

                            if (!img){
                                this.fire("noimage", { image: this.DEFAULT_IMAGE });
                                this.ui.set("image", this.DEFAULT_IMAGE);
                            } else {
                                this.fire("imagefound", { image: img });
                                this.ui.set("image", img);
                            }
                        }
                    }, this)).fail($.proxy(function(){
                        this.fire("imagefail", { image: this.DEFAULT_IMAGE });
                        this.ui.set("image", this.DEFAULT_IMAGE);
                    }, this));
                } else {
                    this.fire("noimage", { image: this.DEFAULT_IMAGE });
                    this.ui.set("image", this.DEFAULT_IMAGE);
				}
				
				this.state = "complete";
                this.fire("complete success", data);
            }, this)).fail($.proxy(function(error){
				this.state = "failed";
                this.fire("error fail", error);
            }, this));
            return this;
        },
        preprocess: function(content){
            if ((Object(this.prep) instanceof Object) || $.isEmptyObject(this.prep)) return "";
            var $temp = $("<div>").html(s);
            if (Object(this.ronlyinclude) instanceof Array){
                content = this.ronlyinclude.map(function(target){
                    var $target = $temp.find(target);
                    if ($target.length){
                        $temp.remove(target);
                        return $target.map(function(){
                            return this.outerHTML;
                        }).toArray().join();
                    } else return false;
                }).filter(Boolean).join() || content;
            }

            Object.keys(this.prep).forEach(function(key){
                var pattern = this.prep[key];
                content = content.replace(pattern, "");
            }, this);

            return s;
        },
        toLink: function(){
            var res = this.link, wikiSrc, page;
            if (this.rfulllink.test(res)){
                wikiSrc = this.rwikilink2.exec(this.link)[0];
                page = res.replace(this.rfulllink, "$2").replace(/\s+/g, "_");
                res = wikiSrc + this.articlePath.replace("$1", page);
            } else if (this.rwikilink1.test(res)){
                wikiSrc = this.rwikilink1.exec(this.link)[0];
                page = this.siteName.replace(/\s+/g, "_");
                res = wikiSrc + this.articlePath.replace("$1", page);
            } else if (this.rshortlink.test(res)){
                wikiSrc = this.wikiHost;
                page = this.link.replace(this.rshortlink, "$1");
                res = wikiSrc + this.articlePath.replace("$1", page);
            } else return this.link;
            return res;
        },
        mouseover: function(event){
            this.$elem = $(event.delegateTarget);
            this.link = this.$elem.attr("href");
            this.currLink = this.toLink();
            this.check(function(){
                this.fire("datachange setdata mouseover");
                this.setData(event);
            });
        },
        mouseout: function(event){
            this.check(function(){
                this.fire("datachange removedata mouseout");
                this.removeData(event);
            });
        },
        createURI: function(){
            this.fire("urichange");
            this.uri = this.createURIObj(this.link);
        },
        createURIObj: function(href){
            var uri = {};
            try {
                uri = new mw.URI(href.toString());
                uri.pathname = uri.path;
                uri.hostname = uri.host;
            } catch (ignore){}

            if (!$.isEmptyObject(uri)){
                try {
                    uri.truepath = decodeURIComponent(uri.pathname.replace(this.rwikilink3, ""));
                    uri.interwiki = h.path.split("/wiki/")[0];
                    uri.islocal = this.articlePath.split("/wiki/")[0] === uri.interwiki;
                } catch (ignore){}
            }
            return uri;
        },
        setData: function(event){
            this.createURI();
            this.pos.x = event.pageX;
            this.pos.y = event.pageY;
            this.pos.clientX = event.clientX;
            this.pos.clientY = event.clientY;
            if (!(Object(this.delay) instanceof Boolean)){
                if (!isNaN(this.delay) && isFinite(this.delay)){
                    this.delay = parseInt(this.delay);
                    setTimeout($.proxy(this.load, this), this.delay);
                } else {
                    this.load();
                }
            } else this.load();
        },
        createUI: function(options){
            if (!this.ui) this.ui = new AP.ui();
            options = $.extend({}, options);
            if (!$.isEmptyObject(options)){
                this.ui.set(options);
            }
            return this;
        },
        openUI: function(){
            if (!this.ui.loaded) this.ui.add();
            this.updateUI();
        },
        updateUI: function(){
            this.ui.process(function(ctx){
                var type = "fadeIn", fade = 200;
                if (isNaN(ctx.FADE) && ctx.FADE !== "default"){
                    fade = Infinity;
                    type = "show";
                } else if (!isNaN(ctx.FADE)){
                    fade = ctx.FADE;
                }
                if (!this.isVisible){
                    if (type === "fadeIn"){
                        this.$elem[type](fade, $.proxy(ctx.calculate, ctx, this));
                    } else {
                        this.$elem[type]($.proxy(ctx.calculate, ctx, this));
                    }
                } else {
                    ctx.calculate.call(ctx, this);
                }
            }, this);
        },
        calculate: function(ui){
            if ((this.pos.clientY + ui.$elem.height()) > $(window).height()){
                this.pos.y -= (ui.$elem.height() + this.loc.y);
            } else {
                this.pos.y += this.loc.y;
            }

            if ((this.pos.clientX + ui.$elem.width()) > $(window).width()){
                this.pos.x -= (ui.$elem.width() + this.loc.x);
            } else {
                this.pos.x += this.loc.x;
            }

            this.pos.x = this.pos.x > 0 ? this.pos.x : 0;
            this.pos.y = this.pos.y > 0 ? this.pos.y : 0;

            ui.$elem.css({
                left: this.FORCE_POS ? $("body").scrollLeft() : this.pos.x,
                top: this.FORCE_POS ? $("body").scrollTop() : this.pos.y
            });
        },
        removeData: function(){
            this.link = "";
            this.closeUI();
        },
        fire: function(name){
            var args = slice.call(arguments, 1);
            name = name.split(" ");
            if (name.length === 1) name = name[0];
            if (typeof name === "string"){
                if (!has.call(this._callbacks, name)) this._callbacks[name] = $.Callbacks("memory");
                this._callbacks[name].fireWith(this, args);
            } else if (Object(name) instanceof Array) {
                name.forEach(function(key){
                    if (!has.call(this._callbacks, key)) this._callbacks[key] = $.Callbacks("memory");
                    this._callbacks[key].fireWith(this, args);
                }, this);
            } else return this;
            return this;
        },
        on: function(name, callback){
            name = name.split(" ");
            if (name.length === 1) name = name[0];
            if (typeof name === "string"){
                if (!has.call(this._callbacks, name)) this._callbacks[name] = $.Callbacks("memory");
                this._callbacks[name].add(callback);
            } else if (Object(name) instanceof Array) {
                name.forEach(function(key){
                    if (!has.call(this._callbacks, key)) this._callbacks[key] = $.Callbacks("memory");
                    this._callbacks[key].add(callback);
                }, this);
            } else return this;
            return this;
        },
        done: function(callback){
            this.on("complete", callback);
            return this;
        },
        fail: function(callback){
            this.on("error", callback);
            return this;
        },
        always: function(callback){
            this.on("always", callback);
            return this;
        },
        missing: function(callback){
            this.on("missing", callback);
            return this;
        }
    };

    AP.ui = function ui(options){
        if (!(this instanceof AP.ui)){
            return new AP.ui(options);
        }
        options = $.extend({}, options);
        this.autoUpdateKeys = ["content", "image", "buttons"];
        this.autoUpdate = def(options.autoUpdate, true);
        this.maxWidth = def(options.maxWidth, 650);
        this.buttons = merge(options.buttons, []);
        this.content = "";
        this.image = "";
        this.isVisible = false;
        this.create();
        return this;
    };

    AP.ui.prototype = {
		constructor: AP.ui,
		set state(value){
			this.fire("statechange", { value: value });
		},
        create: function(){
			this.$wrapper = $("<div>", { "class": "ap__ui" });
			this.$content = $("<figure>", { "class": "ap__content" });
			this.$buttons = $("<nav>", { "class": "ap__toolbar" });
			this.$image = $("<img>", { "class": "ap__image" });
            this.$caption = $("<figcaption>", { "class": "ap__text" });
            this.$options = $("<nav>", { "class": "ap__options" });
            this.$list = $("<section>", { "class": "ap__options-list" });
			return this;
        },
        process: function(callback, context){
            var args = slice.call(arguments), l = 2;
            if (!(this.$wrapper && this.$wrapper.length)) return;
            if (typeof context === "undefined"){
                l = 1; context = this;
            }
            args = slice.call(args, l);
            callback.apply(context, [this].concat(args));
            return this;
        },
        get: function(key){}
    };

    var i18n = AP.i18n = {
        messages: {},
        get: function(msg, type){
            if (!has.call(i18n.messages, msg)) return null;

            var inst = i18n.messages[msg];
            if (typeof type !== "string") type = "_default";
            if (!has.call(inst, type)) type = "_default";

            if (typeof inst[type] === "function") type = "_default";
            return inst[type] || null;
        },
        replace: function(msg){
            var args = slice.call(arguments, 1);
            if (!has.call(i18n.messages, msg)) return null;

            var inst = i18n.messages[msg];
            if (!has.call(inst, "replace")) return i18n.get(msg);
            return inst.replace.apply(inst, args);
        },
        load: function(){
			mw.hook("dev.i18n").add(function(i18no){
				i18no.loadMessages("ArticlePreview").then(function(_i18n){
					var msgs = _i18n._messages["en"];
					Object.keys(msgs).forEach(function(name){
						AP.i18n.messages[name] = {};
						AP.i18n.messages[name].plain = _i18n.msg(name).plain();
						AP.i18n.messages[name].escape = _i18n.msg(name).escape();
						AP.i18n.messages[name].parse = _i18n.msg(name).parse();
						AP.i18n.messages[name].replace = function(){
							var args = slice.call(arguments);
							return _i18n.msg.apply(_i18n, [name].concat(args)).escape();
						};
						AP.i18n.messages[name]._default = "escape";
						AP.i18n.init.resolve();
					});
				}, function(){
					AP.i18n.init.reject();
				});
			});
		},
        init: $.Deferred()
    };

    i18n = AP.i18n;

    var css = AP.css = {
		properties: {},
		set: function(){},
		load: function(){},
        init: $.Deferred()
    };

    var coreDeps = ["mediawiki.api", "mediawiki.util", "mediawiki.Title"];

    mw.loader.load(coreDeps, null, true);

    $.when(
        i18n.init,
        css.init,
        mw.loader.using(coreDeps)
    ).done(function(){
        var config = $.extend({}, window.APConfig);
            mainController = new AP.controller(config);
        
        window.ArticlePreview = AP;
        window.APController = APController;
    });
});