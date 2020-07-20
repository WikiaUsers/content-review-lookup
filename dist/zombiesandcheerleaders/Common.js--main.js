/* Any JavaScript here will be loaded for all users on every page load. */
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('ShowHide/code.js', 'dev');

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Adds "purge" option to page controls
 * See w:c:dev:PurgeButton for info & attribution 
 */

importScriptPage('PurgeButton/code.js', 'dev');

/* DisableArchiveEdit
 * Discourages/disables the editing of talk page archives
 * By [[User:Porter21]]
 */

importScriptPage('DisableArchiveEdit/code.js', 'dev');

/* Special:Random > Special:Random/main
 * By [[User:Porter21]]
 */

jQuery(function($) {
   if (skin == "oasis" || skin == "wikia") {
      $('ul.subnav-2.accent li a[href="/wiki/Special:Random"]').attr('href', '/wiki/Special:Random/main');
   }
});

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Title rewrite
 * Rewrites the page's title and can change alignment, see [[Template:Title]]
 * Originally by [[User:Sikon|Sikon]], this version (jQuery) by [[wikia:User:Grunny|Grunny]]
 */

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

/* Archive edit tab disabling
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$('#WikiaPageHeader .wikia-menu-button a:first').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/* Summary filler
 * From RuneScape Wiki
 */

importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');