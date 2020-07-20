/* User Tags Configuration - http://dev.wikia.com/wiki/UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order:-1/0 },
		bannedfromchat: 'Banned from Chat',
		rbpt: 'Rollback Patrol',
                arbitrator: 'Arbitrator'
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
UserTagsJS.modules.custom = {
	'Obi the LEGO Fan': ['arbitrator'],
        'Harold89': ['arbitrator'],
        'Codyn329': ['arbitrator'],
        'LEGOSuperDKong': ['arbitrator']
};
 
 
 
/* Import all the external scripts */
importArticles({
	type: 'script',
	articles: [
		'u:lmbtest:MediaWiki:AjaxRC.js', //Refresh Activity and Logs
		'u:dev:DupImageList/code.js', //List of Duplicate Images
		'u:dev:AjaxPatrol/code.js', //Quick Patrolling
		'u:dev:UserTags/code.js', //Custom Userpage Tags
		'u:dev:WallGreetingButton/code.js', //Add Wall Greeting Edit Button
	]
});
 
 
 
/* Open External Links in New Tabs - by ShermanTheMythran */
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');
 
 
 
/* Couples with Template:User to move SourceBox to the bottom of an article - by Seaside98 */
$('.moveToBottom').insertBefore(
	$('#mw-content-text')
		.contents()
		.filter(function() { 
			return this.nodeType == 8; 
		})[0]
).show();
 
 
 
/*Add Talk Page Links - by Nxtstep101*/
if ( wgTitle == "Nxtstep101" 
	|| wgTitle == "Seaside98" 
	|| wgTitle == "TwistedAlpha" 
	|| wgTitle == "Alemas2005" 
	|| wgTitle == "Klintran" 
	|| wgTitle == "Dalekst" 
	|| wgTitle == "Harold89" 
	|| wgTitle == "SirComputer" ) {
		$('#WikiaUserPagesHeader .tabs').append('<li><a href="/wiki/User:'+wgTitle+'/Talk">Talk page</a></li>');
}
 
 
 
/* Fix Project Namespace Article Titles - by ShermanTheMythran */
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');
 
 
 
/* By ShermanTheMythran
 * ~These are Lia specific~
 * They handle how the Navbar and Header respond to hover events
 * They also add the username as a class of the body element
 * If you mess them or anything on this page up, you will break the Navbar. :)
 */
$('#my-tools-menu').addClass('WikiaMenuElement');
$('.mediawiki').addClass(wgUserName);
 
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