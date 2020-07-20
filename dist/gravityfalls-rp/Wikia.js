
(function() {var original = document.title;if (typeof blinkInterval === 'undefined') {window.blinkInterval = 1000;}var timeout;window.blinkTitle = function(newMsg) {function step() {document.title = (document.title == original) ? newMsg : original;timeout = setTimeout(step, blinkInterval);}cancelBlinkTitle(timeout);step();};window.cancelBlinkTitle = function() {clearTimeout(timeout);document.title = original;};}());
 
 
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:RecentChangesMultiple/code.2.js"
    ]
});