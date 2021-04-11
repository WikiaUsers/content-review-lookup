/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

importScriptURI('/extensions/OggHandler/OggPlayer.js');