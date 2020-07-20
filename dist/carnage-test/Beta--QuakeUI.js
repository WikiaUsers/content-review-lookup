(function(window, $, mw){
    var UI = $.extend({}, window.UI), aliases = {
        'def': ['val'], 'proxify': ['proxy'],
        'toHTML': ['html', 'getHTML'], 'exists': ['exist'],
        'toElement': ['toSelector', 'getSelector'],
        'store': ['save', 'saveData'], 'load': ['loadData']
    }, insertTo = ['append', 'prepend'], insertDOM = ['after', 'before'];
    
    function QuakeUI(){
        var args = [].slice.call(arguments),
            type, config, opened;
        if (typeof args[0] === 'string'){
            type = args[0];
            config = $.extend({}, args[1]);
            if (args[2] && type == 'modal') opened = args[2];
            else opened = false;
            config.type = type;
        } else if (args[0] instanceof Object){
            config = $.extend({}, args[0]);
            if (args[1] && config.type === 'modal') opened = args[1];
            else opened = false;
        } else if (args[0] instanceof Function){
            var rv = args[0].call(this);
            if (rv instanceof Object) config = $.extend({}, rv);
            else config = {};
        } else config = {};
        this.type = this.def(config.type, '');
        this.validTypes = Object.keys(UI).sort();
        if (this.validTypes.indexOf(this.type) > -1){
            $.extend(this, {
                id: '',
                theme: [],
                callback: $.noop,
                data: {}
            }, this.proxify(UI[this.type]), config);
            return this;
        } else return;
    }
    
    QuakeUI.prototype = {
        constructor: QuakeUI,
        def: function(){
            var args = [].slice.call(arguments), len = args.length, i = 0, v;
            while (typeof v === 'undefined' && i < len){
                v = args[i]; i++;
            }
            if (typeof v === 'undefined') return null;
            return v;
        },
        has: function(){
            var args = [].slice.call(arguments), obj = args[0],
                key = args[1];
            return Object.prototype.hasOwnProperty.call(obj, key);
        },
        merge: function(){
            var args = [].slice.call(arguments), i = 0, len = args.length,
                r = [];
            while (i < len){
                if (!(args[i] instanceof Array)){
                    i++; continue;
                }
                r = r.concat(args[i]);
                i++;
            }
            r = r.filter(function(e, i, a){ return a.indexOf(e) === i; });
            return r;
        },
        exists: function(){
            var args = [].slice.call(arguments), key = args[0], fn, deferred,
                success, fail, ret, rv;
            if (args[1] instanceof Function){
                if (typeof key !== 'string') return;
                ret = typeof args[2] === 'boolean' && args[2] || false;
                if (!ret){
                    deferred = $.Deferred();
                    fn = args[1];
                    success = fn.success || fn;
                    fail = fn.fail || fn instanceof Function && fn || $.noop;
                    $.when(deferred).done($.proxy(success, this))
                        .fail($.proxy(fail, this));
                    if (this.has(this, key)) deferred.resolve();
                    else deferred.reject();
                    return this.has(this, key);
                } else {
                    fn = args[1];
                    rv = fn.apply(this, args.slice(3));
                    if (typeof rv === 'undefined') return this.has(this, key);
                    return this.has(this, key) && rv;
                }
            }
            
            if (key instanceof Array){
                var res = {};
                key.sort().forEach(function(name){
                    res[key] = this.has(this, name);
                }, this);
                return res;
            } else if (typeof key === 'string'){
                return this.has(this, key);
            } else return null;
        },
        proxify: function proxify(){
            var args = [].slice.call(arguments), obj = args[0],
                deep = args[1] || false;
            Object.keys(obj).forEach(function(key){
                var value = obj[key];
                if (value instanceof Function) 
                    obj[key] = $.proxy(value, this);
                else if (value instanceof Object && deep)
                    obj[key] = proxify(value, deep);
            }, this);
            return obj;
        },
        get: function(){
            var args = [].slice.call(arguments);
            if (typeof args[0] === 'string'){
                if (typeof this[key] === 'undefined') return null;
                return this[key];
            } else if (args[0] instanceof Array){
                var obj = {};
                key.sort().forEach(function(k){
                    if (typeof this[k] === 'undefined') obj[k] = null;
                    else obj[k] = this[k];
                }, this);
                return obj;
            }
        },
        set: function(){
            var args = [].slice.call(arguments);
            if (typeof args[0] === 'string'){
                var key = args[0], value, rv;
                if (typeof args[1] === 'undefined') return;
                else if (args[1] instanceof Function){
                    rv = args[1].call(this, key);
                    if (typeof rv !== 'undefined') value = rv;
                    else value = args[1];
                } else value = args[1];
                this[key] = value;
            } else if (args[0] instanceof Object){
                var obj = args[0];
                Object.keys(obj).sort().forEach(function(key){
                    var value, rv;
                    if (typeof obj[key] === 'undefined') this[key] = null;
                    else if (obj[key] instanceof Function){
                        rv = obj[key].call(this, key, obj);
                        if (typeof rv !== 'undefined') value = rv;
                        else value = obj[key];
                    } else value = obj[key];
                    this[key] = value;
                }, this);
            } else return;
        },
        setData: function(){
            var args = [].slice.call(arguments),
                data = $.extend({}, this.get('data'));
            if (args[0] instanceof Object){
                if (Object.keys(args[0]).length > 0){
                    var res = {}, obj = args[0];
                    Object.keys(obj).sort().forEach(function(key){
                        var value, rv;
                        if (typeof obj[key] === 'undefined') return;
                        else if (obj[key] instanceof Function){
                            rv = obj[key].call(this, key, obj);
                            if (typeof rv === 'undefined') value = obj[key];
                            else value = rv;
                        } else value = obj[key];
                        res[key] = value;
                    }, this);
                    data = $.extend({}, data, res);
                }
            } else if (typeof args[0] === 'string'){
                var key = args[0];
                if (typeof args[1] === 'undefined') return;
                var value = args[1];
                data[key] = value;
            }
            this.set('data', data);
        },
        getData: function(){
            var data = this.get('data'), args = [].slice.call(arguments),
                res = {};
            if (args.length){
                if (typeof args[0] === 'boolean' && args[0]) return data;
                else if (args[0] instanceof Array){
                    args[0].forEach(function(key){ res[key] = data[key] });
                } else if (typeof args[0] === 'string'){
                    var key = args[0], value = data[key];
                    if (this.has(data, key)) res[key] = value;
                }
            }
            return res;
        },
        store: function(){
            this.storage = this.get('data');
            var JSONString = JSON.stringify(this.storage);
            this.storageKey = 'QuakeUI_' + this.type + '_' + this.id;
            localStorage.setItem(this.storageKey, JSONString);
        },
        load: function(){
            var JSONString = localStorage.getItem(this.storageKey);
            try {
                this.storage = JSON.parse(JSONString);
                this.setData(this.storage);
                return this.storage;
            } catch(e){ return null; }
        },
        toElement: function(){
            return this.$wrapper;
        },
        toHTML: function(){
            return this.$wrapper.prop('outerHTML');
        }
    };
    
    insertTo.forEach(function(fn){
        QuakeUI.prototype[fn + 'To'] = function($target){
            var $elem;
            if ($target instanceof jQuery.fn.init) $elem = $target;
            else $elem = $($target);
            $elem[fn]($.proxy(this.build, this));
        }
    });
    
    insertDOM.forEach(function(fn){
        QuakeUI.prototype[fn] = function($target){
            var $elem;
            if ($target instanceof jQuery.fn.init) $elem = $target;
            else $elem = $($target);
            $elem[fn]($.proxy(this.build, this));
        }
    });
    
    Object.keys(aliases).sort().forEach(function(fn){
        var arr = aliases[fn];
        if (arr instanceof Array){
            arr.sort().forEach(function(alias){
                QuakeUI.prototype[alias] = QuakeUI.prototype[fn];
            });
        } else if (typeof arr === 'string'){
            QuakeUI.prototype[arr] = QuakeUI.prototype[fn];
        } else return;
    });
    
    return (window.QuakeUI = QuakeUI);
}(this, jQuery, mediaWiki)).init();