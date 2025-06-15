/* Any JavaScript here will be loaded for all users on every page load. */

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/*** DEV SCRIPTS ***/ 
// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true
}; 

// Configuration for LockForums
window.LockForums = {
    expiryDays: 60,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been automatically archived. Its most recent message is <actualDays> days old.',
};
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = "You must select a license when uploading a file.";
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = "You can't upload a file without selecting a license! Please select one and resend the form.";

//Configuration for SignatureCheck
window.i = window.i || 0; 

//Configuration for Discussions Rail Module
    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('#WikiaAdInContentPlaceHolder.rail-sticky-module').exists()) {
            $module.insertBefore('#WikiaAdInContentPlaceHolder.rail-sticky-module');
        } else {
            $module.insertBefore('.FollowedPagesModule');
        }
    });

//Configuration for AjaxRC
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log"];

/*** END DEV SCRIPTS ***/ 
    
// Title Rewrite 
function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite

/*Keep favicon as correct PF logo instead of reverting to Wikia logo*/
document.write('<link REL="shortcut icon" HREF="/images/6/64/Favicon.ico" />')

//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://phineasandferb.wikia.com/vi/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Edit count</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});


// adds a page count function to Special:AllPages
$( function () {
    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'AllPages' &&
        $.getUrlVar( 'from' ) !== undefined ||
        $.getUrlVar( 'to' ) !== undefined ) {
            if ( $( '.mw-allpages-table-chunk' ).length !== 0 ) {
                $( '.mw-allpages-nav' ).eq( 0 ).append( ' | <span class="mw-allpages-count">Page count: <span class="count"></span></span>' );
                $( '.mw-allpages-count .count' ).text( $( '.mw-allpages-table-chunk tbody td' ).length );
            }
    }
} );