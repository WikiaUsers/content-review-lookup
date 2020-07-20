/**
 * @name            EmoticonPanel
 * @version         v1.4
 * @author          KockaAdmiralac <1405223@gmail.com>
 * @author          Ultimate Dark Carnage <https://dev.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 * @description     This script shows a list of emoticons.
 **/
require([
    "wikia.window", // The core window object
    "wikia.document", // The core document object
    "jquery", // jQuery
    "mw" // MediaWiki
], function(wk, wd, $, mw){
    // MediaWiki configuration variables
    const CONFIG = mw.config.get([
        "wgCanonicalSpecialPageName",
        "wgSassParams"
    ]);
    // The name of the script
    const NAME = "EmoticonPanel";
    // Check if the window is a chat window
    const ISCHAT = CONFIG.wgCanonicalSpecialPageName === "Chat" &&
        $(wd.body).hasClass("ChatWindow");
    // Check if the script is loaded
    const LOADED = Boolean(wk.EmoticonPanel) === true;
    // If the window is not a chat window, do not run
    if (!ISCHAT && LOADED) return;
    // Core dependencies
    const DEPENDENCIES = Object.freeze({
        i18n: "u:dev:MediaWiki:I18n-js/code.js",
        colors: "u:dev:MediaWiki:Colors/code.js",
        dialog: "u:dev:MediaWiki:WDSDialog/code.js"
    });
});