/* Any JavaScript here will be loaded for all users on every page load. */

/* Fair Use Rationale */
$(function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'special:upload') {
        return;
    }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair Use Rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceable       = \r| Other Information = \r}}"));
 
});
 
// Import [[MediaWiki:Onlyifuploading.js]] 
if (wgCanonicalSpecialPageName == "Upload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 

PurgeButtonText = 'Purge';

/* importScriptPages-start */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/Toggler.js',

        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:ListFiles/code.js', // ListFiles from Dev Wiki
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:ShowHide/code.js',
    ]
});
/* importScriptPages-end */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }

    if ($('#title-meta').length === 0) {
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
 
$(function() {
    if (skin == 'oasis') 
        $('<li id="displayTimer"><span id="showdate"></span></li>').appendTo('#GlobalNavigation');
    else
        $('#p-personal ul').prepend('<li><span id="showdate"></span></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
    $('#displayTimer').css({'font-size': "12px"});
});
//

/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}
 