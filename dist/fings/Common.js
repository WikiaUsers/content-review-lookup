/* Any JavaScript here will be loaded for all users on every page load. */

/* WikiApiary link on Special:Statistics */
$( document ).ready( function() {
    if( wgCanonicalSpecialPageName === "Statistics" ) {
        $( '<li><a rel="nofollow" class="external text" href="//wikiapiary.com/wiki/Fings_Wiki">Fings Wiki on WikiApiary</a></li>' ).insertAfter( '#mw-content-text ul:last-of-type > li:last-of-type' );
    }
} );

/* External scripts */
AjaxRCRefreshText = 'Refresh!';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [ "Special:RecentChanges", "Special:WikiActivity" ];
importArticles( {
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ReferencePopups/custom.js",
        "w:c:dev:AjaxRC/code.js"
    ]
});
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});