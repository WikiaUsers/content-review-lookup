if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    window.massCategorizationDelay = 1000;
    importArticles({
        type: 'script',
        articles: [
            'u:dev:AutoStamp/code.js',
        ]
    });
}

/* Spoiler Alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};

importArticles({
	type: 'script',
	article: 'u:pad.wikia.com:MediaWiki:FilterTable.js'
});

// AjaxRC
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Silently refreshes the contents of this page every 60 seconds without requiring a full reload';