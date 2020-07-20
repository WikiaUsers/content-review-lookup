window.OptionsLoaded = (function(window, $, mw){
    if (
        (mw.config.get("wgCanonicalSpecialPageName") === "Chat") ||
        ((config = $.extend({}, window.OptionsConfig)).disabled === true)
    ) return false;
    
    var a = [], 
        slice = a.slice, 
        nativeSort = a.sort,
        indexOf = a.indexOf,
        o = {},
        has = o.hasOwnProperty;
        
    /**
     * Creating the main object for ChatOptions
     **/
    var ChatOptions = {
        version: "v2.3a",
        name: "ChatOptions"
    };
    
    // Default value
    function def(){
        var args = slice.call(arguments), value;
        while (args.length){ 
            if ((value = args.shift()) && value !== null) return value; 
        }
        return null;
    }
    
    /**
     * Checking if the required functions are supported
     **/
    var support = {};
    
    // Checking if the storage functions are supported
    support.localStorage = (function(testcase){
        try { localStorage.getItem(testcase); return true; }
        catch (ignore){ return false; }
    }("window"));
    
    /**
     * Creating storage for ChatOptions
     **/
    
    var storage = {};
    
    storage.get = function(key){
        if (support.localStorage){
            return localStorage.getItem(key);
        } else {
            var x, y, cookie_a = document.cookie.split(";");
            for (var i = 0; i < cookie_a.length; i++){
                x = cookie_a[i].substr(0, cookie_a[i].indexOf("="));
                y = cookie_a[i].substr(cookie_a[i].indexOf("=") + 1);
                x = x.trim();
                
                if (x === key){
                    return unescape(y);
                }
            }
        }
    };
    
    storage.set = function(key, value){
        if (support.localStorage){
            return localStorage.setItem(key, value);
        } else {
            var domain = wgServer.split("//")[1];
            document.cookie = 
                key + "=" + value + "; " +
                "max-age=" + (60*60*24*150) + "; " +
                "path=/; domain=" + domain;
        }
    };
    
    storage.remove = function(key){
        if (support.localStorage){
            return localStorage.removeItem(key);
        } else {
            var domain = wgServer.split("//")[1];
            document.cookie = 
                key + "=" + "\"\"" + "; expires=" + -1 + ";" + 
                "path=/; domain=" + domain;
        }
    };
    
    ChatOptions.getItem = function(key){
        return storage.get("ChatOptions-" + key);
    };
    
    ChatOptions.setItem = function(key, value){
        storage.set("ChatOptions-" + key, value);
    };
    
    ChatOptions.removeItem = function(key){
        storage.remove("ChatOptions-" + key);
    };
    
    // The i18n object for ChatOptions
    var i18n = { msgs: {} };
    
    i18n.msg = function(name, type){
        if (typeof type !== "string") type = "_default";
 
        if (!has.call(i18n.msg, name)) return "";
        var msg = i18n.msg[name], res = "";
 
        if (!has.call(msg, type)) type = "_default";
 
        if (type === "_default") type = msg[type];
 
 
        if (type === "replace"){
            var args = [].slice.call(arguments, 2);
            res = msg.replace.apply(msg, args);
        } else res = msg[type]();
 
        return res;
    };
    
    i18n.replace = function(name){
        var args = slice.call(arguments, 1);
        return i18n.msg.apply(i18n.msg, [name, "replace"].concat(args));
    };
    
    ["parse", "plain", "escape"].forEach(function(key){
        i18n[key] = function(name){
            return i18n.msg(name, key);
        };
    });
 
    i18n.load = function(){
        mw.hook("dev.i18n").add(function(i18no){
            i18no.loadMessages("ChatOptions-alpha").done(i18n.getMessages);
        });
    };
    
    i18n.getMessages = function(_i18n){
        var msgs = _i18n._messages["en"];
        Object.keys(msgs).forEach(function(key){
            i18n.msgs[key] = {};
            i18n.msgs[key].parse = _i18n.msg(key).parse();
            i18n.msgs[key].escape = _i18n.msg(key).escape();
            i18n.msgs[key].plain = _i18n.msg(key).plain();
            i18n.msgs[key]._default = "escape";
            i18n.msgs[key].replace = function(){
                var args = slice.call(arguments);
                return _i18n.msgs.apply(_i18n, args).parse();
            };
        });
        i18n.init.resolve();
    };
    
    i18n.init = $.Deferred();
    
    ChatOptions.i18n = i18n;
    
    // The main controller for ChatOptions
    ChatOptions.controller = function(opts){
        if (!(this instanceof ChatOptions.controller)){
            return new ChatOptions.controller(opts);
        }
    };
    
    // The Module constructor for ChatOptions
    ChatOptions.Module = function(opts){
        if (!(this instanceof ChatOptions.Module)){
            return new ChatOptions.Module(opts);
        }
        this.source = def(opts.source, "");
        this.enabled = def(opts.enabled, false);
        this.adminOnly = def(opts.adminOnly, false);
        this.modOnly = def(opts.modOnly, false);
        this.name = def(opts.name, "");
        this.id = def(opts.id, "");
        return this;
    };
    
    // The Look constructor for ChatOptions
    ChatOptions.Look = function(opts){
        if (!(this instanceof ChatOptions.Look)){
            return new ChatOptions.Look(opts);
        }
    };
    
    // The UI constructor for ChatOptions
    ChatOptions.UI = function(opts){
        if (!(this instanceof ChatOptions.UI)){
            return new ChatOptions.UI(opts);
        }    
    };
}(window, this.jQuery, this.mediaWiki));