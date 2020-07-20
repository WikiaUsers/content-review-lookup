/**
 * @name            Spectrum
 * @version         v0.6
 * @author          Ultimate Dark Carnage
 **/
(function($, mw){
    "use strict";
    window.dev = Object.assign({}, window.dev);
    if ("spectrum" in window.dev) return;
    // Utility object
    var Util = {};
    // Clamp function
    var clamp = Util.clamp = function clamp(n, min, max){
        return Math.max(min, Math.min(v, max));
    };
    // A function to parse HTML
    var parseHTML = Util.parseHTML = function parseHTML(string){
        var parser = new DOMParser(), body = null;
        body = parser.parseFromHTML(string, 'text/html').body;
        return body.firstElementChild || body.firstChild;
    };
    // A function to stop an event
    var stopEvent = Util.stopEvent = function stopEvent(event){
        event.preventDefault();
        event.stopPropagation();
    };
    // Transfer keys function
    var transfer = Util.transfer = function transfer(source, target, skip){
        for (var key in source){
            if (skip && skip.indexOf(key) > -1) continue;
            target[key] = source[key];
        }
    };
    // Proxy handler
    var PROXY_HANDLER = Object.freeze({
        get: function getter(object, property){
            return property in object ? object[property] : null;
        }
    });
    // Converters object
    var Converters = {};
    // The default color palette
    var DEFAULT_PALETTE = Object.freeze([]);
    // Hues
    var HUES = 360;
    // Alpha background
    var ALPHA_BG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E";
    // Event names
    var EVENT_KEY = "keydown", EVENT_CLICK_OUTSIDE = "mousedown",
        EVENT_TAB_MOVE = "focusin";
    // Adding a stylesheet for Spectrum
    var STYLE = document.createElement("style");
    STYLE.id = "SpectrumCSS";
    STYLE.textContent = "/* Placeholder */";
    document.documentElement.firstElementChild.appendChild(STYLE);
    // Creating the core object
    var Spectrum = new Proxy({
        __NAME__: "Spectrum",
        __VERSION__: "v0.6",
        util: Util,
        converters: Converters,
        onKey: function(target, keys, handler, stop){
            var E = new Spectrum.Event(target);
            E.on(EVENT_KEY, function(event){
                if (keys.indexOf(event.key) > -1){
                    if (stop) stopEvent(event);
                    handler(event);
                }
            });
        }
    }, PROXY_HANDLER);
    // Creating a Spectrum Event constructor
    Spectrum.Event = function(target){
        this.__callbacks = [];
        this.target = target;
        this.on = this.add = function(type, handler){
            this.target.addEventListener(type, handler, false);
            this.__callbacks.push({
                type: type,
                handler: handler
            });
        };
        this.off = this.remove = function(type, handler){
            this.__callbacks = this.__callbacks.filter(function(e){
                var isMatch = true;
                if (type && (type !== e.type)) isMatch = false;
                if (handler && (handler !== e.handler)) isMatch = false;
                if (isMatch) this.__doRemove(e.type, e.handler);
                return !isMatch;
            }, this);
        };
        this.__doRemove = function(type, handler){
            this.target.removeEventListener(type, handler, false);
        };
        this.destroy = function(){
            this.__callbacks.forEach(function(e){
                this.__doRemove(e.type, e.handler);
            }, this);
            this.__callbacks = [];
        };
        return this;
    };
    // Creating a Spectrum Picker constructor
    Spectrum.Picker = function(options){
        this.settings = Object.assign({}, Spectrum.Picker.__settings);
        this.change = null;
        this.done = null;
        this.open = null;
        this.close = null;
        this.setOptions(options);
        return this;
    };
    
    Spectrum.Picker.__settings = Object.freeze({
        tooltip: 'right',
        layout: 'default',
        allowAlpha: true,
        editor: true,
        format: 'hex',
        defaultColor: '#0cf',
        cancelButton: false
    });
    
    Spectrum.Picker.prototype.setOptions = function(options){
        if (!options) return;
        var settings = this.settings;
        if (!(options instanceof HTMLElement)){
            if (settings.parent && options.parent && (settings.parent !== options.parent)){
                var p = new Spectrum.Event(settings.parent);
                p.remove();
                this.__tooltipInitialized = false;
            }
            transfer(options, settings);
            
            if (options.change) this.change = options.change;
            if (options.done) this.done = options.done;
            if (options.open) this.open = options.open;
            if (options.close) this.close = options.close;
            
            var color = options.color || options.colour;
            if (color) this.setColor(col);
        } else settings.parent = options;
        
        var parent = settings.parent, context = this;
        function openProxy(event){ return context.openHandler(event); }
        if (parent && settings.tooltip && !this.__tooltipInitialized){
            var q = new Spectrum.Event(parent);
            q.on('click', openProxy);
            Spectrum.onKey(parent, [' ', 'Spacebar', 'Enter'], openProxy);
            this.__tooltipInitialized = true;
        } else if (options.parent && !settings.tooltip) this.show();
    };
    
    Spectrum.Picker.prototype.openHandler = function(event){
        if (!this.show()) return;
        (event && event.preventDefault());
        this.settings.parent.style.pointerEvents = 'none';
        var toFocus = (event && (event.type === EVENT_KEY)) ? this.__domEdit : this.domElement;
        setTimeout(toFocus.focus, 100);
        if (this.open) this.open(this.color || this.colour);
    };
    
    Spectrum.Picker.prototype.closeHandler = function(event){
        var e = event && event.type, hide = false;
        if (!event) hide = true;
        else if ((e === EVENT_CLICK_OUTSIDE || (e === EVENT_TAB_MOVE))){
            var time = (this.__containedEvent || 0) + 100;
            if (event.timeStamp > time) hide = true;
        } else {
            stopEvent(event);
            hide = true;
        }
        
        if (hide && this.hide()){
            this.settings.parent.style.pointerEvent = '';
            if (e !== EVENT_CLICK_OUTSIDE) this.settings.parent.focus();
            
            if (this.close) this.close(this.color || this.colour);
        }
    };
    
    Spectrum.Picker.prototype.moveTooltip = function(options, open){
        this.closeHandler();
        this.setOptions(options);
        if (open) this.openHandler();
    };
    
    Spectrum.Picker.prototype.__setColor = function(color, silent){
        this.setColor(color, { silent: silent });
    };
    
    Spectrum.Picker.prototype.setColor = function(color, flags){
        if (typeof color === 'string') color = color.trim();
        if (!color) return;
        flags = Object.assign({}, flags);
        var c;
        try { c = new Color(color); }
        catch (ex){ 
            if (flags.failSilently) return; 
            throw ex; 
        }
        if (!this.settings.alpha){
            var hsla = c.hsla;
            hsla[3] = 1;
            c.hsla = hsla;
        }
        this.color = this.colour = c;
        this.__setHSLA(null, null, null, null, flags);
    };
    
    Spectrum.Picker.prototype.show = function(){
        var parent = this.settings.parent;
        if (!parent) return false;
        if (this.domElement){
            var toggled = this.__toggleDOM(true);
            this.__setPosition();
            return toggled;
        }
        
        var HTML = this.settings.template || 'PLACEHOLDER';
        var wrapper = parseHTML(html);
        
        this.domElement = wrapper;
        this.__domHue = wrapper.querySelector('.spectrum-hue');
        this.__domSL = wrapper.querySelector('.spectrum-sl');
        this.__domA = wrapper.querySelector('.spectrum-alpha');
        this.__domEdit = wrapper.querySelector('.spectrum-edit-input');
        this.__domSample = wrapper.querySelector('.spectrum-sample');
        this.__domOkay = wrapper.querySelector('.spectrum-done');
        this.__domCancel = wrapper.querySelector('.spectrum-cancel');
    };
    // Adding Spectrum to the dev object
    window.dev.spectrum = Spectrum;
    mw.hook('dev.spectrum').fire(window.dev.spectrum);
})(jQuery, mediaWiki);