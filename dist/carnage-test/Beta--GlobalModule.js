(function(window, $, mw){
    var classes = ['GlobalModule', 'global-module'],
        GMconfig = $.extend({}, window.GlobalModuleConfig),
        aliases = {
            'has': 'hasOwn', 'def': 'val', 'place': 'setPlacement',
            'insert': ['append', 'open'], 'toELement': ['toElem', 'toSelector'],
            'toHTML': 'toString'
        };
    
    function GlobalModule(){
        var title, config, args = [].slice.call(arguments);
        if (typeof args[0] === 'string'){
            title = args[0];
            config = args[1];
            config.title = title;
        } else if (args[0] instanceof Object){
            config = $.extend({}, args[0]);
        } else if (args[0] instanceof Function){
            var rv = args[0].call(this);
            if (rv instanceof Object) config = $.extend({}, rv);
            else config = {};
        } else config = {};
        this.title = this.def(config.title, '');
        this.classes = this.merge([], config.classNames);
        this.trigger = this.def(config.trigger, '');
        this.id = this.def(config.id, '');
        this.buttons = this.merge([], config.buttons);
        this.content = this.def(config.content, '');
        this.callback = this.def(config.callback, null);
        this.delay = this.def(config.delay, 500);
        this.loaded = $.Deferred();
        this.opened = false;
    }
    
    GlobalModule.prototype = {
        constructor: GlobalModule,
        placements: $.extend({
            'rail': {
                target: '#Rail',
                append: function(placement){
                    $(placement).prepend(this.$wrapper);
                }
            },
            'header': {
                target: '#ChatHeader',
                append: function(placement){
                    $(placement).find('h1.wordmark').after(this.$wrapper);
                }
            },
            'textbox': {
                target: '#Write',
                append: function(placement){
                    $(placement).append(this.$wrapper);
                }
            }
        }, GMconfig.placements),
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
        def: function(){
            var args = [].slice.call(arguments), len = args.length, i = 0, v;
            while (typeof v === 'undefined' && i < len){
                v = args[i]; i++;
            }
            if (typeof v === 'undefined') return null;
            return v;
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
            this.storageKey = 'QuakeUI_' + this.id;
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
        create: function(){
            // Wrapper element
            this.$wrapper = $('<section>').addClass(classes.concat(this.classNames).join(' '));
            // Trigger element
            this.$trigger = $('<div>').addClass(this.generateClass('-trigger').join(' '));
            this.$triggerLink = $('<a>').addClass(this.generateClass('-trigger-button').join(' '))
                .html(this.trigger)
                .attr('href', '#')
                .on('click', $.proxy(this.toggle, this));
            this.$trigger.html(this.$triggerLink);
            // Buttons container
            this.$buttonsWrapper = $('<nav>').addClass(this.generateClass('-buttons').join(' '));
            this.$buttons = this.buttons.map(this.generateButton, this);
            this.$buttonsWrapper.html(this.$buttons);
            // Content wrapper
            this.$container = $('<div>').addClass(this.generateClass('-container').join(' ')).hide();
            if (this.content instanceof Array){
                this.sections = this.content;
                this.$sections = this.sections.map(this.generateSection, this);
                this.$container.html(this.$sections);
            } else if (this.content instanceof Object){
                this.sections = Object.keys(this.content).map(function(key){
                    var obj = this.content[key];
                    obj.title = key;
                    return obj;
                }, this);
                this.$sections = this.sections.map(this.generateSection, this);
                this.$container.html(this.$sections);
            } else this.$container.html(this.content);
            this.$wrapperHTML = [this.$trigger, this.$buttonsWrapper, this.$container];
            this.$wrapper.html(this.$wrapperHTML);
        },
        generateClass: function(suffix){
            return classes.map(function(name, index){
                var suff;
                if (index === 1) suff = suffix.replace('-', '__');
                else suff = suffix;
                return name + suff;
            }, this);
        },
        generateSection: function(){},
        generateButton: function(){},
        addButton: function(){},
        toggleSection: function(){},
        toggle: function(){},
        place: function(name){
            var placement;
            if (typeof name === 'string'){
                if (this.has(this.placements, name)){
                    placement = this.placements[name];
                    this.placementName = name;
                    this.$target = $(placement.target);
                    this.insert = function(){
                        placement.append.call(this, placement.target);
                    };
                } else {
                    placement = {};
                    this.placementName = 'custom';
                    this.$target = $(name);
                    this.insert = function(){
                        this.$target.append(this.$wrapper);
                    };
                }
            } else {
                if (name instanceof Element){
                    placement = {};
                    this.placementName = 'custom';
                    this.$target = $(name);
                    this.insert = function(){
                        this.$target.append(this.$wrapper);
                    };
                } else if (name instanceof $.fn.init){
                    placement = {};
                    this.placementName = 'custom';
                    this.$target = name;
                    this.insert = function(){
                        this.$target.append(this.$wrapper);
                    };
                } else return;
            }
        },
        toElement: function(){
            return this.$wrapper;
        },
        toHTML: function(){
            return this.$wrapper.prop('outerHTML');
        }
    };
    
    return (window.GlobalModule = GlobalModule);
}(this, jQuery, mediaWiki));