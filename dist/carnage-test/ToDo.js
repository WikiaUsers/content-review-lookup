require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw",
    require.optional("ext.wikia.design-system.loading-spinner"),
    require.optional("BannerNotification")
], function(window, document, $, mw, Spinner, BannerNotification){
    "use strict";
    // Proxy handler
    var PROXY_HANDLER = Object.freeze({
        get: function getter(object, property){
            return property in object ? object[property] : null;
        }
    });
    // Special page name
    var SPECIAL = mw.config.get('wgCanonicalSpecialPageName');
    // Username
    var USERNAME = mw.config.get('wgUserName');
    // Page path
    var PATH = "User:$1/TODO";
    // Cache
    var CACHE = new Proxy({}, PROXY_HANDLER);
    // To-do entry constructor
    function TODOEntry(options){
        var defaults = TODOEntry.__defaults,
            o = Object.assign({}, options);
        Object.keys(defaults).forEach(function(k){
            o[k] = (o[k] !== null || o[k] !== void 0) ? o[k] : defaults[k];
        }, this);
        this.id = o.id;
        this.parent = o.parent;
        this.subentries = [];
        this.length = 0;
        return this;
    }
    // Defaults for a to-do entry
    TODOEntry.__defaults = Object.freeze({
        parent: null
    });
    // Add an entry
    TODOEntry.prototype.addEntry = function(options){
        var entry = new TODOEntry(options);
        this.length = this.subentries.push(entry);
    };
    // Remove an entry
});