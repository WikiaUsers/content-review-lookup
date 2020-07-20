/**
 * @name                IvyUI
 * @author              Ultimate Dark Carange
 * @version             v0.6.0
 * @description         Creates a new set of user interface
 *                      elements.
 **/
 
/* global window, document, jQuery, setInterval, clearInterval */
(function(window, document, $){
    // Script version
    var IVY_VERSION = "v0.6.0";
    // Unique ID
    var IVY_UID = 0;
    // Script name
    var IVY_NAME = "Ivy";
    // Proxy handler
    var IVY_PROXY_HANDLER = Object.freeze({
        get: function(obj, prop){
            return prop in obj ? obj[prop] : null;
        }
    });
    // Main object
    var ivy = "Proxy" in window ? new Proxy({}, IVY_PROXY_HANDLER) : {};
    
    ivy.namespaces = "Proxy" in window ? new Proxy({}, IVY_PROXY_HANDLER) : {};
    
    ivy.components = "Proxy" in window ? new Proxy({}, IVY_PROXY_HANDLER) : {};
    
    ivy.createComponent = function createComponent(name, base, proto){
        var existing, constructor, object, namespace, fullname;
        
        var proxied = "Proxy" in window ? new Proxy({}, IVY_PROXY_HANDLER) : {};
        
        var parts = name.split('.');
        namespace = parts.length > 1 ? parts[0] : "";
        name = parts.length > 1 ? parts[1] : parts[0];
        fullname = parts.length > 1 ? namespace + "-" + name : name;
        
        if (!proto){
            proto = base;
            base = IvyComponent;
        }
        
        if (Array.isArray(proto)){
            proto = Object.assign.apply(null, [{}].concat(proto));
        }
        
        ivy.namespaces[namespace] = Object.assign({}, ivy.namespaces[namespace]);
        existing = ivy.namespaces[namespace];
        constructor = ivy.namespaces[namespaces][name] = function(element, options){
            if (!this.__build) return new constructor(element, options);
            if (arguments.length) this.__build(element, options);
        };
        
        Object.assign(constructor, existing, {
            __VERSION: IVY_VERSION,
            __PROTO: Object.assign({}, proto),
            __CONSTRUCTORS: []
        });
        
        object = new base();
        
        object.options = Object.assign({}, object.options);
        Object.keys(object).forEach(function(prop){
            var value = object[prop];
            if (typeof value !== "function"){
                proxied[prop] = value;
                return;
            }
            
            proxied[prop] = (function(){
                function __SUPER(){
                    return base.prototype[prop].apply(this, arguments);
                }
                
                function __SUPERAPPLY(args){
                    return base.prototype[prop].apply(this, args);
                }
                
                return function proxiedFn(){
                    var __super = this.__super;
                    var __superApply = this.__superApply;
                    var ret;
                    
                    this.__super = __SUPER;
                    this.__superApply = __SUPERAPPLY;
                    
                    ret = value.apply(this, arguments);
                    
                    this.__super = __super;
                    this.__superApply = __superApply;
                    
                    return ret;
                };
            })();
        });
        
        constructor.prototype = Object.assign(object, proxied, {
            constructor: constructor,
            namespace: namespace,
            componentName: name,
            componentFullName: fullName
        });
        
        if (existing){
            existing.__CONSTRUCTORS.forEach(function(child){
                var childproto = child.prototype;
                
                ivy.component(
                    childproto.namespace ? childproto.namespace + "." 
                        + childproto.name : childproto.name,
                    constructor,
                    child.__PROTO
                );
            });
            
            delete existing.__CONSTRUCTORS;
        } else {
            base.__CONSTRUCTORS.push(constructor);
        }
        
        ivy.bridge(name, constructor);
        
        return constructor;
    };
    
    ivy.bridge = function bridge(name, object){
        var fullname = object.prototype.fullname || name;
        ivy.components[name] = function create(options){
            var args = Array.from(arguments).slice(1);
            var ret = this;
            
            if (args.length)
                options = Object.assign.apply(null, [{}].concat(args));
            
            return ret;
        };
    };
    
    function IvyComponent(element, options){
        
    }
})(window, document, jQuery);