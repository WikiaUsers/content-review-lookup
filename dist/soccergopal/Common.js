/* Test... */
 
function UserPreferencesMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Preferences/'+ encodeURIComponent (wgUserName) +'">Preferences</a></li>');
}
 
addOnloadHook(UserPreferencesMenuItem);

/* Ability to change full page title
 * See w:c:dev:DISPLAYTITLE for info and attribution
 */
 
function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0]; // Find the span with the new title
	if(newPageTitle == null) return; // If not found exit
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0]; //Find the page's title
	if(oldPageTitle == null) return; // If not found exit
	oldPageTitle.innerHTML = newPageTitle.innerHTML; // Set the title
}
addOnloadHook(fixPageName);
 
/* Add "about us" link from "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Avatar_Wiki:About">About us</a></li>');
    }
});

/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
 
// The options need to be set before the import! Otherwise they may not work.
 
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});