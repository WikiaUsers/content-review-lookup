/* Any JavaScript here will be loaded for all users on every page load. */

/* importScriptPages-start */

PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('OasisToolbarButtons/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

/* importScriptPages-end */



/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }

    if ($('#title-meta').length == 0) {
        return;
    }

    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}


// END JavaScript title rewrite
addOnloadHook(rewriteTitle);