(function(global, mw, $, factory, undefined){
    if (typeof global.ChatOptions == String(undefined)){
        if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat'){
            factory.apply(global, [mw, $]);
        }
    }
}(typeof window !== 'undefined' ? window : this, mediaWiki, jQuery, function(mw, $){
    var a = {}, b = true;
    a.cookie = {};
    a.cookie.create = function create_cookie(){
        var ret = '', obj = arguments[0];
        Object.keys(obj).forEach(function(key, index, arr){
            var data = typeof obj[key] == 'string' ? obj[key] : '';
            key = key.replace(/[A-Z]/ , function(match){
                return '-' + match.toLowerCase();
            });
            ret += key + '=' + data;
            if (index !== (arr.length - 1)){
                ret += ';';
            }
        });
        return ret;
    };
    a.cookie.set = function set_cookie(){
        var name = arguments[0], data = arguments[1], domain = mw.config.get('wgServer').split('//')[1], obj = {};
        Object.defineProperty(obj, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: data
        });
        $.extend(obj, {
            maxAge: 60*60*24*150,
            path: '/',
            domain: domain
        });
        
        document.cookie = a.cookie.create(obj);
    };
    a.cookie.get = function get_cookie(){
        var name = arguments[0], pos = arguments[1] || NaN, x = null, y = null;
        for (var i = 0, carray = document.cookie.split(';'); i < carray.length; i++){
            x = carray[i].substr(0, carray[i].indexOf('='));
            y = carray[i].substr(carray[i].indexOf('=') + 1);
            x = typeof String.prototype.trim == 'function' ? x.trim() : x.replace(/^\s+|\s+$/g, '');
            if (x === name){
                if (y.indexOf(',') === 1 || isNaN(pos)){
                    return y;
                } else {
                    var style_objects = y.split(/\,(?:\s+|)/g);
                    return unescape(style_objects[pos]);
                }
            }
        }
    };
    a.modules = {};
    a.Module = function Module(name, config){
        config = config || {};
        $.extend(this, {
            name: name,
            cookie_name: config.cookie_name || '',
            main_element: config.element || null,
            enabled: config.enabled || false,
            condition: config.condition || true,
            loaded: config.loaded || false,
            load: config.load || $.noop
        });
        this.getCookie();
        return this;
    };
    a.Module.prototype.getCookie = function getCookie(){
        if (typeof this.cookie_name === 'string'){
            this.enabled = a.cookie.get(this.cookie_name) === "true";
        }
    };
    a.Module.prototype.isEnabled = function isEnabled(){
        if (typeof this.enabled === 'boolean' && !this.enabled){
            return false;
        } else if (this.enabled === true){
            return true;
        } else {
            return null;
        }
    };
    a.Module.prototype.createUI = function createUI(){
        
    };
    this.ChatOptions = a;
}));