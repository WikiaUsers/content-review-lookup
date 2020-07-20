(function(window, document, $, mw){
    "use strict";
    // Creating the dev if the dev object does not exists
    window.dev = Object.assign({}, window.dev);
    // Creating the component object
    function WDSComponent(name, base, options){
        if (!this.__setOptions) return new WDSComponent(name, base, options);
        var settings = !options ? base : options,
            constructor = !options ? WDSUI : base;
        // Settings property
        this.settings = Object.assign({}, WDSComponent.settings);
        var parts = name.split('.'), namespace = parts.length > 1 && parts[0] ? parts[0] : "",
            componentName = parts.length > 1 && parts[1] ? parts[1] : parts[0],
            fullName = namespace ? namespace + '-' + componentName : componentName;
        
        var existingConstructor = null, namespaces = WDSComponent.namespaces;
        if (namespace){
            if (namespace in namespaces) existingConstructor = namespaces[namespace];
        }
        this.__setOptions(settings);
        return this.__process();
    }
}(window, document, jQuery, mediaWiki));