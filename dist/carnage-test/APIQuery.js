(window.dev = window.dev || {}).api = (function(window, $, mw){
    var a = [],
        indexOf = a.indexOf,
        nsort = a.sort,
        slice = a.slice,
        o = {},
        has = o.hasOwnProperty;

    var API = {};
    
    var def = API.def = function(){
        var args = slice.call(arguments), res = null;
        while (args.length && (res === null)){
            if (typeof (value = args.shift()) === "undefined" || value === null)
                continue;
            res = value;
            break;
        }
        return res;
    };
    
    var isset = API.isset = function(value){
        return !((typeof value === "undefined") || (value === null));
    };
    
    var issetAll = API.issetAll = function(){
        var args = slice.call(arguments), last = args.length - 1,
            limit = Infinity, i = 0, value;
        
        if (!(Object(args[last]) instanceof Number)){
            if (!isFinite(args[last])){
                limit = args[last];
                args = args.slice(0, last);
            }
        }
        
        while (args.length){
            value = args.shift();
            if (isset(value)) i++;
        }
        
        if (isFinite(limit) && i === limit) return true;
        else if (i > 0) return true;
        else return false;
    };
    
    API.query = function(options){
        if (!(this instanceof API.query)){
            return new API.query(options);
        }
        
        options = $.extend({}, options);
        
        this.method = def(options.method, "GET");
        
        this.params = {};
        this.params.indexpageids = def(options.indexpageids, false);
        this.params.format = def(options.format, "json");
        this.params.titles = def(options.titles);
        this.params.pageids = def(options.pageids);
        this.params.prop = def(options.prop);
        this.params.list = def(options.list);
        this.params.meta = def(options.meta);
        this.params.generator = def(options.generator);
        this.params.redirects = def(options.redirects);
        this.params.converttitles = def(options.converttitles);
        this.params.revids = def(options.revids);
        this.params["export"] = def(options["export"]);
        this.params.exportnowrap = def(options.exportnowrap);
        this.params.iwurl = def(options.iwurl);
        
        if (def(options.params)){
            this.process(options.params);
        }
        
        return this;
    };
    
    API.query.prototype = {
        constructor: API.query,
        propPrefixes: {
            "info": "in",
            "revisions": "rv",
            "links": "pl",
            "iwlinks": "iw",
            "langlinks": "ll",
            "images": "im",
            "imageinfo": "ii",
            "stashimageinfo": "sii",
            "templates": "tl",
            "category": "cl",
            "extlinks": "el",
            "categoryinfo": "ci",
            "duplicatefiles": "df",
            "pageprops": "pp",
            "infobox": "ib"
        },
        listPrefixes: {
            "allimages": "ai",
            "allpages": "ap",
            "alllinks": "al",
            "allcategories": "ac",
            "allusers": "au",
            "backlinks": "bl",
            "blocks": "bk",
            "categorymembers": "cm",
            "deletedrevs": "dr",
            "embeddedin": "ei",
            "filearchive": "fa",
            "imageusage": "iu",
            "iwbacklinks": "iwbl",
            "langbacklinks": "lbl",
            "logevents": "le",
            "recentchanges": "rc",
            "search": "sr",
            "tags": "tg",
            "usercontribs": "uc",
            "watchlist": "wl",
            "watchlistraw": "wr",
            "exturlusage": "eu",
            "users": "us",
            "random": "rn",
            "protectedtitles": "pt",
            "querypages": "qp",
            "wkdomains": "wk",
            "wkpoppages": "wk",
            "groupmembers": "gm",
            "multilookup": "ml",
            "checkuser": "cu",
            "checkuserlog": "cul",
            "gadgetcategories": "gc",
            "gadgets": "ga",
            "abuselog": "afl",
            "abusefilters": "abf",
            "unconvertedinfoboxes": "",
            "allinfoboxes": "",
            "firstcontributions": "fc",
            "neweditors": "fc"
        },
        metaPrefixes: {
            "siteinfo": "si",
            "userinfo": "ui",
            "allmessages": "am"
        },
        process: function(params){
            var prefix;
            
            if (!issetAll(this.prop, this.meta, this.list, 1)) return this;
            
            if (this.prop !== null){
                if (!(prefix = this.propPrefixes[this.prop])) return this;
            }
            
            if (this.meta !== null){
                if (!(prefix = this.metaPrefixes[this.meta])) return this;
            }
            
            if (this.list !== null){
                if (!(prefix = this.listPrefixes[this.list])) return this;
            }
            
            if (!isset(prefix)) return this;
            
            var obj = {}, keys = Object.keys(params);
            
            while (keys.length){
                var key = keys.shift(),
                    k = key.substr(prefix.length).trim(),
                    value = params[key];
                
                var name = ((n = prefix + k) === key ? key : n);
                
                obj[name] = value;
            }
            
            $.extend(this.params, obj);
            
            return this;
        },
        ajax: function(){
            $.ajax({
                method: this.method,
                dataType: this.params.format,
                url: "/api.php",
                xhr: $.proxy(function(){
                    var xhr = $.ajaxSettings.xhr();
                    
                    xhr.addEventListener("progress", $.proxy(function(event){
                        this.fire("progress", event);
                    }, this));
                    
                    return xhr;
                }, this),
                data: this.params
            }).done($.proxy(function(data){
                if (data.error) this.fire("error fail", data);
                else this.fire("done complete", data);
            }, this)).fail($.proxy(function(error){
                this.fire("error fail", data);
            }, this)).always($.proxy(function(error){
                this.fire("always");
            }, this));
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
        }
    };
    
    // MediaWiki API prop names
    ["info", "revisions", "links", "iwlinks", "langlinks", "images",
     "imageinfo", "stashimageinfo", "templates", "category", "extlinks",
     "categoryinfo", "duplicatefiles", "pageprops", "infobox"]
     .forEach(function(name){
        API[name] = function(options){
            var obj = $.extend({}, options);
            
            obj.params.prop = name;
            
            return API.query(obj);
        };
    });
    
    // MediaWiki API list names
    ["allimages", "allpages", "alllinks", "allcategories", "allusers",
     "backlinks", "blocks", "categorymembers", "deletedrevs", "embeddedin",
     "filearchive", "imageusage", "iwbacklinks", "logevents", "recentchanges",
     "search", "tags", "usercontribs", "watchlist", "watchlistraw",
     "exturlusage", "users", "random", "protectedtitles", "querypages",
     "wkdomains", "wkpoppages", "groupmembers", "multilookup",
     "checkuser", "checkuserlog", "gadgetcategories", "gadgets",
     "abuselog", "abusefilters", "unconvertedinfobox", "allinfoboxes",
     "firstcontributions", "neweditors"]
     .forEach(function(name){
        API[name] = function(options){
            var obj = $.extend({}, options);
            
            obj.params.list = name;
            
            return API.query(obj);
        };
    });
    
    // MediaWiki API meta names
    ["siteinfo", "userinfo", "allmessages"]
     .forEach(function(name){
        API[name] = function(options){
            var obj = $.extend({}, options);
            
            obj.params.meta = name;
            
            return API.query(obj);
        };
    });
    
    return API;
}(window, window.jQuery, window.mediaWiki));