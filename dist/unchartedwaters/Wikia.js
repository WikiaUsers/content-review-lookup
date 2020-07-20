// Putting it here because its a Wikia-skin (oasis) only problem.

// add UWO server clock
try {
$( function ($) {
    $('header#WikiaHeader.WikiaHeader').append('<div style="position:absolute; top:2px; right:175px; z-index:999; display:inline-block;"><iframe src="http://free.timeanddate.com/clock/i383dpye/n137/fn16/fs10/fc93e1ea/tct/pct/ftb/tt0/tw1/tm1/th2/ta1/tb4" frameborder="0" width="96" height="28" allowTransparency="true"></iframe></div>');
});
} catch (err) {
   alert(err.message);
}

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ListAdmins/code.js',
        'w:c:dev:InactiveUsers/code.js',
    ]
});


/*
// http://dev.wikia.com/wiki/SearchGoButton
// importScriptPage('SearchGoButton/code.js', 'dev');

// http://dev.wikia.com/wiki/InactiveUsers
importScriptPage('InactiveUsers/code.js', 'dev')

// Resize Wikia page 77%-85% of desktop width if wider than 1024 pixels.
// importScriptPage('MediaWiki:Wikia.js/XpandedPage.js', 'biobrain');

// http://dev.wikia.com/wiki/AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
}
importScriptPage('AutoEditDropdown/code.js', 'dev');

function importScriptPage(page, server) {
    var url = '/index.php?title='
              + encodeURIComponent(page.replace(/ /g, '_')).replace('%2F', '/').replace('%3A', ':')
              + '&action=raw&ctype=text/javascript';
    if (typeof server == "string")
        url = (server.indexOf('://') == -1)
              ? 'http://' + server + '.wikia.com' + url
              : server + url;
    return importScriptURI(url);
}
*/
/** See: http://dev.wikia.com/wiki/Talk:ShowHide#The_Oasis_problem_has_been_solved **/