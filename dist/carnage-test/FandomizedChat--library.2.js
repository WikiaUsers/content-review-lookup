require([
    'wikia.window',
    'wikia.document',
    'jquery',
    'mw'
], function(window, document, $, mw){
    'use strict';
    
    // Proxy handler
    var PROXY_HANDLER = Object.freeze({
        get: function(obj, prop){
            return prop in obj ? obj[prop] : null;
        }
    });
    
    // Utility object
    var U = new Proxy({}, PROXY_HANDLER);
    
    // Library object
    var L = new Proxy({}, PROXY_HANDLER);
    
    // Configuration object
    var C = new Proxy(Object.assign({}, window.fcConfig), PROXY_HANDLER);
    
    // Script version
    var VERSION = "v1.4.0";
    
    // Script name
    var NAME = "FandomizedChat";
    
    // Script namespace
    var NAMESPACE = "fc";
    
    // Loaded state
    var LOADED = $.Deferred();
    
    // Failed state
    var FATAL = $.Deferred().reject({
        msg: function(){ return L.msg('loaderror').plain; }
    });
    
    // Core resources
    var SCRIPTS = Object.freeze([
        '/chatbans.js',
        '/hacks.js',
        '/tags.js'
    ]);
    
    // Chat username
    var USERNAME = me.config.get('wgUserName');
    
    // Chat user groups
    var GROUPS = mw.config.get('wgUserGroups');
    
    // Debug
    var DEBUG = USERNAME === "Ultimate Dark Carnage" || C.debug === true;
        
    /* Creating utility methods */
    U.addClass = function addClass(elem, c){
        if (!(Object(elem) instanceof Element)) return false;
        elem.classList.add(c);
        return true;
    };
    
    U.addClasses = function addClasses(elem, classes){
        classes = typeof classes === "string" ? [classes] :
            (Array.isArray(classes) ? classes : false);
        if (classes === false) return false;
        return Array.from(classes).some(U.curry(U.addClass, elem));
    };
    
    U.args = function args(a, l){
        a = Array.from(a);
        l = U.isNumber(l) ? parseInt(l, 10) : 0;
        return l > 0 ? a.slice(l) : a;
    };
    
    U.compare = function compare(array, f, val){
        if (!Array.isArray(array) || !U.isCallable(f)) return null;
        var i = 0, j = 0, a = null, b = null;
        val = U.isset(val) ? val : null;
        return Array.from(array).reduce(function(result, curr, index, arr){
            i = index; j = index + 1;
            a = arr[i]; b = arr[j];
            return f.apply(this, [a, b, result]) || result;
        }, val);
    };
    
    U.compose = function compose(f, g){
        f = U.isCallable(f) ? f : U.noop;
        g = U.isCallable(g) ? g : U.noop;
        return function composer(){
            var a = U.args(arguments);
            return f.call(this, g.apply(this, a));
        };
    };
    
    U.composeAll = function composeAll(){
        var fns = U.args(arguments);
        return function composer(){
            var a = U.args(arguments), r = 0;
            return fns.reduceRight(function(g, f){
                var x = r === 0 ? f.apply(this, g) : f.call(this, g);
                r++;
                return x;
            }, a);
        };
    };
    
    U.curry = function curry(f){
        var a = U.args(arguments, 1);
        if (Array.isArray(a[0])) a = a[0];
        f = U.isCallable(f) ? f : U.noop;
        return function currier(){
            var b = U.args(arguments);
            return f.apply(this, a.concat(b));
        };
    };
    
    U.hasClass = function hasClass(elem, c){
        if (!(Object(elem) instanceof Element)) return false;
        return elem.classList.contains(c);
    };
    
    U.hasClasses = function hasClasses(elem, classes){
        classes = typeof classes === "string" ? [classes] :
            (Array.isArray(classes) ? classes : false);
        if (classes === false) return false;
        return Array.from(classes).every(U.curry(U.hasClass, elem));
    };
    
    U.isCallable = function isCallable(f){
        return Object(f) instanceof Function;
    };
    
    U.isNumber = function isNumber(n){
        return !isNaN(n) && isFinite(n);
    };
    
    U.isset = function isset(n){
        return n !== void 0 || n !== null || n !== "";
    };
    
    U.negate = function negate(f){
        f = U.isCallable(f) ? f : U.noop;
        return function negation(){
            var a = U.args(arguments);
            return f.apply(this, a);
        };
    };
    
    U.noop = function noop(){};
    
    U.not = function not(f){
        var a = U.args(arguments, 1);
        return U.negate(f).apply(this, a);
    };
    
    U.promisify = function promisify(deferred){
        return new Promise(function(resolve, reject){
            $.when(deferred).done(resolve).fail(reject);
        });
    };
    
    U.rcompose = U.pipe = function rcompose(f, g){
        f = U.isCallable(f) ? f : U.noop;
        g = U.isCallable(g) ? g : U.noop;
        return function composer(){
            var a = U.args(arguments);
            return g.call(this, f.apply(this, a));
        };
    };
    
    U.rcomposeAll = U.pipeAll = function rcomposeAll(){
        var fns = U.args(arguments);
        return function composer(){
            var a = U.args(arguments), r = 0;
            return fns.reduce(function(g, f){
                var x = r === 0 ? f.apply(this, g) : f.call(this, g);
                r++;
                return x;
            }, a);
        };
    };
    
    U.rcurry = function curry(f){
        var a = U.args(arguments, 1);
        if (Array.isArray(a[0])) a = a[0];
        f = U.isCallable(f) ? f : U.noop;
        return function currier(){
            var b = U.args(arguments);
            return f.apply(this, b.concat(a));
        };
    };
    
    U.removeClass = function removeClass(elem, c){
        if (!(Object(elem) instanceof Element)) return false;
        elem.classList.remove(c);
        return true;
    };
    
    U.removeClasses = function removeClasses(elem, classes){
        classes = typeof classes === "string" ? [classes] :
            (Array.isArray(classes) ? classes : false);
        if (classes === false) return false;
        return Array.from(classes).some(U.curry(U.removeClass, elem));
    };
    
    U.toggleClass = function toggleClass(elem, c){
        if (!(Object(elem) instanceof Element)) return false;
        elem.classList.toggle(c);
        return true;
    };
    
    U.toggleClasses = function toggleClasses(elem, classes){
        classes = typeof classes === "string" ? [classes] :
            (Array.isArray(classes) ? classes : false);
        if (classes === false) return false;
        return Array.from(classes).some(U.curry(U.toggleClass, elem));
    };
    
    /* Creating core properties */
    L.VERSION = VERSION;
    L.NAME = NAME;
    L.NAMESPACE = NAMESPACE;
    L.USERNAME = USERNAME;
    L.GROUPS = GROUPS;
    
    L.i18n = {};
    L.loadI18n = function loadI18n(){
        mw.hook('dev.i18n').add(L.getMessages);
    };
    L.getMessages = function getMessages(i18no){
        L.i18no = i18no;
        _u.promisify(i18no.loadMessages(L.NAME))
            .then(L.generateI18n);
    };
    L.generateI18n = function generateI18n(i18n){
        L.i18nbase = i18n;
        var messages = Object.keys(i18n._messages.en);
        Array.from(messages).forEach(function(key){
            var message = L.generateMessage(key, i18n);
            L.i18n[key] = message;
        });
    };
    L.generateMessage = function generateMessage(key, i18n){
        var msg = i18n.msg(key), obj = Object.assign({}, {
            __base: msg,
            parse: i18n.msg(key).parse(),
            escape: i18n.msg(key).escape(),
            markdown: i18n.msg(key).markdown(),
            plain: i18n.msg(key).plain()
        });
        obj.replace = function replace(){
            var args = _u.args(arguments);
            args.unshift(key);
            var base = i18n.msg.apply(i18n, args);
            return Object.assign({}, {
                __base: base,
                parse: base.msg(key).parse(),
                escape: base.msg(key).escape(),
                markdown: base.msg(key).markdown(),
                plain: base.msg(key).plain()
            });
        };
        return obj;
    };
    L.msg = function msg(key, name){
        if (arguments.length === 0) return null;
        name = typeof name === "string" ? name : null;
        var types = ['parse', 'escape', 'markdown', 'plain'];
        return _u.isset(name) && types.indexOf(name) > -1 ? 
            L.i18n[key][name] : L.i18n[key];
    };
    
    // Themes
    L.themes = {};
    L.loadThemes = function loadThemes(){
        mw.hook('dev.colors').add(L.getThemes);
    };
    L.getThemes = function getThemes(colors){
        L.colors = colors;
    };
    // Badges
    L.badges = {
        "staff": "staff",
        "helper": "helper",
        "wiki-manager": "admin",
        "vstf": "vstf",
        "global-discussions-moderator": "global-discussions-moderator",
        "content-team-member": "content-moderator",
        "sysop": "admin",
        "discussion-moderator": "discussion-moderator",
        "content-moderator": "content-moderator",
        "chatmoderator": "discussion-moderator"
    };
    L.loadBadges = function loadBadges(){
        mw.hook('dev.wds').add(L.getBadges);
    };
    L.getBadges = function getBadges(wds){
        L.wds = wds;
        Object.keys(L.badges).forEach(function(key){
            var badgeName = L.badges[key];
            L.badges[key] = wds.badge(badgeName);
        });
    };
    L.loadBadges();
    /*
    // Creating the main constructor
    function FC(room){
        this.__openPreloader();
        this.__chatWindow = document.body;
        this.__room = room;
        this.__delay = 2000;
        this.__state = "";
        this.__preloadLength = 0;
        this.__preloadLengthMin = 5000;
        this.__deferredTimeout = null;
        this.__load();
        this.socket = false;
        this.chat = false;
        this.loaded = false;
        Promise.all([
            mw.loader.using(["mediawiki.api", "mediawiki.util"]),
            this.__controller.ready,
            $.ready,
            this.__.preloadDeferred
        ]).then(this.__main.bind(this));
    }
    
    FC.util = Object.assign({}, _u);
    Object.assign(FC, L);
    
    FC.prototype.__openPreloader = function(){
        this.preloader = document.createElement('div');
        _u.addClasses(this.preloader, ['fc-preloader', 'preloader']);
    };*/
});