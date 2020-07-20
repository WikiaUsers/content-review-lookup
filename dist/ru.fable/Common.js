/********************************************************
    Scripts:
    masthead.js - Additional labels
    Standard Edit Summary
    bestpages.js - Best Pages Of The Month Crown
    Avatar-border.js - Cute border for avatar like a Fable: The Lost Chapters
    Inactive Users
    Duplicate Image List
********************************************************/

//  Configuration for import scripts

InactiveUsers = { 
    months: 2,
    gone: ['Danil Chupov'],
    text: 'НЕАКТИВЕН'
};

// AjaxRC configuration
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';

//  Main import. USE IT FOR IMPORTING! DO NOT USE importScriptPage();

importArticles({
    type: 'script',
    articles: [ 
       'w:dev:AjaxRC/code.js',
       'MediaWiki:Common.js/masthead.js',
       'MediaWiki:Common.js/bestpages.js',
       'MediaWiki:Common.js/Avatar-border.js',
       'MediaWiki:Common.js/Wikify.js',
       'w:dev:DupImageList/code.js',
       'w:dev:InactiveUsers/code.js',
       'w:dev:Countdown/code.js',
       'w:dev:Standard_Edit_Summary/code.js',
       'w:korniux:SpeedRaw/code.js'
       
   ]
});

//  Additional code for wiki

if ('ontouchstart' in window || 'onmsgesturechange' in window) {
$(document.documentElement).addClass('touchscreen');
}

var RedirTrigger = $('#TotalRedirect');
console.log(RedirTrigger);
if (RedirTrigger.length) {
    document.location.href = 'http://' + document.domain + '/wiki/' + RedirTrigger.data('page');
}
console.log('Fable MEGA JS ENGINE v9999.9 is loaded!');