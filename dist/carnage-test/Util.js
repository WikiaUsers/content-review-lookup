(function(window, $, mw){
    // Creating the main Util object
    var Util = {};
    
    // Base function to set default values
    function _default(){
        var a = Array.prototype.slice.call(arguments),
            last = a.length - 1;
        
        if (!a.length) return null;
        
        while (a.length){
            var b = a.shift(), ret = false;
            
            if (typeof b === "function"){
                var c = b.call(window);
                
                ret = a[last] === true;
                
                if (_isset(c) && ret) b = c;
            }
            
            if (_isset(b)) return b;
        }
        
        return null;
    }
    
    /**
     * Creating methods for setting default values
     * of variables.
     * 
     * + _default: The base function
     * + _defaultArr: Setting a default value from an array of properties
     * + _defaultCond: Setting a default value based on a condition
     **/
     
    Util._default = _default;
    
    Util._defaultArr = function(){
        var a = Array.prototype.slice.call(arguments);
        
        var source = a[0];
        
        if (Util.isType(source, "Object", false)) return null;
        
        var b = [], l = 2, props = a[1];
        
        if (Util.isType(props, ["String", "Number", "Array"], false)){
            return _default.apply(window, a.slice(l));
        }
        
        if (Util.isType(props, ["String", "Number"])){
            var c = source[props];
            
            if (!_isset(c)) return _default.apply(window, a.slice(l));
            
            b.push(c);
        } else if (Util.isType(props, "Array")){
            while (props.length){
                var d = props.shift(), e = source[props];
                
                if (_isset(e)) b.push(e);
            }
        }
        
        var f = a.slice(l);
        
        while (f.length) b.push(f.shift());
        
        return _default.apply(window, b);
    };
    
    Util._defaultCond = function(){
        var a = Array.prototype.slice.call(arguments);
        
        var source = a[0], cond = a[1], l = 2, b = [];
        
        if (!Util.isType(cond, ["Function", "Boolean", "Array", "Number"])){
            return _default.apply(window, a.slice(l));
        }
        
        if (Util.isType(cond, "Function")){
            cond = cond.call(window, source);
            
            cond = Util.isType(cond, "Void", false);
        } else if (Util.isType(cond, "Array")){
            var c = false;
            
            while (cond.length){
                var d = cond.shift();
                
                if (!Util.isType(d, ["Function", "Boolean", "Number"])) 
                    continue;
                
                if (Util.isType(d, "Function")){
                    d = d.call(window, source);
                    
                    d = Util.isType(d, "Void", false);
                } else if (Util.isType(d, "Number")){
                    d = (d > 0);
                }
                
                if (d === true){
                    c = d;
                    break;
                }
            }
            
            cond = c;
        } else if (Util.isType(cond, "Number")){
            cond = (cond > 0);
        }
        
        if (cond === true) b.push(source);
        
        var f = a.slice(l);
        
        while (f.length) b.push(f.shift());
        
        return _default.apply(window, b);
    };
    
    // Creating a base isset function
    function _isset(value){
        return (value !== null || typeof value !== "undefined");
    }
    
    // Checking support for certain properties
    Util._support = {};
    
    (function(window){
        this.Promise = (function(){
            var r = false;
            
            try {
                console.log(new Promise(function(){}));
                r = true;
            } catch (ignore){}
            
            return r;
        })();
        
        this["Array.isArray"] = (function(){
            var r = false, a = [];
            
            try {
                console.log(Array.isArray(a));
                r = true;
            } catch (ignore){}
            
            return r;
        })();
        
        var ap = ["filter", "map", "some", "every", "find", "findIndex", "fill", "reduce", "reduceRight", "forEach"];
        
        function supportAp(prop){
            this["Array.prototype." + prop] = (function(){
                var r = false, a = [];
                
                if (prop in a) r = true;
                
                return r;
            })();
        }
        
        while (ap.length){
            var p = ap.shift();
            
            supportAp.call(this, p);
        }
        
        if (this.forEach){
            ["Set", "Map", "WeakMap", "WeakSet"].forEach(function(m){
                this[m] = (function(){
                    var r = false;
                
                    try {
                        console.log(new window[m]());
                        r = true;
                    } catch (ignore){}
                
                    return r;
                })();
            }, this);
        } else {
            function supportSM(prop){
                var r = false;
                
                try {
                    console.log(new window[prop]());
                    r = true;
                } catch (ignore){}
                
                return r;
            }
            
            var sm = ["Set", "Map", "WeakMap", "WeakSet"];
            
            while (sm.length){
                var p = sm.shift();
                supportSM.call(this, p);
            }
        }
    }).call(Util._support, window);
    
    // Creating a function to get the value type
    Util._types = {};
    
    (function(window){
        this.Array = function(value){
            var res = false;
            if (Util._support["Array.isArray"]){
                res = Array.isArray(value);
            } else {
                res = (Object(value) instanceof Array);
            }
            
            if (!res){
                var a = ["Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Int8Array", "Int16Array", "Int32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
                
                while (a.length){
                    var b = a.shift();
                    if ((res = (Object(value) instanceof window[b]))) break;
                }
            }
            
            return res;
        };
        
        this.Object = function(value){
            var res = false;
            
            if (Object(value) instanceof Object){
                if (Util._support["Array.isArray"]){
                    res = !Array.isArray(value) && value !== null;
                }
                
                if (!res){
                    var a = ["Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Int8Array", "Int16Array", "Int32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
                
                    while (a.length){
                        var b = a.shift();
                        if ((res = !(Object(value) instanceof window[b]))) break;
                    }
                }
            }
            
            return res;
        };
        
        this.Null = function(value){
            var res = false;
            
            if (Object(value) instanceof Object){
                if (value === null) res = true;
            }
            
            return res;
        };
        
        this.Void = function(value){
            var res = false;
            
            if (typeof value === "undefined") res = true;
            
            return res;
        };
        
        this.String = function(value){
            var res = false;
            
            if (Object(value) instanceof String) res = true;
            
            return res;
        };
        
        this.Boolean = function(value){
            var res = false;
            
            if (Object(value) instanceof Boolean) res = true;
            
            return res;
        };
        
        this.Number = function(value){
            var res = false;
            
            if (Object(value) instanceof Number){
                if (!(isNaN(value) || !isFinite(value))) res = true;
            }
            
            return res;
        };
        
        this.NaN = function(value){
            var res = false;
            
            if (Object(value) instanceof Number){
                if (isNaN(value)) res = true;
            }
            
            return res;
        };
        
        this.Infinity = function(value){
            var res = false;
            
            if (Object(value) instanceof Number){
                if (!isNaN(value) && !isFinite(value)) res = true;
            }
            
            return res;
        };
        
        this.Function = function(value){
            var res = false;
            
            if (Object(value) instanceof Function) res = true;
            
            return res;
        };
        
        ["Set", "Map", "WeakMap", "WeakSet"].forEach(function(m){
            if (Util._support[m]){
                this[m] = function(value){
                    var res = false;
                    
                    if (Object(value) instanceof window[m]) res = true;
                    
                    return res;
                };
            }
        }, this);
        
        if (Util._support["Promise"]){
            this.Promise = function(value){
                var res = false;
                
                if (Object(value) instanceof Promise) res = true;
                
                return res;
            }
        }
    }).call(Util._types, window);
    
    Util.getType = function(value){
        var k = Object.keys(Util._types), res = "N/A";
        
        while (k.length){
            var p = k.shift(),
                v = Util._types[p],
                c = false;
                
            if (typeof v !== "function") continue;
            
            c = v.call(window, value);
            
            if (c === true){
                res = p;
                break;
            }
        }
        
        return res;
    };
    
    Util.isType = function(){
        var value, name, isFalse = false, c = false;
        
        if (arguments.length === 1){
            value = arguments[0];
            name = Object.keys(Util._types).filter(function(k){
                return ["Void", "Null"].indexOf(Util.getType(k)) === -1;
            });
        } else if (arguments.length === 2){
            value = arguments[0];
            name = arguments[1];
        } else {
            value = arguments[0];
            name = arguments[1];
            isFalse = Boolean(arguments[2]) === false;
        }
        
        if (Util.getType(name) === "Array"){
            while (name.length){
                var n = name.shift();
                
                if (Util.getType(value) === n){
                    c = true;
                    break;
                }
            }
        } else if (Util.getType(name) === "String"){
            name = name.split("|");
            
            name = name.length === 1 ? name[0] : name;
            
            if (Util.getType(name) === "Array"){
                while (name.length){
                    var nm = name.shift();
                    
                    if (Util.getType(value) === nm){
                        c = true;
                        break;
                    }
                }
            } else c = Util.getType(value) === name;
        } else return false;
        
        return (isFalse ? !c : c) === true;
    };
    
    window.Util = Util;
}(window, jQuery, mw));