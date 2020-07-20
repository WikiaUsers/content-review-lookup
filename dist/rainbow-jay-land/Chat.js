// ***********************************************************************
// CSS Imports
// ***********************************************************************

    importStylesheet('MediaWiki:Chat.css');
    importStylesheet('User:' + mw.config.get('wgUserName') + '/chat.css');

// ***********************************************************************
// END CSS Imports
// ***********************************************************************


// ******************************************************************
// JS Imports
// ******************************************************************

    importScript('User:' + mw.config.get('wgUserName') + '/chat.js');
    importScriptPage('MediaWiki:AjaxEmoticons/code.js','dev');
    importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
    importScriptPage('MediaWiki:ChatTimestamps/code.js','dev');

// ******************************************************************
// END JS Imports
// ******************************************************************


// **********************************************************
// Chat Options
// **********************************************************

    var chatOptionsLoaded;
    if (chatOptionsLoaded != 1){
        chatOptionsLoaded = 1;
        importScriptPage('MediaWiki:ChatOptions/code.js','dev');
        }

// **********************************************************
// END Chat Options
// **********************************************************