(window.dev = window.dev || {}).clock = (function(window, $, mw){
    var a = [],
        slice = a.slice,
        indexOf = a.indexOf,
        each = a.forEach,
        map = a.map,
        o = {},
        has = o.hasOwnProperty,
        toString = o.toString;
    
    var nsort = a.sort;
    
    var support = {};
    
    support.defineProperty = (function(testcase, key){
        try { Object.defineProperty({}, key, testcase); return true; }
        catch (ignore){ return false; }
    }({ value: 13, enumerable: true, writable: true }, "name"));
    
    if (support.defineProperty){
        Object.defineProperty(Array.prototype, "sort", {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function sort(compareFn){
                var T, A, thisArg, ctx, noctx;
                
                if (arguments.length > 1) T = arguments[1];
                else T = this;
                
                if (typeof compareFn === "function"){
                    if (T === this) return nsort.call(this, compareFn);
                    else {
                        A = [].slice.call(arguments, 2);
                        noctx = false;
                        
                        if (typeof T === "boolean"){
                            if (!T) noctx = true;
                            else ctx = window;
                        } else ctx = T;
                        
                        if (noctx) ctx = this;
                        
                        return nsort.call(this, function(a, b){
                            return compareFn.apply(ctx, [a, b].concat(A));
                        });
                    }
                } else if (typeof compareFn === "undefined"){
                    return nsort.call(this);
                } else {
                    throw new TypeError("The comparison function must be either a function or undefined.");
                }
            }
        });
    } else {
        Array.prototype.sort = function sort(compareFn){
            var T, A, thisArg, ctx, noctx;
 
            if (arguments.length > 1) T = arguments[1];
            else T = this;
 
            if (typeof compareFn === "function"){
                if (T === this) return nsort.call(this, compareFn);
                else {
                    A = [].slice.call(arguments, 2);
                    noctx = false;
 
                    if (typeof T === "boolean"){
                        if (!T) noctx = true;
                        else ctx = window;
                    } else ctx = T;
                    
                    if (noctx) ctx = this;
 
                    return nsort.call(this, function(a, b){
                        return compareFn.apply(ctx, [a, b].concat(A));
                    });
                }
            } else if (typeof compareFn === "undefined"){
                return nsort.call(this);
            } else {
                throw new TypeError("The comparison function must be either a function or undefined.");
            }
        };
    }
    
    support.dateNow = (function(){
        try { Date.now(); return true; }
        catch (ignore){ return false; }
    }());
    
    if (!support.dateNow){
        Date.now = function(){
            return (new Date()).getTime();
        };
    }
    
    // Checking support for Array.prototype methods
    support.filter = (function(testcase){
        try { testcase.filter(function(n){ return n % 2 === 0}); return true; }
        catch (ignore){ return false; }
    }([1,2,3]));
 
    support.map = (function(testcase){
        try { testcase.map(function(n){ return n + "A"; }); return true; }
        catch (ignore){ return false; }
    }(["a", "b", "c"]));
 
    support.forEach = (function(testcase){
        try { testcase.forEach(function(n){ return n; }); return true; }
        catch (ignore){ return false; }
    }(["n", "o"]));
 
    support.every = (function(testcase){
        try { testcase.every(function(n){ return n === true; }); return true; }
        catch (ignore){ return false; }
    }([false, true]));
 
    support.some = (function(testcase){
        try { testcase.some(function(n){ return n === true; }); return true; }
        catch (ignore){ return false; }
    }([false, true]));
 
    support.reduce = (function(testcase){
        try { testcase.reduce(function(a, b){}, []); return true; }
        catch (ignore){ return false; }
    }(["1", "2", "3"]));
 
    if (!support.filter){
        Array.prototype.filter = function filter(fn){
            var T, A, k, c;
 
            if (this === null){
                throw new TypeError("This is null or undefined");
            }
 
            var O = Object(this), len = O.length >>> 0;
 
            if (typeof fn !== "function"){
                throw new TypeError(fn + " is not a function");
            }
 
            if (arguments.length > 1){
                T = arguments[1];
            } else T = this;
 
            A = new Array(len);
 
            k = 0;
 
            c = 0;
 
            while (k < len){
                var kValue, filterCond;
 
                if (k in O){
                    kValue = O[k];
 
                    filterCond = fn.call(T, kValue, k, O);
 
                    if (filterCond){
                        A[c] = kValue;
                        c++;
                    }
                }
 
                k++;
            }
 
            A.length = c;
            return A;
        };
    }
 
    if (!support.map){
        Array.prototype.map = function map(fn){
            var T, A, k;
 
            if (this === null){
                throw new TypeError("This is null or undefined");
            }
 
            var O = Object(this), len = O.length >>> 0;
 
            if (typeof fn !== "function"){
                throw new TypeError(fn + " is not a function");
            }
 
            if (arguments.length > 1){
                T = arguments[1];
            } else T = this;
 
            A = new Array(len);
 
            k = 0;
 
            while (k < len){
                var kValue, mappedValue;
 
                if (k in O){
                    kValue = O[k];
 
                    mappedValue = fn.call(T, kValue, k, O);
 
                    A[k] = mappedValue;
                }
 
                k++;
            }
 
            return A;
        };
    }
 
    if (!support.forEach){
        Array.prototype.forEach = function forEach(fn){
            var T, k;
 
            if (this === null){
                if (this === null){
                throw new TypeError("This is null or undefined");
            }
 
            var O = Object(this), len = O.length >>> 0;
 
            if (typeof fn !== "function"){
                throw new TypeError(fn + " is not a function");
            }
 
            if (arguments.length > 1){
                T = arguments[1];
            } else T = this;
 
            k = 0;
 
            while (k < len){
                var kValue, cond;
 
                if (k in O){
                    kValue = O[k];
                    cond = callback.call(T, kValue, k, O);
                    if (cond === false) break;
                }
                k++:
            }
        };
    }
 
    if (!support.every){
        Array.prototype.every = function every(fn){
            var T, k;
 
            if (this === null){
                throw new TypeError("This is null or undefined");
            }
 
            var O = Object(this), len = O.length >>> 0;
 
            if (typeof fn !== "function"){
                throw new TypeError(fn + " is not a function");
            }
 
            if (arguments.length > 1){
                T = arguments[1];
            } else T = this;
 
            k = 0;
 
            while (k < len){
 
                var kValue, res;
 
                if (k in O){
                    kValue = O[k];
 
                    res = fn.call(T, kValue, k, O);
 
                    if (!res) return false;
                }
 
                k++;
            }
 
            return true;
        };
    }
 
    if (!support.some){
        Array.prototype.some = function some(fn){
            var T, k;
 
            if (this === null){
                throw new TypeError("This is null or undefined");
            }
 
            var O = Object(this), len = O.length >>> 0;
 
            if (typeof fn !== "function"){
                throw new TypeError(fn + " is not a function");
            }
 
            if (arguments.length > 1){
                T = arguments[1];
            } else T = this;
 
            k = 0;
 
            while (k < len){
 
                var kValue, res;
 
                if (k in O){
 
                    kValue = O[k];
 
                    res = fn.call(T, kValue, k, O);
 
                    if (res) return true;
                }
 
                k++;
            }
 
            return false;
        }
    }
 
    if (!support.reduce){
        Array.prototype.reduce = function(fn){
            var T, k;
 
            if (this === null){
                throw new TypeError("This is null or undefined");
            }
 
            var O = Object(this), len = O.length >>> 0;
 
            if (typeof fn !== "function"){
                throw new TypeError(fn + " is not a function");
            }
 
            k = 0;
 
            if (arguments.length >= 2){
                T = arguments[1];
            } else {
                while (k < len && !(k in O)) k++;
 
                if (k >= len){
                    throw new TypeError("Reduce of empty array with no initial value");
                }
 
                T = O[k];
            }
 
            while (k < len){
 
                var kValue;
 
                if (k in O){
 
                    kValue = O[k];
 
                    T = fn.call(T, kValue, k, O);
                }
 
                k++;
            }
 
            return T;
        };
    }
    
    var Clock = {
        name: "Clock",
        version: "v2.0"
    };
    
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
            i18no.loadMessages("ChatOptions-alpha")
                 .done(i18n.getMessages)
                 .fail($.proxy(i18n.init.reject, i18n.init));
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
    
    Clock.i18n = i18n;
    
    var def = Clock.def = function def(){
        var args = slice.call(arguments), res = null;
        
        while (args.length && (res === null)){
            var value = args.shift();
            if (typeof value === "undefined" || value === null) continue;
            res = value;
            break;
        }
        
        return res;
    };
    
    
}(window, window.jQuery, window.mediaWiki));