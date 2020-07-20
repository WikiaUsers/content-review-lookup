(function(window, $, mw, mainRoom){
    var Options = {};
    Options.set = function(){
        var args = [].slice.call(arguments);
        if (typeof args[0] === 'object'){
            Object.keys((obj = args[0])).forEach(function(key){
                var value = obj[key], prev = Options[key] || null;
                if (typeof value == 'function'){
                    var r = value.call(Options, prev, key);
                    if (r !== void 0) value = r;
                }
                Options[key] = value;
            });
        } else {
            if (args[1] === void 0) return;
            var key = args[0], value = args[1], prev = Options[key] || null;
            if (typeof value == 'function'){
                var r = value.call(Options, prev, key);
                if (r !== void 0) value = r;
            }
            Options[key] = value;
        }
    };
    Options.get = function(key){
        if (Array.isArray(key)){
            var obj = {};
            key.forEach(function(k){
                var v = Options[k]; 
                if (v === void 0) obj[k] = null; 
                else obj[k] = Options[k];
            });
            return obj;
        } else {
            var value = Options[key];
            if (value === void 0) return null;
            return value;
        }
    };
    
    Options.roomId = null;
    Options.setRoomId = function(roomId){
        Options.set('roomId', roomId);
        return Options;
    };
    Options.cache = {};
    Options.cache.replace = true;
    Options.cache.items = {};
    Options.cache.set = function(){
        var args = [].slice.call(arguments),
            key = args[0], value = args[1],
            has, replace = Options.cache.replace;
        if (typeof key === 'object'){
            Object.keys((obj = key)).forEach(function(k, i){
                var v = obj[k], h = Options.cache.items.hasOwnProperty(k);
                if (h && !replace){}
                else {
                    var r = v.call(Options.cache, obj);
                    if (r !== void 0) v = r;
                    Options.cache.items[k] = v;
                }
            });
        } else {
            has = Options.cache.items.hasOwnProperty(key);
            var r = value.call(Options.cache, key);
            if (r !== void 0) value = r;
            if (has && !replace) return;
            Options.cache.items[key] = value;
        }
    };
    Options.cache.get = function(key){
        if (Array.isArray(key)){
            var obj = {};
            key.forEach(function(k){
                var v = Options.cache.items[k];
                if (v === void 0) obj[k] = null;
                else obj[k] = v;
            });
            return obj;
        } else {
            var value = Options.cache.items[key];
            if (value === void 0) return null;
            return value;
        }
    };
    Options.cache.has = function(key){
        return Options.cache.get(key) !== null;
    };
    Options.cache.is = function(key, value){
        var v = Options.cache.get(key);
        return (Options.cache.has(key) && v == value);
    };
    Options.cache.remove = function(key){
        if (Options.cache.has(key)) 
            delete Options.cache.items[key];
    };
    Options.storage = {};
    Options.storage.replace = true;
    Options.storage.items = {};
    Options.storage.set = function(){
        var args = [].slice.call(arguments),
            key = args[0], value = args[1],
            has, replace = Options.storage.replace;
        if (typeof key === 'object'){
            Object.keys((obj = key)).forEach(function(k, i){
                var v = obj[k], h = Options.storage.items.hasOwnProperty(k);
                if (h && !replace){}
                else {
                    var r = v.call(Options.storage, obj);
                    if (r !== void 0) v = r;
                    Options.storage.items[k] = v;
                }
            });
        } else {
            has = Options.storage.items.hasOwnProperty(key);
            var r = value.call(Options.storage, key);
            if (r !== void 0) value = r;
            if (has && !replace) return;
            Options.storage.items[key] = value;
        }
    };
    Options.storage.get = function(key){
        if (Array.isArray(key)){
            var obj = {};
            key.forEach(function(k){
                var v = Options.storage.items[k];
                if (v === void 0) obj[k] = null;
                else obj[k] = v;
            });
            return obj;
        } else {
            var value = Options.storage.items[key];
            if (value === void 0) return null;
            return value;
        }
    };
    Options.storage.has = function(key){
        return Object.prototype.hasOwnProperty.call(Options.storage.items, key);
    };
    Options.storage.is = function(key, value){
        var v = Options.storage.get(key);
        return (Options.storage.has(key) && v == value);
    };
    Options.storage.load = function(){
        var storage = Options.loadStorage('storage'),
            object = Options.JSONParse(storage);
        return object;
    };
    Options.storage.remove = function(key){
        if (Options.storage.has(key)) 
            delete Options.storage.items[key];
    };
    Options.storage.save = function(){
        var items = Options.storage.items,
            json = Options.JSONStringify(items);
        Options.saveStorage('storage', items);
    };
    Options.JSONParse = function(json){
        if (Options.isJSON(json) && typeof json === 'string')
            return JSON.parse(json);
        else return json;
    };
    Options.JSONStringify = function(obj){
        return JSON.stringify(obj);
    };
    Options.isJSON = function(json){
        try { JSON.parse(json); }
        catch (e){ return false; }
        return true;
    };
    Options.modules = {};
    Options.modules.items = {};
    Options.modules.add = function(name, config){
        if (Options.modules.has(name)){
            Object.keys(config).forEach(function(key){
                var value = config[key],
                    r = value.call(Options.modules, key, name);
                if (r !== void 0) value = r;
                Options.modules.set(name, key, value);
            });
        } else {
            var r = config.call(Options.modules, name);
            if (r !== void 0) config = r;
            Options.modules.items[name] = config;
        }
    };
    Options.modules.remove = function(){
        var args = [].slice.call(arguments),
            name = args[0], key = args[1];
        if (key === void 0){
            Object.keys(Options.modules.items[name]).forEach(function(k){
                Options.modules.unset(name, k);
                delete Options.modules.items[name][k];
            });
            delete Options.modules.items[name];
        } else {
            Options.modules.unset(name, key);
            delete Options.modules.items[key];
        }
    };
    Options.modules.set = function(name, key, value){
        var r = value.call(Options.modules, key, name);
        if (r !== void 0) value = r;
        if (Options.modules.has(name, key)){
            Options.modules.items[name][key] = value;
        } else {
            Options.modules.items[name] = {};
            Options.modules.items[name][key] = value;
        }
    };
    Options.modules.unset = function(name, key){
        Options.modules.items[name][key] = void 0;
    };
    Options.modules.get = function(){
        var args = [].slice.call(arguments),
            name = args[0], key = args[1];
        if (Options.modules.has(name)){
            if (key === void 0) return Options.modules.items[name];
            return Options.modules.items[name][key];
        }
    };
    Options.modules.has = function(name){
        return Object.hasOwnProperty.call(Options.modules.items, name);
    };
    Options.modules.forEach = function(callback){
        Object.keys(Options.modules.items).forEach(function(key){
            var value = Options.modules.items[key];
            if (value === void 0) value = null;
            callback.call(Options.modules, key, value, Options.modules.items);
        });
    };
    Options.modules.map = function(callback){
        return Object.keys(Options.modules.items).map(function(key){
            var value = Options.modules.items[key];
            if (value === void 0) value = null;
            return callback.call(Options.modules, key, value, Options.modules.items);
        });
    };
    Options.look = {};
    Options.look.items = {};
    Options.look.add = function(name, config){};
    window.Options = Options;
}(window, jQuery, mediaWiki, mainRoom));