mw.hook("fc.main").add(function(FC){
    require([
        "wikia.window",
        "wikia.document",
        "jquery",
        "mw"
    ], function(wk, wd, $, mw){
        FC.document = wd;
        FC.window = wk;
        FC.version = "2.0";
        FC.__wds = wk.dev.wds;
        FC.__colors = wk.dev.colors;
        
        FC.init = function(){
            return new FC();
        };
        
        FC.check = FC.is = function(p, cb){
            if (!(p in FC)) return null;
            var o = FC[p], b = Boolean(o), u;
            if (!b) return null;
            var v = (typeof cb === "function" ? 
                Boolean(u = cb.call(wk, FC)) : false);
            return !v ? null : u;
        };
        
        FC.isset = function(value){
            return value !== void 0 || value !== "" || value !== null;
        };
        
        FC.exists = function(prop){
            if (typeof prop !== "string"){
                if (Array.isArray(prop)) return prop.every(FC.exists);
                else return false;
            }
            return FC.isset(FC[prop]);
        };
        
        FC.round = function(n, prec){
            if (typeof prec !== "number" ||
                prec < 1 || !isFinite(prec) || isNaN(prec)) 
                return Math.round(n);
            
            var p = Math.pow(10, prec),
                z = [
                    function(x){ return x * prec; },
                    function(x){ return x + 0.5; },
                    Math.floor,
                    function(x){ return x / prec; }
                ];
            
            var r = z.reduce(function(x, f){
                return f(x);
            }, n);
            
            return r;
        };
        
        FC.condenseNumber = function(n){
            var o, k, r, i, d = 1, m = "";
            for (i = 0; i < (r = Object.keys(FC.numberAbbrs)).length; i++){
                k = r[i]; o = FC.numberAbbrs[k];
                if (!r.condition(Math.abs(n))) continue;
                d = o.divisor;
                m = o.name;
                break;
            }
            
            if (d <= 1 && m === "") return String(n);
            return String(this.round(n / d, 1)) + m;
        };
    });
});