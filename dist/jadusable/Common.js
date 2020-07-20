/* Any JavaScript here will be loaded for all users on every page load. */
 
/* CountDown script */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
 /* Collasible tables and divs */
 importScriptPage('ShowHide/code.js', 'dev');

 /* Import CSS styles for ambox */
 importStylesheet("Template:Ambox/code.css");
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Copied from [[w:c:Community:MediaWiki:Common.js]] on 3-Sep-2010
 */

 if(wgNamespaceNumber == 110) {
  function disableOldForumEdit() {
 	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
 		return;
 	if(!document.getElementById('old-forum-warning') ||
 		 !document.getElementById('ca-edit') )
 		return;
 
 	if( skin == 'monaco' ) {
 		editLink = document.getElementById('ca-edit');
 	} else if( skin == 'monobook' ) {
 		editLink = document.getElementById('ca-edit').firstChild;
 	}
 
 	editLink.removeAttribute('href', 0);
 	editLink.removeAttribute('title', 0);
 	editLink.style.color = 'gray';
 	editLink.innerHTML = 'Archived';
 
 	$('span.editsection-upper').remove();
  }
  addOnloadHook( disableOldForumEdit );
 }
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
 *  Requires copying Template:USERNAME.
 */
  
 function UserNameReplace() {
 	if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
 	$("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
	        retired: { u: 'Retired' }
	},
};

UserTagsJS.modules.custom = {
	'Immortallies': ['retired'],
	'UberTaco': ['retired'],
	'ToRn1ne': ['retired'],
	'A-negative': ['retired']
};