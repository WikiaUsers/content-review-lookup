importArticles({
    type: "style",
    article: "MediaWiki:Local.css"
});

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// Importable Local.css

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) // AjaxRedirect
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');