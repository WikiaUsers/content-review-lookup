/**
 * @name                FandomizedChat
 * @version             v1.2.1
 * @author              Ultimate Dark Carnage
 * @description         Modernizes the Fandom chat by adding new features
 *                      and redesigning the core chat.
 * @license             CC-BY-SA
 **/
require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(window, document, $, mw){
    // Determines whether the page has a chat window
    const CHAT = mw.config.get("wgCanonicalSpecialPageName") === "Chat";
    // The primary configuration object
    const CONFIG = Object.assign({}, window.FCConfig, window.FandomizedChatConfig);
    // If the page does not have a chat window, stop the script
    if (!CHAT && Boolean(CONFIG.disabled)) return;
    // The current script version
    const VERSION = "v1.2.1";
    // The script name
    const NAME = "FandomizedChat";
    // Core scripts for FandomizedChat
    const SCRIPTS = Object.freeze([
        "u:dev:MediaWiki:I18n-js/code.js",
        "u:dev:MediaWiki:Colors/code.js",
        "u:dev:MediaWiki:WDSIcons/code.js"
    ]);
    // Importing core scripts
    importArticles({ type: "script", articles: SCRIPTS });
    // Core stylesheets for FandomizedChat
    const STYLESHEETS = Object.freeze([
        "u:dev:MediaWiki:FandomizedChat/code.2.css"
    ]);
    // Debug
    const DEBUG = mw.config.get("wgUserName") === "Ultimate Dark Carnage" ||
        Boolean(CONFIG.debug);
    // Importing core stylesheets
    importArticles({ type: "style", articles: STYLESHEETS });
    // Core internal scripts for FandomizedChat
    const INTSCRIPTS = Object.freeze({
        library: Object.freeze({ 
            name: "fc.library"
        }),
        themes: Object.freeze({
            name: "fc.theme"
        }),
        ui: Object.freeze({
            name: "fc.ui",
            loadAfter: "fc.library"
        }),
        options: Object.freeze({
            name: "fc.options",
            loadAfter: "fc.ui"
        })
    });
    // Creating the core constructor
    function FandomizedChat(config){
        this.$body = $(document.body);
        this.room = mainRoom;
        this.vd = this.room.viewDiscussion;
        this.vu = this.room.viewUsers;
        this.delay = (isNaN(config.delay) || !isFinite(config.delay)) ? 
            parseInt(config.delay, 10) : 0;
        this.__state = "";
        this.__socket = false;
        this.__chat = false;
        this.__loaded = false;
        this.__deferredTimeout = null;
        this.__deferred = $.Deferred(this.__makeDeferred.bind(this));
        this.__resourceLoaded = $.Deferred(this.__loadScripts.bind(this));
        Promise.all([
            mw.loader.using(["mediawiki.api", "mediawiki.util"]),
            this.__resourceLoaded,
            this.__controller.ready,
            $.ready,
            this.__deferred
        ].map(this.__promisify)).then(this.__main.bind(this));
        return this.__preload();
    }
    
    FandomizedChat.prototype.__resources = {
        i18no: { 
            name: "dev.i18n",
            process: function(i18n){
                this.__promisify(i18n.loadMessages(NAME))
                    .then(this.__makeI18n.bind(this));
            }
        },
        colors: "dev.colors",
        wds: "dev.wds"
    };
    
    FandomizedChat.prototype.__loadScripts = function(deferred){
        let d = [], e, f, r, v;
        Object.keys(INTSCRIPTS).forEach(function(key){
            r = INTSCRIPTS[key];
            e = $.Deferred();
            mw.hook(r.name).add(function(){
                v = Array.from(arguments)[0];
                if (typeof r.process === "function"){
                    v = r.process.call(this, v) || null;
                }
                f = { name: r.name };
                f.value = v;
                e.resolve(f);
            }.bind(this));
            d.push(e);
        }, this);
        Promise.all(d.map(this.__promisify)).then(deferred.resolve);
    };
    
    FandomizedChat.prototype.__makeI18n = function(i18n){
        this.i18n = {};
        this.i18nmsg = i18n;
        let messages = this.i18nmsg.__messages.en;
        Object.keys(messages).forEach(function(key){
            this.i18n[key] = {};
            this.i18n[key].__base = this.i18nmsg.msg(key);
            this.__addMessages(key, this.i18n[key].__base);
        }, this);
    };
    
    FandomizedChat.prototype.__addMessages = function(name, obj){
        let types = ["parse", "escape", "plain", "markdown"];
        types.forEach(function(type){
            this.i18n[name][type] = function(){ return obj[type](); };
        }, this);
        this.i18n[name].replace = function(){
            let a, msg;
            (a = Array.from(arguments)).unshift(name);
            msg = this.i18nmsg.msg.apply(this.i18nmsg, a);
            return types.reduce(function(o, type){
                o[type] = function(){ return msg[type](); };
                return o;
            }, {});
        };
    };
    
    FandomizedChat.prototype.__promisify = function(deferred){
        return new Promise(function(resolve, reject){
            deferred.done(resolve).fail(reject);
        });
    };
    
    FandomizedChat.prototype.__addHook = function(hook, callback){
        if (typeof hook !== "string" || typeof callback !== "function") return;
        mw.hook(hook).add(callback.bind(this));
    };
    
    FandomizedChat.prototype.__preload = function(){
        Object.keys(this.__resources).forEach(function(key){
            let obj = this.__resources[key], name, process = null;
            if (typeof obj === "object") name = obj.name;
            else name = obj;
            if (typeof obj.process === "function") process = obj.process;
            this.__addHook(name, function(obj){
                this[key] = obj;
                if (typeof process === "function") process.call(this, obj);
            });
        }, this);
    };
    
    FandomizedChat.prototype.__makeDeferred = function(deferred){
        if (this.delay < 1) return deferred.resolve();
        this.__deferredTimeout = setTimeout(
            this.__initDeferredTimeout.bind(this),
            this.delay,
            deferred
        );
    };
    
    FandomizedChat.prototype.__initDeferredTimeout = function(deferred){
        deferred.resolve();
        clearTimeout(this.__deferredTimeout);
        this.__deferredTimeout = null;
    };
    
    FandomizedChat.prototype.__main = function(){
        if (!(this.room || {}).socket){
            return (this.__failsafe = !this.__failsafe) ?
                setTimeout(this.__main.bind(this), 0) :
                false;
        }
        this.__state = "init";
        mw.hook("fc." + this.__state).fire(this);
        this.__socket();
        if (!this.room.isInitialized) 
            this.room.socket.bind("initial", this.__render.bind(this));
        else
            this.__render();
    };
    
    FandomizedChat.prototype.__socket = function(){
        this.__socket = true;
        this.__state = "socket";
        mw.hook("fc." + this.__state).fire(this);
    };
    
    FandomizedChat.prototype.__render = function(){
        this.__chat = true;
        this.__state = "render";
        mw.hook("fc." + this.__state).fire(this);
    };
    
    FandomizedChat.prototype.__controller = {};
    FandomizedChat.prototype.__controller.$ready = $.Deferred();
    FandomizedChat.prototype.__controller.init = function(){
        let R = this.$ready;
        if (window.NodeChatSocketWrapper) return R.resolve();
        document.querySelector('script[src$="chat_js2"]')
            .addEventListener('load', R.resolve.bind(R));
    };
    
    FandomizedChat.prototype.msg = function(key){
        if (Array.isArray(key)){
            let msgs = Array.from(key);
            if (msgs.length) return null;
            return msgs.reduce(function(obj, msg){
                obj[msg] = this.__i18n[msg];
                return obj;
            }.bind(this), {});
        } else {
            if (typeof key !== "string") return null;
            if (!(key in this.__i18n)) return null;
            return this.__i18n[key];
        }
    };
});