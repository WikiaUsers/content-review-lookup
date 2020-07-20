/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Countdown.js */
importScriptPage('MediaWiki:Countdown.js', 'godisme');

/* WAM */

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* YoutubePlayer */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js',
    ]
});

/* Insights teste */

ItemsToAdd = [
  {
    'Name': 'Personagens',
    'Page': '',
    'Description': 'teste'
  },
];
AffectsSidebar = true;