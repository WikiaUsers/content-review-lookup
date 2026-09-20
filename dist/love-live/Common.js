/*<pre> Any JavaScript here will be loaded for all users on every page load.  */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
$(function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }

    if ($('#title-meta').length === 0) { return; }

    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
});
// END JavaScript title rewrite

/* JST Clock */
window.DisplayClockJS = {
    format: '%2d %{Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec}m %2Y %2H:%2M (JST)',
    hoverText: 'JST Clock',
    interval: 500, /* How often the timer updates in milliseconds (1000=1 second) */
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
    offset: 540
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});