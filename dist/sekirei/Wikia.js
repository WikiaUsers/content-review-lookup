var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};
importScriptPage('SocialIcons/code.js','dev');

/* FloatingToc */
importScript('MediaWiki:FloatingToc.js');

/* add contribs to user menu - 2/1/11 */

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
  
addOnloadHook(UserContribsMenuItem);

/* Back To Top */
importScriptPage('BackToTopButton/code.js', 'dev');

/* Inactive Users */
InactiveUsers = {months: 3};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Anonymous IP */
importScriptPage('RevealAnonIP/code.js', 'dev');

// <syntax type="javascript">
 
// </syntax>

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

/* RefreshButton */

PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');