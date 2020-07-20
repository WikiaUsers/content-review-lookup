window.QuakeUI = (function(window, $, mw){
    var UI = $.extend({}, window.UI);
 
    function has(){
        var args = [].slice.call(arguments),
            obj = args[0], key = args[1];
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
 
    function val(){
        var args = [].slice.call(arguments),
            len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    }
 
    function QuakeUI(){
        var args = [].slice.call(arguments),
            type, config, opened;
        if (typeof args[0] === 'string'){
            type = args[0];
            config = $.extend({}, args[1]);
            if (typeof args[2] === 'boolean' && type === 'modal')
                opened = args[2];
            config.type = type;
        } else if (typeof args[0] === 'object'){
            config = $.extend({}, args[0]);
            if (typeof args[1] === 'boolean' && type === 'modal');
                opened = args[1];
        } else if (typeof args[0] === 'function'){
            var rv = args[0].call(this);
            if (typeof rv === 'object') config = $.extend({}, rv);
            else config = {};
        } else config = {};
        this.id = val(this.id, config.id, '');
        this.type = val(this.type, config.type, '');
        this.title = val(this.title, config.title, '');
        this.theme = val(this.theme, config.theme, []);
        this.callback = val(this.callback, config.callback, $.noop);
        this.data = val(this.data, config.data, {});
        this.validTypes = Object.keys(UI).sort();
        if (this.validTypes.indexOf(this.type) > -1)
            $.extend(this, this.proxify(UI[this.type]), config.options);
        return this;
    }
 
    QuakeUI.prototype.get = function(){
        if (Array.isArray(key)){
            var obj = {};
            key.forEach($.proxy(function(k){
                if (typeof this[key] !== 'undefined')
                    obj[key] = this[key];
            }, this));
            return obj;
        } else if (typeof key === 'string'){
            if (typeof this.key === 'undefined')
                return null;
            return this[key];
        }
    };
 
    QuakeUI.prototype.set = function(){
        var args = [].slice.call(arguments), key, value;
        if (typeof args[0] === 'object'){
            Object.keys((obj = args[0])).forEach($.proxy(function(k){
                if (typeof obj[k] !== 'undefined'){
                    var v;
                    if (typeof obj[k] === 'function'){
                        var rv = obj[k].call(this, k, obj);
                        if (typeof rv !== 'undefined')
                            v = rv;
                        else
                            v = obj[k];
                    } else {
                        v = obj[k];
                    }
                    this[k] = v;
                }
            }, this));
        } else if (typeof args[0] === 'string'){
            key = args[0];
            value = args[1];
            if (typeof value === 'function'){
                var rv = value.call(this, key);
                if (typeof rv !== 'undefined')
                    value = rv;
            }
            this[key] = value;
        }
    };
 
    QuakeUI.prototype.proxify = function proxify(){
        var args = [].slice.call(arguments), 
            obj = args[0], deep = args[1] || false;
        Object.keys(obj).forEach($.proxy(function(key){
            var value = obj[key];
            if (typeof value === 'function'){
                obj[key] = $.proxy(value, this);
            } else if (typeof value === 'object' && deep){
                obj[key] = proxify(value, deep);
            }
        }, this));
        return obj;
    };
 
    QuakeUI.prototype.$wrapper = $('<div>').addClass('QuakeUI quake-ui');
 
    QuakeUI.prototype.init = function(){
        var html;
        if (typeof this.build === 'function'){
            html = this.build.call(this, this.callback);
            if (typeof html === 'undefined') html = null;
        } else if (typeof this.init === 'function'){
            html = this.init.call(this, this.callback);
            if (typeof html === 'undefined') html = null;
        }
        this.$wrapper.attr('data-type', this.type).html(html);
        return this;
    };
 
    QuakeUI.prototype.toElement = function(){
        return this.$wrapper;
    };
 
    QuakeUI.prototype.toHTML = function(){
        return this.$wrapper.prop('outerHTML');
    };
 
    QuakeUI.prototype.setData = function(){
        var args = [].slice.call(arguments);
        if (typeof args[0] === 'object'){
            var data = $.extend({}, this.data);
            if (Object.keys(data).length > 0)
                data = $.extend({}, data, args[0]);
            this.set('data', data);
        }
    };
 
    QuakeUI.prototype.getData = function(){
        var data = this.get('data'),
            args = [].slice.call(arguments),
            obj = {};
        if (args.length){
            if (Array.isArray(args[0])){
                args[0].forEach(function(key){
                    obj[key] = data[key];
                });
            } else if (typeof args[0] === 'string'){
                obj[args[0]] = data[args[0]];
            }
        } else obj = data;
        return obj;
    };
 
    return QuakeUI;
}(window, jQuery, mediaWiki));