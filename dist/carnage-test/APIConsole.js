/**
 * @title           APIConsole
 * @author          Ultimate Dark Carnage
 * @version         v1.0a
 **/

require(["wikia.window", "jquery", "mw"], function(window, $, mw){
    if ((config = $.extend({}, window.APIConsoleConfig)).disabled) return;
    
    var a = [], o = {}, slice = a.slice, has = o.hasOwnProperty;
    
    var APIConsole = {
        version: "v1.0a",
        name: "APIConsole",
        loaded: false,
        // MediaWiki variables
        pageName: mw.config.get("wgPageName"),
        userLang: mw.config.get("wgUserLanguage"),
        lang: mw.config.get("wgContentLanguage"),
        userName: mw.config.get("wgUserName"),
        action: mw.config.get("wgAction"),
        namespace: mw.config.get("wgCanonicalNamespace"),
        cityId: mw.config.get("wgCityId"),
        isArticle: mw.config.get("wgIsArticle"),
        namespaceNumber: mw.config.get("wgNamespaceNumber")
    };
    
    // Functions
    APIConsole.fns = {
        math: function(string){},
        load: function(url){
            $.ajax(url).then($.proxy(function(data){
                if (data.error){
                    this.error(data);
                } else {
                    this.send(data);
                }
            }, this)).fail($.proxy(function(error){
                this.error(error);
            }, this));
        },
        query: function(){}
    };
    
    // Math functions
    APIConsole.math = {
        constants: {
            
        },
        fixes: {
            imaginary: {
                sqrt: function(n){
                    if (isNaN(Math.sqrt(n))) n = Math.sqrt(-n) + "i";
                    else n = Math.sqrt(n);
                    return n;
                },
                pow: function(n, e){
                    var x = 1;
                    if ((pattern = /([-+]?[\d][\d\.]*[\d])i/g).test(n) && e % 2 === 0){
                        n = n.replace(pattern, "$1");
                        x = -1;
                        n = Number(n);
                    }
                    n = Math.pow(n, e) * x;
                    return n;
                },
                add: function(x, y){
                    var pattern = /([-+]?[\d][\d\.]*[\d])i/g, n = 0;
                    if (pattern.test(x) && pattern.test(y)){
                        x = Number(x.replace(pattern, "$1"));
                        y = Number(y.replace(pattern, "$1"));
                        
                        n = x + y;
                        n = n + "i";
                    } else if (pattern.test(x)){
                        y = Number(y);
                        if (y < 0) n = x + "" + y + "i";
                        n = y + x;
                    } else if (pattern.test(y)){
                        x = Number(x);
                        n = x + y;
                    } else n = Number(x) + Number(y);
                    return n;
                },
                subtract: function(x, y){
                    var pattern = /([-+]?[\d][\d\.]*[\d])i/g, n = 0;
                    if (pattern.test(x) && pattern.test(y)){
                        x = Number(x.replace(pattern, "$1"));
                        y = Number(y.replace(pattern, "$1"));
                        
                        n = x + y;
                        n = n + "i";
                    } else if (pattern.test(x)){
                        y = Number(y);
                        n = y + x;
                    } else if (pattern.test(y)){
                        x = Number(x);
                        n = x + y;
                    } else n = Number(x) + Number(y);
                    return n;
                }
            }
        },
        fns: {
            // Trigonometric functions
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            csc: function(n){
                return 1 / Math.sin(n);
            },
            sec: function(n){
                return 1 / Math.cos(n);
            },
            cot: function(n){
                return 1 / Math.tan(n);
            },
            // Inverse trigonometric functions
            arcsin: Math.asin,
            arccos: Math.acos,
            arctan: Math.atan,
            arccsc: function(n){
                return Math.asin(1 / n);
            },
            arcsec: function(n){
                return Math.acos(1 / n);
            },
            arccot: function(n){
                return Math.atan(1 / n);
            },
            // Hyperbolic functions
            sinh: Math.sinh,
            cosh: Math.cosh,
            tanh: Math.tanh,
            csch: function(n){
                return 1 / Math.sinh(n);
            },
            sech: function(n){
                return 1 / Math.cosh(n);
            },
            coth: function(n){
                return 1 / Math.tanh(n);
            },
            // Inverse hyperbolic functions
            arcsinh: Math.asinh,
            arccosh: Math.acosh,
            arctanh: Math.atanh,
            arccsch: function(n){
                return Math.asinh(1 / n);
            },
            arcsech: function(n){
                return Math.acosh(1 / n);
            },
            arccoth: function(n){
                return Math.atanh(1 / n);
            }
        }
    };
    
    // Main controller
    APIConsole.controller = function(options){
        if (!(this instanceof APIConsole.controller)){
            return new APIConsole.controller(options);
        }
        options = $.extend({}, options);
        // Configurable properties
        this.maxlength = APIConsole.def(options.maxlength, Infinity);
        this.multiline = APIConsole.def(options.multiline, true);
        // Regular expression patterns
        // Function pattern
        this.rfn = /([^\(\)\[\]\{\}\s\t\r\n]*)\((.*)\)/gm;
        // Function name patterns
        this.rall = /@([^@!#]*)/;
        this.rerror = /!([^@!#]*)/;
    };
    
    APIConsole.controller.prototype = {
        constructor: APIConsole.controller,
        initFn: function(name, args){
            if (!has.call())
        }
    };
    // User interface
    // Command line
    // Error
});