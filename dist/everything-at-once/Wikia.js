// <source lang="JavaScript">  
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS  
 
function addMastheadTags() { 
var rights = {};
 
// BEGIN List of Accounts Given Extra User Rights Icons
 
 
rights["Fangirl111"] = ["Queen", "Founder", "Admin", "Bureaucrat", "Coder"]
rights["Lady Pitchiner"] = ["Queen", "Founder", "Admin", "Bureaucrat"]
rights["Ironman01"] = ["Invited Guest in the Castle"]
rights["Skyebreeze"] = ["Invited Guest in the Castle"]
rights["Laughing Jack aka LJ"] = ["King", "Admin", "Bureaucrat"]
rights["Pitch Black the Boogeyman"] = ["King", "Admin", "Bueraucrat"]
rights["Jack Frost's Little Sister"] = ["Invited Guest in the Castle"]
rights["Sibunafoeye"] = ["Invited Guest in the Castle"]
rights["EternallyFrozen13"] = ["Uninvited", "Banished from the Kingdom"]
rights["Jack's Sister"] = ["Uninvited", "Banished from the Kingdom", "Global Troll"]
rights["Bronze Wool"] = ["Uninvited", "Banished from the Kingdom", "Global Troll", "Disabled by Wikia Staff"]
rights["Iamthefallencause"] = ["Uninvited", "Banished from the Kingdom", "Global Troll"]
rights["Cake's are the Best"] = ["Uninvited", "Banished from the Kingdom", "Global Troll", "Previously Blocked by Wikia Staff"]
rights["Flutterbutter"] = ["Uninvited", "Banished from the Kingdom", "Global Troll", "Abuser of Multiple Accounts (I Died Once and Kaori Fujimiya)"]
rights["I Died Once"] = ["Uninvited", "Banished from the Kingdom", "Global Troll", "Abuser of Multiple Accounts (Flutterbutter and Kaori Fujimiya)"]
rights["Kaori Fujimiya"] = ["Uninvited", "Banished from the Kingdom", "Global Troll", "Abuser of Multiple Accounts (Flutterbutter and I Died Once)"]
rights["ShootingStar75"] = ["Uninvited"]

// END List of Accounts Given Extra User Rights Icons  
 
// BEGIN Script to Remove Old Rights Icons & Insert New  
 
if (wgCanonicalSpecialPageName == "Contributions") { 
var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
 } else { var user = wgTitle; }
 
if (typeof rights[user] != "undefined") {  
 
// remove old rights
 
$('.UserProfileMasthead .masthead-info span.tag').remove();
 
for( var i=0, len=rights[user].length; i < len; i++) {
 
// add new rights 
$('<span class="tag" span style="margin-left: 10px !important">' + 
rights[user][i] + '</span>').appendTo('.masthead-info hgroup'); 
} 
}  
 
// END Script to Remove Old Rights Icons & Insert New  
 
};  
 
$(function() { 
if ($('#UserProfileMasthead')) { 
addMastheadTags(); 
} 
});  
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
 
// </source>End
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light"
};
importScriptPage('SocialIcons/code.js','dev');
 
/*** AJAX Auto-refresh on wiki activity ****************************/
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh this page',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:NewFiles' );
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}