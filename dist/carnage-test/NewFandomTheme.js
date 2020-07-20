/**
 * @title               NewFandomTheme
 * @version             v1.1
 * @author              Ultimate Dark Carnage
 * @description         Updates the core Fandom theme to make it similar to Feeds
 **/

require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(window, document, $, mw){
    "use strict";
    // Creating an environment stylesheet
    const ENV = document.createElement('style');
    // Scripts object
    const SCRIPTS = Object.freeze({
        colors: 'u:dev:MediaWiki:Colors/code.js',
        wds: 'u:dev:MediaWiki:WDSIcons/code.js'
    });
    // Promisify function
    const PROMISIFY = function promisify(deferred){
        var $deferred = $.when(deferred);
        return new Promise(function(resolve, reject){
            $deferred.done(resolve).fail(reject);
        });
    };
    // Deferred Colors object
    const COLORS_DEFERRED = $.Deferred();
    // Deferred WDSIcons object
    const WDS_DEFERRED = $.Deferred();
    // Ensuring the window.dev object is present
    window.dev = Object.assign({}, window.dev);
    
    Object.keys(SCRIPTS).forEach(function(name){
        var key = "dev." + name;
        mw.hook(key).add(function(v){
            if (name === "colors") COLORS_DEFERRED.resolve(v);
            else if (name === "wds") WDS_DEFERRED.resolve(v);
        });
    });
});