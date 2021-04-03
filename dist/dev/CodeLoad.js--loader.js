/*jslint browser, long */
/*global console, importArticles, codeLoad */

(function (context, cl) {
    "use strict";

    var imports = {
        css: [],
        js: []
    };

    // set preferences on the global object if required
    function setGlobalPrefs(id) {
        if (
            !cl.definitions[id].preferences ||
            cl.definitions[id].preferences.requiresGlobalPrefs !== true
        ) {
            return;
        }

        var prefs = {};
        var prefNamespace = cl.definitions[id].preferences.globalPrefNamespace;
        var scriptPrefs = cl.getScriptPrefs(id);

        if (typeof prefNamespace === "string") {
            prefs[prefNamespace] = scriptPrefs;
        } else {
            prefs = scriptPrefs;
        }

        Object.keys(prefs).forEach(function (prefName) {
            if (context[prefName] === undefined) {
                context[prefName] = prefs[prefName];
            } else {
                console.warn("CodeLoad: will not override existing variable ‘%s’, requested by definition ‘%s’", prefName, id);
            }
        });
    }

    // check if article is suitable to add to imports, and if so, add it
    function addToImports(article) {
        if (typeof article !== "string") {
            console.warn("CodeLoad: article is not a string:", article);
            return;
        }

        var type = article.split(".").pop();
        var fromDevWiki = article.slice(0, 4) === "dev:";

        // only imports with .css / .js extension accepted
        if (type !== "css" && type !== "js") {
            console.warn("CodeLoad: article does not have ‘.css’ or ‘.js’ extension:", article);
            return;
        }

        // CSS pages on Dev Wiki were previously in either the Main or MediaWiki namespace,
        // and so required the namespace to be included in page name. All CSS pages are now
        // in MW namespace, so fix up older imports that specifically add MW namespace.
        if (type === "css" && fromDevWiki && article.slice(4, 14) === "MediaWiki:") {
            article = "dev:" + article.slice(14);
        }

        // add MW namespace to import + handle imports from dev.wikia.com
        if (fromDevWiki) {
            article = "u:dev:MediaWiki:" + article.slice(4);
        } else {
            article = "MediaWiki:" + article;
        }

        // only add once
        if (imports[type] && imports[type].indexOf(article) === -1) {
            imports[type].push(article);
        }
    }

    // check if current code definition should be used
    function checkDefinition(id) {
        var articles = cl.definitions[id].articles;

        if (
            Array.isArray(articles) &&
            cl.definitionEnabled(id) &&
            cl.definitionAvailable(id)
        ) {
            articles.forEach(addToImports);
            setGlobalPrefs(id);
        }
    }

    function main() {
        Object.keys(cl.definitions).forEach(checkDefinition);

        if (imports.css.length) {
            importArticles({
                type: "style",
                articles: imports.css
            });
        }
        if (imports.js.length) {
            importArticles({
                type: "script",
                articles: imports.js
            });
        }
    }

    main();
}(window, codeLoad));