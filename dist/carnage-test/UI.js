/**
 * @title               UI
 * @version             v0.2
 * @description         This script creates an easy way to
 *                      create a UI component.
 * @author              Ultimate Dark Carnage <https://dev.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 **/
(function(window, document, $, mw){
    "use strict";
    // Unique ID
    var UID = 0;
    // UI constructor
    function UI(name, constructor, options){
        if (!this.__uid) return new UI(name, constructor);
        
        if (!options){
            options = constructor;
            constructor = UIComponent;
        }
        
        if (Array.isArray(options)){
            options = Object.assign.apply(null, [{}].concat(options));
        }
        
        var HAS_DOT = name.indexOf('.') > -1,
            TUPLE = name.split('.'),
            NAMESPACE = TUPLE.length > 1 ? TUPLE[0] : "",
            NAME = TUPLE.length > 1 ? TUPLE[1] : TUPLE[0],
            FULL_NAME = NAMESPACE ? NAMESPACE + "-" + NAME : NAME;
        
        this.__uid = UID++;
        this.__name = NAME;
        this.__namespace = NAMESPACE;
        this.__fullName = FULL_NAME;
        this.__base = constructor;
        this.settings = Object.assign({}, UI.settings);
        this.state = "";
        this.__setOptions(options);
        return this;
    }
    // Components object
    UI.components = {};
    // Namespaces object
    UI.namespaces = {};
    // Default settings
    UI.settings = Object.freeze({});
    // Setting UI options
    UI.prototype.__setOptions = function setOptions(options){
        var settings = this.settings;
        Object.keys(options).forEach(function(prop){
            var orig = settings[prop];
            settings[prop] = options[prop] || orig;
        }, this);
    };
    // Bridge function
    UI.prototype.__bridge = function bridge(){};
    // UI component constructor
    function UIComponent(){}
})(window, document, jQuery, mediaWiki);