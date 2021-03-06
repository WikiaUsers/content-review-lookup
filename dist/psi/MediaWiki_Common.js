/* Any JavaScript here will be loaded for all users on every page load. */

/* importScriptPages-start */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

//importScriptPage('MediaWiki:Search_Fix.js', 'dantest');

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* importScriptPages-end */

// ============================================================
// displayTimer
// ============================================================
 
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().append('<span style="font-weight: bold; text-transform: none;"><a title="Purge the server cache and update the contents of this page." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + UTCDate.substring(5) + '</a></span>');
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li id="displayTimer"><span id="showdate"></span></li>').appendTo('#GlobalNavigation');
    else
        $('#p-personal ul').prepend('<li><span id="showdate"></span></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
    $('#displayTimer').css({'font-size': "12px"});
});
//