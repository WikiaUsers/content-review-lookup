/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('BackToTopButton/code.js', 'dev');

EditIntroButtonText = 'Intro';
importScriptPage('EditIntroButton/code.js', 'dev')

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('AutoEditDropdown/code.js', 'dev');

importScriptPage('PurgeButton/code.js', 'dev');

// Custom headers for Hot Spots and Community Messages
function hotspotsheader() {
     $('.HotSpotsModule').prepend('<div align="center"><img src=""></div>');
}

$(hotspotsheader);

function communityheader() {
     $('.CommunityCornerModule').prepend('<div align="center"><img src=""></div>');
}

$(communityheader);
// END Custom headers for Hot Spots and Community Messages

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
// END of ajax auto-refresh