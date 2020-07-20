/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* Cookie accessor functions */
function setCookie(name, value, expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);
	document.cookie = name + '=' + escape(value) + ';path=/';
}
 
function getCookie(name) {
	if (document.cookie.length > 0) {
		var start = document.cookie.indexOf(name + '=');
		if (start != -1) { 
			start = start + name.length + 1; 
			var end = document.cookie.indexOf(';', start);
			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(start, end));
		} 
	}
	return '';
}
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');
 
/* Ambox stylesheet */
importStylesheet("Template:Ambox/code.css");

/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');
 
/* SyntaxHighlight Background */
importScript('MediaWiki:Common.js/SyntaxHighligtBackground.js');

/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsibletables.js');

/* Required to display Ambox's correctly */
importStylesheet("Template:Ambox/code.css");