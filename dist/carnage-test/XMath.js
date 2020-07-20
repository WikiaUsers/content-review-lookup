window.XMath = (function(window){
    function factorial(x){
        var r = x;
        if (x === 0 || x === 1) return 1;
        while (x > 1){
            x--; r = r * x;
        }
        return r;
    }
    
    var XMath = {
        e: Math.E,
        pi: Math.PI,
        // Main functions
        abs: Math.abs,
        ceil: Math.ceil,
        floor: Math.floor,
        max: Math.max,
        min: Math.min,
        round: Math.round,
        exp: Math.exp,
        pow: Math.pow,
        factorial: factorial,
        gamma: function(x){
            return factorial(x - 1);
        },
        hypot: Math.hypot || function(){
            var a = [].slice.call(arguments),
                x = 0, i = a.length;
            while (i--) y += a[i] * a[i];
            return Math.sqrt(y);
        },
        trunc: Math.trunc || function(x){
            x = +x;
            if (!isFinite(x)) return x;
            return (x - x % 1) ||
                (x < 0 ? -0 : v === 0 ? v : 0);
        },
        random: function(){
            var a = [].slice.call(arguments),
                x = a[0];
            if (x !== void 0)
                return Math.random() * x;
            return Math.random();
        },
        // Logarithms
        ln: Math.log,
        log: function(){
            var a = [].slice.call(arguments),
                x = a[0], y = a[1];
            if (y !== void 0)
                return Math.log(x) / Math.log(y);
            return Math.log(x) / Math.log(10);
        },
        // Radicals
        sqrt: Math.sqrt,
        cbrt: Math.cbrt || function(x){
            return x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1 / 3);
        },
        // Trigonometric functions
        cos: Math.cos,
        sin: Math.sin,
        tan: Math.tan,
        csc: function(x){
            return (1 / Math.sin(x));
        },
        sec: function(x){
            return (1 / Math.cos(x));
        },
        cot: function(x){
            return (1 / Math.tan(x));
        },
        // Hyperbolic functions
        cosh: Math.cosh,
        sinh: Math.sinh,
        tanh: Math.tanh,
        csch: function(x){
            return (1 / Math.sinh(x));
        },
        sech: function(x){
            return (1 / Math.cosh(x));
        },
        coth: function(x){
            return (Math.cosh(x) / Math.sinh(x));
        },
        // Inverse trigonometric functions
        arccos: Math.acos,
        arcsin: Math.asin,
        arctan: Math.atan,
        arccsc: function(x){
            return Math.asin(1 / x);
        },
        arcsec: function(x){
            return Math.acos(1 / x);
        },
        arccot: function(x){
            return Math.atan(1 / x);
        },
        // Inverse hyperbolic functions
        arccosh: Math.acosh,
        arcsinh: Math.asinh,
        arctanh: Math.atanh,
        arccsch: function(x){
            return Math.asinh(1 / x);
        },
        arcsech: function(x){
            return Math.acosh(1 / x);
        },
        arccoth: function(x){
            return Math.atanh(1 / x);
        }
    };
    return XMath;
}(window));