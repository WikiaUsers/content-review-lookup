/**
 * @title           ChatSideRail
 * @author          Slyst
 * @author          ChaoticShadow
 * @author          Shining-Armor
 * @author          RansomTime
 * @author          Ultimate Dark Carnage
 * @version         v2.0b
 * 
 **/

(function init(window, $, mw){
    var CSR = {}, a = [], slice = a.slice, indexOf = a.indexOf, o = CSR, has = o.hasOwnProperty;

    // Fix native methods
    var sort = Array.prototype.sort;
    Array.prototype.sort = function(/*compareFn, thisArg*/){
        if (!arguments.length) return sort.call(this);
        else if (arguments.length === 1){
            if (typeof arguments[0] !== "function" && typeof arguments[0] !== "undefined"){
                throw new TypeError("The comparison function must be either a function or undefined.");
            } else if (typeof arguments[0] === "function"){
                return sort.call(this, arguments[0]);
            } else if (typeof arguments[0] === "undefined"){
                return sort.call(this);
            }
        } else {
            var a = slice.call(arguments), context, compareFn, args, noContext = false;
            if (typeof a[0] !== "function"){
                throw new TypeError("The comparison function must be a function.");
            } else {
                compareFn = a[0];
                var last = a.length - 1;
                if (typeof a[last] === "boolean" && !a[last]) noContext = !a[last];
                context = noContext ? this : a[last];
                args = slice.call(a, 1, last - 1);
                return sort.call(this, function(a, b){
                    return compareFn.apply(context, [a, b].concat(args));
                });
            }
        }
    };

    // Create private utility functions
 
    /**
     * Set the default value to null if the variable
     * is undefined
     **/
 
    var def = CSR.def = function def(){
        var args = slice.call(arguments), value;
        while (args.length){ if ((value = args.shift()) && value !== null) return value; }
        return null;
    };
 
    /**
     * Merge arrays
     **/
 
    var merge = CSR.merge = function merge(){
        var args = slice.call(arguments), res = [], value;
        while (args.length){
            if (!((value = args.shift()) && Object(value) instanceof Array)) continue;
            res = res.concat(value);
        }
        return res;
    };

    /**
     * Checking if the user is an administrator
     **/
    var isAdmin = AP.isAdmin = function isAdmin(groups){
        while (groups.length && (group = groups.shift())){
            if (["staff", "helper", "vstf", "bureaucrat", "sysop"].indexOf(group) > -1) return true;
        }
        return false;
    };
 
    /**
     * Unsetting a variable
     **/
    var unset = AP.unset = function unset(val, ctx){
        try {
            ctx = ctx || this;
            for (var key in ctx){
                if (!(key === val)) continue;
                ctx[key] = void 0;
                break;
            }
            return true;
        } catch (ignore){ return false; }
    };
 
    /**
     * Ensuring the variable is set
     **/
    var isset = AP.isset = function isset(val){
        return (typeof val !== "undefined" || val !== null);
    };
 
    /**
     * Escaping regular expression characters
     **/
 
    var regesc = AP.regesc = function regesc(string){
        return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    };

    // Internationalization

    var i18n = {
        messages: {},
        get: function(name, type){
            if ((typeof type === "undefined")) type = "_default";

            if (!has.call(i18n.messages, name)) return "";
            var msg = i18n.messages[name];

            if ((!has.call(msg, type)) ||
                (typeof msg[type] === "function")) type = "_default";
            
            var res = msg[type];

            return res || "";
        },
        parse: function(name){
            return i18n.get(name, "parse");
        },
        plain: function(name){
            return i18n.get(name, "plain");
        },
        escape: function(name){
            return i18n.get(name, "escape");
        }
    };

    // Controller object

    CSR.controller = function Controller(options){
        if (!(this instanceof CSR.controller)){
            return new CSR.controller(options);
        }
        options = $.extend({}, options);
        // Configurable properties
        this.modules = def(options.modules, {});
        this.show = def(options.show, false);
        this.type = def(options.type, "navigation");
        this.sort = def(options.sort, false);
        // Non-configurable properties
        this.isAdmin = isAdmin();
        this.open = false;
        this.ui = null;
        this.i18n = { msg: {} };
        this.css = {};
        return this;
    };

    CSR.controller.prototype = {
        constructor: CSR.controller,
        set state(value){
            this.fire("statechange", { state: value });
        },
        get state(){},
        process: function(){
            this.ui = new CSR.ui();
            this.state = "loaded";
            this.i18n = i18n;
            this.css = css;
            return this;
        }
    };
}(window, this.jQuery, this.mw));