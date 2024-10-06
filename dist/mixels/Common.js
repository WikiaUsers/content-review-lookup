/* Cubit logo */
$( document ).ready( function() {
    if( skin === "oasis" ) {
        $( '<a href="/wiki/Special:Random" title="Go to a random article"><div class="bit-container"><div id="cubit"><div class="bit-row"><div class="bit bit1"></div><div class="bit bit2"></div></div><div class="bit-row"><div class="bit bit3"></div><div class="bit bit4"></div></div><div class="bit-overlay"></div></div></div></a>' ).appendTo( '.wordmark' );
        $( '[data-canonical="random"]' ).parent().remove(); // Cubit serves as [[Special:Random]] link
    }
} );

/* Special:Analytics link on Special:Statistics */
$( document ).ready( function() {
    if( wgCanonicalSpecialPageName === "Statistics" ) {
        $( '<li><a rel="nofollow" class="external text" href="//mixels.fandom.com/wiki/Special%3AAnalytics">Analytics</a></li>' ).insertAfter( '#mw-content-text ul:last-of-type > li:last-of-type' );
    }
} );

/* WikiApiary link on Special:Statistics */
$( document ).ready( function() {
    if( wgCanonicalSpecialPageName === "Statistics" ) {
        $( '<li><a rel="nofollow" class="external text" href="//wikiapiary.com/wiki/Mixels_Wiki_(en)">Mixels Wiki on WikiApiary</a></li>' ).insertAfter( '#mw-content-text ul:last-of-type > li:last-of-type' );
    }
} );

window.ItemsToAdd = [
  {
    'Name': 'Candidates for deletion',
    'Page': 'Category:Candidates for deletion',
    'Description': 'It has been suggested that the pages listed should be deleted, please contact an administrator about it.'
},
{
    'Name': 'Cleanup',
    'Page': 'Category:Cleanup',
    'Description': 'These articles require cleanup to reach our quality standards.'
},
{
    'Name': 'Article stubs',
    'Page': 'Category:Article stubs',
    'Description': 'These articles are under 500 bytes, you could help out by adding a few sentences.'
},
{
    'Name': 'Pages under construction',
    'Page': 'Category: Pages currently under construction',
    'Description': 'These pages are still under construction and could use some help.'
}
];
window.AffectsSidebar = true;

/* External scripts */
AjaxRCRefreshText = 'Remix!';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [ "Special:RecentChanges", "Special:WikiActivity" ];
importArticles( {
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ReferencePopups/custom.js",
        "w:c:dev:AjaxRC/code.js"
    ]
} );

window.SeeMoreActivityButtonOld = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
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


window.ImprovedTabbers = {
        HideHeaderTitle: true,
        HideContentTitle: true,
        NonASCIIAnchor: true,
        SynchroInfoboxes: false,
        SynchroTabbers: false,
};

window.useIncludedStylesheet = true;