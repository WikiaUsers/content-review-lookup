window.QuakeLoaded = (function(window, $, mw){
    var a = [],
        slice = a.slice,
        indexOf = a.indexOf,
        o = {},
        has = o.hasOwnProperty;
        
    var Quake = {
        version: "v2.0a",
        name: "QuakeUI"
    };
    
    var support = {};
    
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
    
    support.minarr = (function(testcase){
        return !isNaN(Math.min(testcase));
    }([1,2,3,4]));
    
    support.maxarr = (function(testcase){
        return !isNaN(Math.max(testcase));
    }([1,2,3,4]));
    
    if (!support.minarr){
        var basemin = Math.min;
        
        Math.min = function min(){
            var T, a;
            
            if (arguments.length > 1){
                a = [].slice.call(arguments);
                
                return basemin.apply(window, a);
            } else {
                T = arguments[0];
                
                if (!(T instanceof Array)){
                    return basemin.call(window, T);
                } else {
                    return basemin.apply(window, T);
                }
            }
        };
    }
    
    if (!support.maxarr){
        var basemax = Math.max;
        
        Math.max = function max(){
            var T, a;
            
            if (arguments.length > 1){
                a = [].slice.call(arguments);
                
                return basemax.apply(window, a);
            } else {
                T = arguments[0];
                
                if (!(T instanceof Array)){
                    return basemax.call(window, T);
                } else {
                    return basemax.apply(window, T);
                }
            }
        };
    }
    
    // Fixes to native methods
    
    var nsort = Array.prototype.sort;
    
    Array.prototype.sort = function sort(compareFn){
        var T, a, thisArg, ctx, noctx;
        
        if (arguments.length > 1){
            T = arguments[1];
        } else T = this;
        
        if (typeof compareFn === "function"){
            if (T === this){
                return nsort.call(this, compareFn);
            } else {
                a = [].slice.call(arguments, 2);
                noctx = false;
                
                if (typeof T === "boolean"){
                    if (!T) noctx = true;
                    else ctx = window;
                } else ctx = T;
                    
                return nsort.call(this, function(a, b){
                    return compareFn.apply(T, [a, b].concat(a));
                });
            }
        } else if (typeof compareFn === "undefined"){
            return nsort.call(this);
        } else {
            throw new TypeError("The comparison function must be either a function or undefined.");
        }
    };
}(window, this.jQuery, this.mediaWiki));