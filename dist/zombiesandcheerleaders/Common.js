/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');

importScriptPage('Countdown/code.js', 'dev');

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

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
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

$(function() {
    var m, userName = false;
    if (-1 != [2,1200,3,500,501].indexOf(wgNamespaceNumber) && (m = wgPageName.match(/(?:\:|%3[aA])([^\/]+)/))) {
        userName = m[1];
    } else if (-1 != 'Following Contributions'.indexOf(wgCanonicalSpecialPageName)) {
        userName = wgUserName;
    }
    if (userName) {
        
        function ISODateNDaysAgo (days) {
            function pad (n) { return n < 10 ? '0' + n : n; }  
            function ISODateString (d) {  
                return    d.getUTCFullYear() + '-'  
                    + pad(d.getUTCMonth()+1) + '-'  
                    + pad(d.getUTCDate())    + 'T'  
                    + pad(d.getUTCHours())   + ':'  
                    + pad(d.getUTCMinutes()) + ':'  
                    + pad(d.getUTCSeconds()) + 'Z';
            }
            return ISODateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
        }
        
        var apiUrl = '/api.php?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
                     '&ucuser='  + userName +
                     '&ucstart=' + ISODateNDaysAgo(0) +
                     '&ucend='   + ISODateNDaysAgo(3 * 30);
    
        $.getJSON(apiUrl, function (result) {
            if (typeof result.query != 'undefined' && typeof result.query.usercontribs != 'undefined' &&
                !result.query.usercontribs.length) {
                $('<span class="group">inactive</span>').appendTo('#UserProfileMasthead hgroup').css({
                    backgroundColor: 'rgb(360,360,360)',
                    color: 'rgb(80,80,80)'
                });
            }
        });
    }
});