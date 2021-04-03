/* Any JavaScript here will be loaded for all users on every page load. */

Body {
  background-size: 100% auto !important;
}

/* Chat Tags */
importScriptPage('ChatTags/code.js', 'dev');
 
/* External Image Loader */
importScriptPage('ExternalImageLoader/code.js', 'dev');
 
/* Automatic signature */
importScriptPage('Sine/code.js', 'dev');
 
/* Voice Dictation */
importScriptPage('Voice_Dictation/voice.js', 'dev');
 
/* Search Suggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});
 
/* Chat Options */
importScriptPage('ChatOptions/code.js', 'dev');
 
/* Sexy User Page */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});
 
/* Code */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Code/code.js'
    ]
});

/* Header links */
importArticles({
    type: 'script',
    articles: [
        'u:dev:HeaderLinks/code.js'
    ]
});
 
/* Floating TOC */
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});
 
/* Reveal Anonymous IP */
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:WikiActivity"];

/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');

/* Admin List */
importScriptPage('ListAdmins/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');
 
/* Collapsible Infobox */
importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
 
/* Clock */
importScriptPage('DisplayClock/code.js', 'dev');
 
/* Adds Purge button */
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Lists of Duplicate images */
importScriptPage('DupImageList/code.js', 'dev');
 
/* Top Contributor */
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});