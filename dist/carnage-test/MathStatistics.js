(function($, mw){
    var Stats = {
        version: 'v1.0.1'
    }, has = function(object){
        return Object.prototype.hasOwnProperty.call(object);
    }, slice = function(){
        var args = [].slice.call(arguments, 1);
        return Array.prototype.slice.apply(arguments[0], args);
    }, isset = function(){
        var object;
        if (arguments.length > 1){
            var args = [].slice.call(arguments), i = 0;
            for (; i < args.length; i++){
                object = args[i];
                if (typeof object !== 'undefined' || object !== null)
                    return false;
            }
            return true;
        } else {
            object = arguments[0];
            return (
                typeof object !== 'undefined' || object !== null
            );
        }
    };
    
    // Stored values
    Stats.fns = ['', 'AVERAGE', 'COUNT', 'MAX', 'MIN',
        'PRODUCT', 'STDEV', 'SUM', 'VAR', 'MEDIAN', 'MODE',
        'LARGE', 'SMALL', 'PERCENTILE_INC', 'QUARTILE_INC',
        'PERCENTILE_EXC', 'QUARTILE_EXC', 'AND', 'OR', 'XOR'];
    // Primary methods
    Stats.getRange = function(min, max){
        var result, length, increment;
        if (typeof max === 'undefined')
            length = min;
        else {
            if (max < 0 && min < 0) return;
            length = max;
        }
        if (length !== min) increment = min;
        else increment = 1;
        var index = 0;
        result = [];
        for (; index < length; index++){
            if (increment === 0){
                result[index] = index;
            } else {
                result[index] = index + increment;
            }
        }
        return result;
    };
    
    Stats.callFn = function(fn){
        var blacklisted = ['callFn', 'getRange', 'getType', 'getUnique'];
        if (has(Stats, fn) && blacklisted.indexOf(fn) === -1){
            if (typeof Stats[fn] !== 'function') return;
            var args = slice(arguments);
            if (Array.isArray(args[0])){
                return Stats[fn].apply(window, args[0]);
            } else {
                return Stats[fn].apply(window, args);
            }
        }
    };
    
    Stats.getType = function(object){
        if (Array.isArray(object)) return 'range';
        else if (isFinite(object)) return 'number';
        else if (!isFinite(object)) return 'infinity';
        else if (isNaN(object)) return 'nan';
        else if (object === null) return 'null';
        else if (typeof object === 'string') return 'string';
        else if (typeof object === 'undefined') return 'undefined';
        else return 'other';
    };
    
    Stats.getUnique = function(array, sort){
        var res = [];
        for (var i = 0; i < array.length; i++){
            var val = array[i];
            if (res.indexOf(val) > -1) continue;
            res[res.length] = val;
        }
        if (typeof sort !== 'undefined' && sort)
            res = res.sort();
        return res;
    };
    
    // Statistical methods
    Stats.ABS = function(n){
        return Math.abs(n);
    };
    
    Stats.ACOS = function(n){
        return Math.acos(n);
    };
    
    Stats.ACOSH = function(n){
        return Math.acosh(n);
    };
    
    Stats.ASIN = function(n){
        return Math.asin(n);
    };
    
    Stats.ASINH = function(n){
        return Math.asinh(n);
    };
    
    Stats.ATAN = function(n){
        return Math.atan(n);
    };
    
    Stats.ATANH = function(n){
        return Math.atanh;
    };
    
    Stats.AVERAGE = function(range){
        var count = Stats.COUNT(range),
            sum = Stats.SUM(range);
        return sum / count;
    };
    
    Stats.BINOMDIST = function(s, t, p){
        s = parseInt(s, 10);
        t = parseInt(t, 10);
        if (s < 0 || s > t) return;
        if (p < 0 || p > 1) return;
        return (
            (
                Stats.FACTORIAL(t) / 
                (Stats.FACTORIAL(s) * Stats.FACTORIAL(t - s))
            ) * (Math.pow(p, s) * Math.pow(1 - p, t - s))
        );
    };
    
    // TBD
    Stats.BINOMINV = function(t, p, a){
        if (
            (Stats.getType(t) == 'number' 
                && Stats.getType(p) == 'number'
                && Stats.getType(a) == 'number') &&
            ((t < 0) && (p <= 0 || p >= 1) && (a <= 0 || a >= 1))
        ) return;
    };
    
    Stats.CEILING = Stats.CEIL = function(n){
        return Math.ceil(n);
    };
    
    Stats.COMBINATIONS = function(n1, n2){
        return Stats.FACTORIAL(n1) / (
            Stats.FACTORIAL(n1 - n2) * Stats.FACTORIAL(n2)
        );
    };
    
    // TBD
    Stats.CONFIDENCE_NORM = function(alpha, stdev, size){
        if (
            (Stats.getType(alpha) == 'number' 
                && Stats.getType(stdev) == 'number'
                && Stats.getType(size) == 'number') &&
            ((stdev <= 0) && (alpha <= 0 || alpha >= 1) && (size < 1))
        ) return;
        var interval = [];
        interval[0] = Stats.STERR;
    };
    
    // TBD
    Stats.CORREL = function(range1, range2){
        var average1 = Stats.AVERAGE(range1),
            average2 = Stats.AVERAGE(range2);
    };
    
    Stats.COUNT = function(range){
        return range.length;
    };
    
    Stats.COUNTIF = function(range, condition){
        var n = 0, i = 0;
        for (var l = range.length; i < l; i++){
            var value = range[i];
            if (typeof condition === 'function' 
                && condition.call(window, value)){
                n++;
            } else if (typeof condition !== 'function') return;
        }
        return n;
    };
    
    Stats.FACTORIAL = function factorial(n){
        if (n < 0) return -1;
        else if (n === 0) return 1;
        else return (n * factorial(n - 1));
    };
    
    Stats.FLOOR = function(n){
        return Math.floor(n);
    };
    
    Stats.LN = function(n){
        return Math.log(n);
    };
    
    Stats.LOG = function(n, b){
        return Math.log(n) / Math.log(b);
    };
    
    Stats.LOG10 = function(n){
        return Math.log10(n);
    };
    
    Stats.MAX = function(range){
        return Math.max.apply(window, range);
    };
    
    Stats.MEAN = Stats.AVERAGE;
    
    Stats.MEDIAN = function(range){
        var count = Stats.COUNT(range), index;
        if (count % 2 === 0){
            index = count / 2;
            return range[index];
        } else {
            index = count / 2;
            var n1 = Stats.FLOOR(index),
                n2 = Stats.CEIL(index),
                val1 = range[n1],
                val2 = range[n2];
            return (val1 + val2) / 2;
        }
    };
    
    Stats.MIN = function(range){
        return Math.min.apply(window, range);
    };
    
    Stats.MODE = function(range){
        var m = [], c = [], i, n, max = 0;
        for (i = 0; i < range.length; i++){
            n = range[i];
            c[n] = (c[n] || 0) + 1;
            if (c[n] > max){
                max = c[n];
            }
        }
        
        for (i in c){
            if (has(c, i)){
                if (c[i] === max){
                    m[m.length] = Number(i);
                }
            }
        }
        return m;
    };
    
    Stats.PERMUTATIONS = function(n1, n2){
        return Stats.FACTORIAL(n1) / (
            Stats.FACTORIAL(n1 - n2)
        );
    };
    
    Stats.RANGE = function(range){
        range = Stats.getUnique(range, true);
        return [range[0], range[range.length - 1]];
    };
    
    Stats.SUM = function(range, fn){
        var res = 0, i = 0;
        for (; i < range.length; i++){
            var val = range[i];
            if (typeof fn == 'function'){
                val = fn.call(window, val);
            }
            res = res + Number(val);
        }
        return res;
    };
    
    Stats.STDEV = function(range){
        var count = Stats.COUNT(range);
        return Math.sqrt(
            Math.pow(Stats.SUM(range, function(x){
                var a = Stats.AVERAGE(x);
                return x - a;
            }), 2) / count
        );
    };
    
    Stats.STERR = function(m, n){
        return m / Math.sqrt(n);
    };
    
    window.Stats = Stats;
}(jQuery, mediaWiki));