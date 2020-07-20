(function(factory, window, $, mw){
    if ("Popover" in window || window.PopoverLoaded) return;
    
    window.PopoverLoaded = true;
    
    var coreDeps = [];
    
    if (!("Api" in mw)) coreDeps.push("mediawiki.api");
    
    if (!("util" in mw)) coreDeps.push("mediawiki.util");
    
    if (!("Title" in mw)) coreDeps.push("mediawiki.Title");
    
    if (!("Uri" in mw)) coreDeps.push("mediawiki.Uri");
    
    mw.loader.load(coreDeps);
    
    var deferred = {
        wds: $.Deferred(),
        colors: $.Deferred(),
        i18n: $.Deferred()
    }, name;
    
    window.dev = $.extend({}, window.dev);
    
    if ("wds" in window.dev){
        deferred.wds.resolve();
    } else {
        name = "u:dev:MediaWiki:WDSIcons/code.js";
        $(importArticle({ type: "script", article: name }))
            .on("load", deferred.wds.resolve.bind(deferred.wds));
    }
    
    if ("colors" in window.dev){
        deferred.colors.resolve();
    } else {
        name = "u:dev:MediaWiki:Colors/code.js";
        $(importArticle({ type: "script", article: name }))
            .on("load", deferred.colors.resolve.bind(deferred.colors));
    }
    
    if ("i18n" in window.dev){
        deferred.i18n.resolve();
    } else {
        name = "u:dev:MediaWiki:I18n-js/code.js";
        $(importArticle({ type: "script", article: name }))
            .on("load", deferred.i18n.resolve.bind(deferred.i18n));
    }
    
    importArticle({ type: "style", article: "MediaWiki:Popover.css" });
    
    $.when(
        deferred.wds,
        deferred.colors,
        deferred.i18n,
        mw.loader.using(coreDeps)
    ).done(factory.bind(window, window, $, mw));
}(function(window, $, mw){
    function DEFAULT(){
        var i = 0;
        while (i < arguments.length){
            if (ISSET(arguments[i])) return arguments[i];
            i++;
        }
        return null;
    }
    
    function ISSET(){
        var i = 0;
        while (i < arguments.length){
            var value = arguments[i];
            if (typeof value === "undefined" || value === null) return false;
            i++;
        }
        return true;
    }
    
    function ISSETV(value){
        return ISSET(value);
    }
    
    function Popover(target, config){
        if (!(this instanceof Popover)){
            return new Popover(target, config);
        }
        
        if (typeof target === "object"){
            if (!Array.isArray(target)){
                config = $.extend({}, target);
                target = config.target || "*";
                
                if (Array.isArray(target)) target = target.join(", ");
            } else target = target.join(", ");
        }
        
        config = $.extend({}, config);
        
        this.target = DEFAULT(target);
        this.condition = DEFAULT(config.condition, true);
        this.transparency = DEFAULT(config.transparency, 0);
        this.showTitle = DEFAULT(config.showTitle, false);
        this.width = DEFAULT(config.width, 300);
        this.height = DEFAULT(config.height, "auto");
        return this;
    }
}, window, window.jQuery, window.mw));