/**
 * @name                ListGroupMembers
 * @version             v1.1.2
 * @author              Ultimate Dark Carnage <https://community.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 * @description         Shows a list of group members
 **/
require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw",
    require.optional("ext.wikia.design-system.loading-spinner")
], function(wk, wd, $, mw, Spinner){
    // Checking if the WDS spinner object exists
    const SPINNER_EXISTS = typeof Spinner !== "undefined";
    // Setting a default limit (500 members per group)
    const LIMIT = 500;
    // Setting the group order
    const GROUP_ORDER = Object.freeze([
        "staff", "helper", "wiki-manager", "vstf", "global-discussions-moderator", "content-team-member",
        "bureaucrat", "sysop", "discussions-moderator", "chatmoderator", "rollback", "bot",
        "codeeditor", "patroller"
    ]);
    // The name of the script
    const NAME = "ListGroupMembers";
    // The version of this script
    const VERSION = "v1.1.2";
    // The main configuration object
    const CONFIG = Object.assign({}, window.LGMConfig);
    // The scripts object
    const SCRIPTS = Object.freeze({
        "legacy": "u:dev:MediaWiki:ListGroupMembers/legacy.js",
        "beta": "u:dev:MediaWiki:ListGroupMembers/beta.js",
        "alpha": "u:dev:MediaWiki:ListGroupMembers/alpha.js"
    });
    
    if (String(CONFIG.useVersion) in SCRIPTS){
        return importArticle({
            type: "script",
            article: SCRIPTS[CONFIG.useVersion]
        });
    }
    
    // Primary resources used to support the script
    const RESOURCES = Object.freeze([
        "u:dev:MediaWiki:I18n-js/code.js",
        "u:dev:MediaWiki:Colors/code.js",
        "u:dev:MediaWiki:WDSIcons/code.js"
    ]);
    
    // Importing all resources
    importArticles({ "type": "script", "articles": RESOURCES });
    
    // The primary stylesheets
    const STYLESHEETS = Object.freeze([
        "u:dev:MediaWiki:ListGroupMembers.css",
        "u:dev:MediaWiki:ListGroupMembers/ui.css"
    ]);
    
    // Importing all stylesheets
    importArticles({ "type": "style", "articles": STYLESHEETS });
    
    // The user cache
    const CACHE = [];
    
    // Creating a random integer constructor
    function RandomInt(x, y){
        if (!(this instanceof RandomInt)) return new RandomInt(x, y);
        let n = 0;
        x = RandomInt.isNumber(x) ? parseInt(x) : -1;
        y = RandomInt.isNumber(y) ? parseInt(y) : 1;
        let r;
        if (y < x){
            r = y;
            y = x;
            x = r;
        }
        n = (Math.random() * (y - x + 1)) + x;
        this.value = n;
        return this;
    }
    
    RandomInt.isNumber = function(n){
        return !isNaN(n) || isFinite(n);
    };
    
    RandomInt.roundFloat = function(n, p){
        if (!RandomInt.isNumber((n = Number(n)))) return 0;
        p = parseInt(p, 10);
        if (!RandomInt.isNumber(p) || p < 1) return Math.round(n);
        let s = Math.pow(10, p);
        let z = [];
        z.push(function(x){ return x * s; });
        z.push(function(x){ return x + 0.5; });
        z.push(Math.floor);
        z.push(function(x){ return x / s; });
        let r = z.reduce(function(x, f){
            return f(x);
        }, n);
        return RandomInt.isNumber(r) ? r : 0;
    };
    
    RandomInt.prototype.round = function(){
        return Math.round(this.value);
    };
    
    RandomInt.prototype.float = function(p){
        return RandomInt.roundFloat(this.value, p);
    };
    
    RandomInt.prototype.ceil = function(){
        return Math.ceil(this.value);
    };
    
    RandomInt.prototype.floor = function(){
        return Math.floor(this.value);
    };
    
    // Creating a constructor for integers
    function RandomInts(x, y, z){
        if (!(this instanceof RandomInts)) return new RandomInts(x, y, z);
        let n = [], r, s, l;
        if (typeof x === "object"){
            x = Object.assign({}, x);
            r = RandomInt.isNumber(x.min) ? parseInt(x.min) : -1;
            s = RandomInt.isNumber(x.max) ? parseInt(x.max) : 1;
            l = RandomInt.isNumber(x.length) ? parseInt(x.length) : 1;
            if (RandomInt.isNumber(y)) l = parseInt(y, 10);
        } else {
            r = RandomInt.isNumber(x) ? parseInt(x) : -1;
            s = RandomInt.isNumber(y) ? parseInt(y) : 1;
            l = RandomInt.isNumber(z) ? parseInt(z) : 1;
        }
        let t;
        if (s < r){
            t = s;
            s = r;
            r = t;
        }
        let i = 1, settled = false;
        while (!settled){
            n.push(RandomInt(r, s));
            if (i++ === l) settled = true;
        }
        this.values = n.sort(function(a, b){
            return a.value - b.value;
        });
        return this;
    }
    
    RandomInts.prototype.min = function(){
        let n = this.values.map(function(o){
            return o.value;
        });
        let r = Math.min.apply(null, n);
        let i = this.values.findIndex(function(a, j){
            return a.value === r;
        });
        return this.values[i];
    };
    
    RandomInts.prototype.max = function(){
        let n = this.values.map(function(o){
            return o.value;
        });
        let r = Math.max.apply(null, n);
        let i = this.values.findIndex(function(a, j){
            return a.value === r;
        });
        return this.values[i];
    };
    
    RandomInts.prototype.round = function(){
        return this.values.map(function(o){
            return o.round();
        });
    };
    
    RandomInts.prototype.ceil = function(){
        return this.values.map(function(o){
            return o.ceil();
        });
    };
    
    RandomInts.prototype.floor = function(){
        return this.values.map(function(o){
            return o.floor();
        });
    };
    
    RandomInts.prototype.float = function(p){
        return this.values.map(function(o){
            return o.float(p);
        });
    };
    
    // The default page for the script to load
    const PAGE = /Special:BlankPage\/LGM/gi;
    
    // Checking if the object is empty
    function E(o){
        for (let _ in Object(o)) return true;
        return false;
    }
    
    // Creating the core object
    function ListGroupMembers(config){
        config = Object.assign({}, config);
        this.users = {};
        this.callbacks = {};
        this.sort = typeof config.sort === "string" ? config.sort : false;
        this.filter = typeof config.filter === "string" ? config.filter : false;
        this.loadOnPage = (typeof config.loadOnPage === "string" || Object(config.loadOnPage) instanceof RegExp) ? config.loadOnPage : PAGE;
        this.delay = (!isNaN(config.delay) || isFinite(config.delay)) ? parseInt(config.delay, 10) : 0;
        if (this.delay < 1) this.delay = 0;
        this.rights = [].concat(GROUP_ORDER);
        this.include = [];
        let e = config.exclude, n = config.rights, r, s;
        if (Array.isArray(n)){
            while ((s = n.shift()) && n.length > 0){
                if (typeof s !== "string") continue;
                this.include.push(s);
            }
        } else {
            if (typeof n === "string") this.include.push(n);
        }
        if (Array.isArray(e)){
            while ((r = e.shift()) && e.length > 0){
                if (typeof r !== "string") continue;
                let i = this.include.indexOf(r);
                if (i === -1) continue;
                this.include.splice(i, 1);
            }
        } else {
            let j = this.include.indexOf(e);
            if (j > -1) this.include.splice(j, 1);
        }
        let c = Object.assign({}, config.conditions);
        if (!E(c)) Object.keys(c).forEach(function(t){
            let v = c[t], k;
            if (typeof v === "function"){
                let m = v.call(this, t);
                if (Boolean(m) === false){
                    k = this.include.indexOf(t);
                    if (k > -1) this.include.splice(k, 1);
                }
            } else if (typeof v === "boolean"){
                if (v === false){
                    k = this.include.indexOf(t);
                    if (k > -1) this.include.splice(k, 1);
                }
            } else {
                v = Boolean(v);
                if (v === false){
                    k = this.include.indexOf(t);
                    if (k > -1) this.include.splice(k, 1);
                }
            }
        }, this);
        this.loaded = false;
        return this.__process();
    }
    
    ListGroupMembers.__sort = {
        name: {
            target: "name",
            handler: function(a, b){ return a.localeCompare(b); }
        },
        group: {
            target: "groups",
            preprocess: function(o){ return this.include.indexOf(o); },
            handler: function(a, b){ return a - b; }
        },
        registration: {
            target: "registration",
            preprocess: function(o){ return new Date(o); },
            handler: function(a, b){ return a - b; }
        },
        random: function(){
            let randomInt = new RandomInt(-1, 1);
            return randomInt.round();
        }
    };
    
    ListGroupMembers.__filter = {
        name: {
            target: "name",
            handler: function(name, options){
                let conditions = [];
                if ("from" in options && "to" in options){
                    let x = options.from || "", y = options.to || "", z;
                    if (y < x){
                        z = y;
                        y = x;
                        x = z;
                    }
                    options.from = x;
                    options.to = y;
                }
                options.from = options.from === "" ? null : options.from;
                options.to = options.to === "" ? null : options.to;
                if (typeof options.from === "string") conditions.push(function(s){ return s >= options.from; });
                if (typeof options.to === "string") conditions.push(function(s){ return s <= options.to; });
                if (conditions.length === 0) return true;
                return conditions.every(function(fn){ return fn(name); });
            }
        },
        group: {
            target: "name",
            handler: function(group, options){
                let conditions = [], inc, exc;
                if ("include" in options && "exclude" in options){
                    inc = [];
                    if (!Array.isArray(options.include) || !Array.isArray(options.exclude)) return false;
                    inc = [].concat(options.include);
                    exc = [].concat(options.exclude), x, i;
                    while ((x = exc.shift()) && exc.length > 0){
                        if ((i = inc.indexOf(x)) === -1) continue;
                        inc.splice(i, 1);
                    }
                    inc = inc.filter(function(g){ return this.include.indexOf(g) > -1; }, this);
                    conditions.push(function(g){ return inc.indexOf(g) > -1; });
                } else {
                    if (Array.isArray(options.include)){
                        inc = options.include.filter(function(g){ return this.include.indexOf(g) > -1; }, this);
                        conditions.push(function(g){ return inc.indexOf(g) > -1; });
                    } else if (Array.isArray(options.exclude)){
                        exc = options.exclude.filter(function(g){ return this.include.indexOf(g) > -1; }, this);
                        conditions.push(function(g){ return exc.indexOf(g) < 0; });
                    } else return false;
                }
                return conditions.every(function(fn){ return fn(group); });
            }
        }
    };
    
    ListGroupMembers.prototype.__process = function(){
        this.
        return this;
    };
});