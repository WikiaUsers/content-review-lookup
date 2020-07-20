require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(window, document, $, mw){
    "use strict";
    
    function TOC(contentElement){
        return new TOC.Init(contentElement);
    }
    
    TOC.extend = function extend(){
        var source = arguments[0] || {}, length = arguments.length, i = 1, 
            deep = false, options, prop, target, copy, isArray, clone;
        
        if (typeof source === "boolean"){
            deep = source;
            source = arguments[i] || {};
            i++;
        }
        
        if (typeof source !== "object" && typeof source !== "function"){
            source = {};
        }
        
        if (i === length){
            source = this;
            i--;
        }
        
        loopIndices: for (i; i < length; i++){
            if ((options = arguments[i]) != null){
                loopKeys: for (var name in options){
                    target = source[name];
                    copy = options[name];
                    
                    if (source === copy) continue loopKeys;
                    
                    if (deep && copy && 
                        (typeof copy === "object" && !Array.isArray(copy))
                        || (isArray = Array.isArray(copy))){
                        if (isArray){
                            isArray = false;
                            clone = target && Array.isArray(target) ? target : [];
                        } else {
                            clone = target && (typeof target === "object" && !Array.isArray(target)) ? target : {};
                        }
                        
                        source[name] = TOC.extend(deep, clone, copy);
                    } else if (copy !== void 0) source[name] = copy;
                }
            }
        }
        
        return source;
    };
    
    TOC.extend({
        __VERSION__: "v1.0",
        __NAME__: "FandomTOC",
        error: function(msg, strict){
            var error = new Error(msg);
            if (strict) throw error;
            else console.error(error);
        },
        noop: function(){}
    });
    
    TOC.Init = function(contentElement){
        this.scope = contentElement;
        this.rootTocElement = this.scope.getElementById('toc');
        
        if (!this.rootTocElement) TOC.error("A TOC element does not exist in this page.", true);
        
        this.rootHeading = this.rootTocElement.firstElementChild;
        this.rootTitle = this.rootTocElement.getElementsByTagName('h2')[0];
        this.rootList = this.rootHeading.nextElementSibling;
        
        this.tocLoaded = false;
        this.maxLevels = 3;
        this.allowToggle = false;
        
        this.makeToc();
        return this;
    };
    
    TOC.Init.prototype.makeToc = function makeToc(){
        this.toc = document.createElement('aside');
        this.header = document.createElement('header');
        this.title = document.createElement('h2');
        this.toggle = document.createElement('a');
        this.nav = document.createElement('nav');
        this.createListItems();
    };
    
    TOC.Init.prototype.createListItems = function createListItems(){
        
    };
});