importArticles({
    type: "script",
    articles: [
        "MediaWiki:AdminHilights.js",
        "MediaWiki:DateTimeClock.js"
    ]
}, {
    type: "style",
    articles: [
        "MediaWiki:Fonts.css"
    ]
});
 
/* USER NAME - this is causing the Message Wall edited message 
   to show the user viewing the page as editing the message */
$('.username').text(mw.config.get('wgUserName'));