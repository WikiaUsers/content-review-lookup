(function($, mw){
    if (typeof window.Hooks === 'function') return;
    function Hooks(names){
        this.loaded = 0;
        this.load = $.Deferred();
        this.state = '';
        this.keys = (typeof names !== 'undefined') ? names : [];
        this.count = this.keys.length;
        this.args = [];
        this.boundEvents = {};
        return this;
    }
    
    Hooks.prototype.error = Hooks.prototype.fail = function(message){
        var error = new Error();
        error.message = typeof message !== 'undefined' ? message : 'At least one (1) hook is required. Please try again later.';
        error.name = 'ReferenceError';
        this.emit('error');
        throw error;
    };
    
    Hooks.prototype.add = function(callback){
        this.emit('add');
        $.each(this.keys, $.proxy(function(index, key){
            mw.hook(key).add(callback);
        }, this));
        return this;
    };
    
    Hooks.prototype.remove = function(value){
        this.emit('remove', value);
        $.each(this.keys, $.proxy(function(index, key){
            mw.hook(key).remove(value);
        }, this));
        return this;
    };
    
    Hooks.prototype.fire = function(value){
        this.emit('fire', value);
        $.each(this.keys, $.proxy(function(index, key){
            mw.hook(key).fire(value);
        }, this));
        return this;
    };
    
    $.each(['add', 'remove', 'fire'], function(index, name){
        var titleCase = name.substr(0,1).toUpperCase() + name.substr(1),
            multiFn = 'multi' + titleCase,
            progressFn = 'progress' + titleCase;
        Hooks.prototype[multiFn] = function(arg){
            this.emit('multi.' + name, arg);
            this.loaded = this.loaded > 0 ? 0 : this.loaded;
            var _args = [];
            $.each(this.keys, $.proxy(function(index, key){
                this.loaded++;
                mw.hook(key)[name]($.proxy(function(){
                    var args = [].slice.call(arguments);
                    if (args.length){
                        _args[_args.length] = args[0];
                    }
                    if (typeof arg === 'function' && this.loaded === this.count){
                        $.when(this.load).done($.proxy(function(_a){
                            this.state = 'complete';
                            arg.apply(window, _a);
                        }, this));
                        this.load.resolve(_args);
                    }
                }, this));
            }, this));
            return this;
        };
        
        Hooks.prototype[progressFn] = function(arg){
            this.emit('progress.' + name, arg);
            this.loaded = this.loaded > 0 ? 0 : this.loaded;
            $.each(this.keys, $.proxy(function(index, key){
                this.loaded++;
                mw.hook(key)[name]($.proxy(function(){
                    var args = [].slice.call(arguments);
                    if (typeof arg === 'function'){
                        arg.apply(window, args);
                        if (this.loaded === this.count){
                            this.state = 'complete';
                        } else {
                            this.state = 'pending';
                        }
                        this.emit('progress', {
                            loaded: this.loaded,
                            total: this.count,
                            state: this.state,
                            type: name
                        });
                    }
                }, this));
            }, this));
        };
    });
    
    Hooks.prototype.emit = function(){
        var name, args, _a = [].slice.call(arguments);
        name = _a.slice(0,1);
        args = _a.slice(1);
        if (this.boundEvents.hasOwnProperty(name)){
            $.each(this.boundEvents[name], $.proxy(function(index, fn){
                var callback = null;
                if (typeof fn === 'function'){
                    callback = fn;
                    callback.apply(window, args);
                } else if (typeof fn === 'string'){
                    if (this.boundEvents.hasOwnProperty(fn)){
                        $.each(this.boundEvents[fn], $.proxy(function(i, f){
                            var cb = null;
                            if (typeof f === 'function'){
                                cb = f;
                            } else {
                                cb = $.noop;
                            }
                            cb.apply(window, args);
                        }, this));
                    } else {
                        callback = $.noop;
                        callback.apply(window, args);
                    }
                } else {
                    callback = $.noop;
                    callback.apply(window, args);
                }
            }, this));
        }
    };
    
    $.each(['live', 'delegate', 'bind', 'on'], function(index, name){
        Hooks.prototype[name] = function(){
            var args = [].slice.call(arguments), _n, callback, _a;
            if (typeof args[0] === 'string'){
                _n = args[0];
                if (typeof args[1] === 'object' && args[1] instanceof Array){
                    _a = args[1];
                    if (typeof args[2] === 'function'){
                        callback = args[2];
                    } else {
                        this.error('A callback function is required.');
                    }
                } else if (typeof args[1] === 'function'){
                    callback = args[1];
                } else {
                    this.error('This argument has to be an Array or a Function.');
                }
                if (!Array.isArray(this.boundEvents[_n]) || !this.boundEvents[_n] .length){
                    this.boundEvents[_n] = [callback];
                } else {
                    this.boundEvents[_n][this.boundEvents[_n].length] = callback;
                }
            } else if (typeof args[0] === 'object'){
                $.each(args[0], $.proxy(function(key, fn){
                    if (!Array.isArray(this.boundEvents[key]) || !this.boundEvents[key]){
                        this.boundEvents[key] = [callback];
                    } else {
                        this.boundEvents[key][this.boundEvents[key].length] = callback;
                    }
                }, this));
            } else {
                this.error('The first argument has to be a string or an object.');
            }
        };
        return this;
    });
    
    $.each(['die', 'unbind', 'off', 'undelegate'], function(index, name){
        Hooks.prototype[name] = function(){
            var args = [].slice.call(arguments), _n = args[0];
            if (this.boundEvents.hasOwnProperty(_n)){
                this.boundEvents[_n] = [];
            } else return;
        };
    });
    
    $.each(['debounce', 'delay'], function(index, name){
        Hooks.prototype[name] = function(){
            var args = [].slice.call(arguments), _n, _t, _f, _a;
            if (typeof args[0] === 'string'){
                _n = args[0];
                if (typeof args[1] === 'object' && args[1] instanceof Array){
                    _a = args[1];
                } else if (args[1] === null){
                    _a = [];
                }
                if (typeof args[2] === 'function'){
                    _f = args[2];
                    if (typeof args[3] === 'number'){
                        _t = args[3];
                    } else if (typeof args[3] === 'string'){
                        _t = this.parseTime(args[3]);
                    } else {
                        _t = 1000;
                    }
                    setTimeout($.proxy(function(){
                        this[_n].apply(this, _a);
                    }, this), _t);
                } else this.error('A callback function is required');
            } else this.error('A function name is required.');
        };
    });
    
    Hooks.prototype.parseTime = function(time){
        var timeNames = ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'm'],
            times = [
                ['y', [60, 60, 24, 365]],
                ['mo', [60, 60, 24, 31]],
                ['w', [60, 60, 24, 7]],
                ['d', [60, 60, 24]],
                ['h', [60, 60]],
                ['m', [60]],
                ['s', [1]],
                ['ms', [0.001]]
            ],
            pattern = /([\-\d\.][\d\.]*)([a-z]{1,})/g,
            t = [];
        time = time.split(/\s+/);
        time = time.sort(function(time1, time2){
            var t_n1 = [].slice.call(pattern.exec(time1), 1),
                t_n2 = [].slice.call(pattern.exec(time2), 1);
            if (timeNames.indexOf(t_n1[1]) < timeNames.indexOf(t_n2[1])){
                return -1;
            } else if (timeNames.indexOf(t_n1[1]) > timeNames.indexOf(t_n2[1])){
                return 1;
            } else return 0;
        });
        time = time.map(function(t, index){
            var arr = [].slice.call(pattern.exec(t), 1);
            return arr.map(function(item, i){
                if (!isNaN(item)) return Number(item);
                return item;
            });
        });
        var nTime = [];
        for (var i = 0, _t = []; i < time.length; i++){
            var _t_ = time[i];
            if (_t.indexOf(_t_[1]) > -1) continue;
            _t[_t.length] = _t_[1];
            nTime[nTime.length] = _t_;
        }
        time = nTime;
        var timeN = 1000;
        time = time.map(function(t, index){
            var value = 1;
            for (var i = 0; i < times.length; i++){
                if (t[1] === times[i][0]){
                    value = value * t[0];
                    for (var j = 0, _t = times[i][1]; j < _t.length; j++){
                        value = value * _t[j];
                    }
                }
            }
            return value;
        });
        return timeN * time.reduce(function(a, b){
            return a + b;
        }, 0);
    };
    
    window.Hooks = Hooks;
    mw.hook('dev.hooks').fire(Hooks);
}(jQuery, mediaWiki));