(function (mw) {
    "use strict";

    // Message Wall, Thread
    var nsWhitelist = [1200, 1201];
    var ns = mw.config.get("wgNamespaceNumber");

    // Load [[MediaWiki:Geshi.css]] as needed on namespaces where it's not
    // available by default.
    //
    // Based on [[w:c:dev:MediaWiki:Wikia.js]].
    if (nsWhitelist.indexOf(ns) !== -1 && document.querySelector(".mw-geshi")) {
        mw.loader.load("ext.geshi.local");
    }
})(mediaWiki);