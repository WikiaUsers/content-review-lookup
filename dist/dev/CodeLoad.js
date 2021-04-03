/*jslint browser, long */
/*global jQuery, mediaWiki, importArticles, define, console */

(function ($, mw) {
    "use strict";

    var mwConfig = mw.config.get([
        "skin",
        "wgCanonicalSpecialPageName",
        "wgDBname",
        "wgFormattedNamespaces",
        "wgIsArticle",
        "wgPageName",
        "wgUserGroups",
        "wgUserName"
    ]);

    var cl = {
        definitions: {},
        groups: {},
        prefDescriptions: {}
    };

    var userData = {};

    // user's prefs key in localStorage - CodeLoad-prefs_wikiname_Example
    cl.userDataKey = "CodeLoad-prefs_"
            + mwConfig.wgDBname + "_" + (mwConfig.wgUserName || "anonymous");

    // user's prefs page on wiki - User:Example/preferences-codeload.css
    cl.userDataPage = mwConfig.wgFormattedNamespaces[2] + ":"
            + mwConfig.wgUserName + "/preferences-codeload.css";


    // promise used to make sure i18n messages are loaded before use
    cl.messagesReady = new $.Deferred();


    // test if localStorage exists and is usable
    // source: https://github.com/Modernizr/Modernizr/tree/master/feature-detects/storage/localstorage.js
    // license: MIT - https://opensource.org/licenses/MIT
    cl.localStorageIsUsable = (function () {
        var mod = "modernizr";
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (ignore) {
            return false;
        }
    }());


    // get a definition's preferences
    cl.getScriptPrefs = function (id, siteOnly) {
        var prefs = {};

        var sitePrefs = cl.definitions[id] && cl.definitions[id].preferences;
        var userPrefs = userData[id];

        if (sitePrefs !== null && typeof sitePrefs === "object") {
            // if invalid or no user prefs, set siteOnly so they'll be ignored
            if (userPrefs === null || typeof userPrefs !== "object") {
                siteOnly = true;
            }

            Object.keys(sitePrefs).forEach(function (prefName) {
                if (
                    siteOnly !== true &&
                    // check user pref type to prevent type issues with badly-set user prefs
                    typeof sitePrefs[prefName] === typeof userPrefs[prefName]
                ) {
                    prefs[prefName] = userPrefs[prefName];
                } else {
                    prefs[prefName] = sitePrefs[prefName];
                }
            });

            // don't include internal-use prefs
            delete prefs.enabled;
            delete prefs.globalPrefNamespace;
            delete prefs.requiresGlobalPrefs;
        }

        return prefs;
    };

    // check if a definition should be enabled
    cl.definitionEnabled = function (id, siteOnly) {
        var userPrefs = userData[id];

        if (siteOnly === true || userPrefs === undefined || userPrefs === null) {
            return Boolean(cl.definitions[id]) &&
                    Boolean(cl.definitions[id].preferences) &&
                    cl.definitions[id].preferences.enabled === true;
        }

        return (userPrefs.enabled || userPrefs) === true;
    };

    // check if a definition is available for user's current skin/usergroup
    cl.definitionAvailable = function (id) {
        var req = cl.definitions[id] && cl.definitions[id].requirements;
        if (!req) {
            return true;
        }

        var a = true;
        var b = true;
        if (req.usergroups) {
            a = req.usergroups.split("|").some(function (group) {
                return mwConfig.wgUserGroups.indexOf(group) !== -1;
            });
        }
        if (req.skins) {
            b = req.skins.split("|").indexOf(mwConfig.skin) !== -1;
        }
        return a && b;
    };

    // set prefs to local storage
    cl.setPrefs = function (prefs) {
        if (typeof prefs !== "string") {
            prefs = JSON.stringify(prefs || {});
        }

        if (cl.localStorageIsUsable) {
            localStorage.setItem(cl.userDataKey, prefs);
        }
    };


    // attempt to parse provided prefs
    function parsePrefs(prefs) {
        try {
            userData = JSON.parse(prefs || "{}");
        } catch (ex) {
            console.warn("CodeLoad: invalid user prefs:", ex.message);
        }
    }

    // load prefs from user's prefs page
    function loadPrefs() {
        return $.ajax({
            url: mw.util.getUrl(cl.userDataPage, {
                action: "raw",
                maxage: "0",
                smaxage: "0"
            }),
            dataType: "text"
        }).fail(function () {
            // page probably doesn't exist…
            // save to local storage anyway, to save having to fetch the page next time
            cl.setPrefs("{}");
        }).done(function (data) {
            parsePrefs(data);
            cl.setPrefs(userData);
        });
    }

    function main() {
        var imports = [
            "MediaWiki:CodeLoad-definitions.js",
            "u:dev:MediaWiki:CodeLoad.js/preferences-link.js"
        ];

        if (
            mwConfig.wgCanonicalSpecialPageName === "Blankpage" &&
            mw.util.getParamValue("blankspecial") === "CodeLoadPrefs"
        ) {
            // page = Special:BlankPage?blankspecial=CodeLoadPrefs
            imports.push(
                "u:dev:MediaWiki:I18n-js/code.js",
                "u:dev:MediaWiki:QDmodal.js",
                "u:dev:MediaWiki:CodeLoad.js/localisation.js",
                "u:dev:MediaWiki:CodeLoad.js/preferences.js"
            );
            importArticles({
                type: "style",
                articles: ["u:dev:MediaWiki:CodeLoad.js/preferences.css"]
            });
        } else if (
            mwConfig.wgPageName === cl.userDataPage &&
            mwConfig.wgIsArticle
        ) {
            // page = User:Example/preferences-codeload.css
            imports.push(
                "u:dev:MediaWiki:I18n-js/code.js",
                "u:dev:MediaWiki:CodeLoad.js/localisation.js",
                "u:dev:MediaWiki:CodeLoad.js/preferences-userpage.js"
            );
        } else {
            // any other page
            imports.push("u:dev:MediaWiki:CodeLoad.js/loader.js");
        }

        importArticles({
            type: "script",
            articles: imports
        });
    }

    function init() {
        // make global
        window.codeLoad = cl;
        // TODO: remove once cached copies no longer rely on this
        window.define && define("fosl.codeload", cl);

        var prefs = cl.localStorageIsUsable && localStorage.getItem(cl.userDataKey);

        if (prefs || mwConfig.wgUserName === null) {
            // prefs are cached in local storage, or user is anon so cannot have prefs page
            parsePrefs(prefs);
            main();
        } else {
            // prefs need to be loaded from page
            loadPrefs().always(main);
        }
    }

    mw.loader.using("mediawiki.util").done(init);
}(jQuery, mediaWiki));