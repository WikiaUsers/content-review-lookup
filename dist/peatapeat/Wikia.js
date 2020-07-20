/*Talk page whitelist - Nxtstep101*/
if(wgTitle == "Nxtstep101" || wgTitle == "Seaside98" || wgTitle == "TwistedAlpha" || wgTitle == "Alemas2005" || wgTitle == "Klintran" || wgTitle == "Dalekst" || wgTitle == "Harold89" || wgTitle == "SirComputer") {
      $('#WikiaUserPagesHeader .tabs').append('<li><a href="/wiki/User:'+wgTitle+'/Talk">Talk page</a></li>');
}

/* User Tags - Dev */
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order:-1/0 },
		bannedfromchat: 'Banned from Chat',
		rbpt: 'Rollback Patrol'
	}
};
UserTagsJS.modules.inactive = 14;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'sysop', 'bannedfromchat', 'bot', 'checkuser'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'bot'],
	rollback: ['sysop', 'bureaucrat', 'bot'],
	patroller: ['sysop', 'bureaucrat', 'bot']
};
UserTagsJS.modules.implode = {
	'rbpt': ['patroller', 'rollback']
};
 
/* Refresh Activity - by Seaside98 and ShermanTheMythran - Dev */
window.ajaxPages = [ 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log' ];
window.ajaxRefresh = 2500;
 
importArticles({
	type: 'script',
	articles: [
		'MediaWiki:AjaxRC.js', //Refresh Activity
		'u:dev:Countdown/code.js', //Countdowns in Articles
		'u:dev:DupImageList/code.js', //List of Duplicate Images
		'u:dev:AjaxPatrol/code.js', //Quick Patrolling
		'u:dev:AutoEditDropdown/code.js', //Drop Down Menus on Hover
		'u:dev:UserTags/code.js', //Custom Userpage Tags
		'u:dev:LockOldBlogs/code.js', //Archive Old Blogs
		'u:dev:WallGreetingButton/code.js' //Add Wall Greeting Edit Button
    ]
});
 
/* Search Bar Placeholder - by ShermanTheMythran */
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Search this wiki');
 
/* Fix Project Namespace Titles - by ShermanTheMythran */
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');
 
/* Add a Few Classes - by ShermanTheMythran */
$('#my-tools-menu').addClass('WikiaMenuElement');
$('.mediawiki').addClass(wgUserName);
 
/* Display Clock in Footer Toolbar - by Seaside98 - Runescape */
var refreshDate;
function addDate() {
	var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
	$('#showdate').empty().attr('title','Purge the server cache and update the contents of this page.').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
	window.clearTimeout(refreshDate);
	refreshDate = window.setTimeout(addDate, 1000);
}
$(document).ready(function() {
	$('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
	addDate();
});
 
 
/* Open External Links in New Tabs - by ShermanTheMythran */
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');
 
/* Add a Blog under Contribute - by Codyn329 */
$(document).ready(function() { 
	$('.WikiHeader .buttons .contribute ul li').first().after('<li><a href= "/wiki/Special:CreateBlogPage">Add a Blog</a></li'); 
});
 
/* Add Editcount to User Tabs - by Seaside98 */
$(document).ready(function() {
	$('.tabs-container > ul').append('<li><a href="/wiki/Special:Editcount/'+wgTitle+'">Editcount</a></li>');
});
 
 
/* Add History Button to Threads - by Seaside98 */
if (mediaWiki.config.get('wgNamespaceNumber') === 1201) {
	$('.follow').after('<a class="wikia-button" style="float:right;margin-left:10px;" href="/wiki/'+ wgPageName +'?action=history">History</a>');
}
 
/* Add Current Diff Link to Edit Menu - by Seaside98 */
$('.WikiaPageHeader .WikiaMenuElement').prepend('<li><a href="/wiki/'+ wgPageName +'?diff=cur">Current Diff</a></li>');
 
 
/* Various Fixes - by ShermanTheMythran */
$('.WikiNav > ul > li:first-child').addClass('liActive');
$('.WikiNav > ul > li').mouseenter(function() {
	$('.WikiNav > ul > li').removeClass('liActive');
	$(this).addClass('liActive'); }
);
$('.WikiNav .subnav-3').parent().mouseenter(function() {
	$(this).addClass('liActive-2'); }
);
$('.WikiNav .subnav-2 > li').mouseleave(function() {
	$('.WikiNav .subnav-2 > li').removeClass('liActive-2'); }
);
 
/* Force Element to the Bottom of the Page - by Seaside98 */
$('.moveToBottom').insertBefore($("#mw-content-text").contents().filter(function(){ return this.nodeType == 8; })[0]).show();

/*Temporary testing by Nxtstep101*/
importScriptPage('MediaWiki:LMBW.js','nxtstep101test');