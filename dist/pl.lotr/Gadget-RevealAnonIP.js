/*jshint browser:true jquery:true curly:false */
 
// This is a loader thunk to force RevealAnonIP to load even if the Wiki has
// been configured to disallow it.
// ONLY INCLUDE THIS IN USER SCRIPTS. Wikis should use [[RevealAnonIP/code.js]]
// directly instead.
(function($, RAIP) {
    "use strict";
    // Script is either started or has configuration
    if (RAIP) {
        // If the script is already started then invoke the init function.
        // init will do nothing if it is running normally (w/ permission).
        if (typeof(RAIP.init) === 'function') return RAIP.init();
        // Throw away the permissions list
        window.RevealAnonIP = $.extend(RAIP, { permissions: ['*'] });
    }
    // The script is not loaded yet.
    window.importArticle({ type: 'script', articles: ['w:c:dev:RevealAnonIP/code.js'] });
})(jQuery, window.RevealAnonIP);