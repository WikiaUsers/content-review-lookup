/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('BackToTopButton/code.js', 'dev');



/********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him*/
/********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://monsterhunter.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() { 
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
});
















/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

/* odd floating code - causing JS errors
{
	saveButton.value = 'Save page (use preview first)';
	saveButton.style.fontWeight = 'normal';
} */


//Global Show/Hide
//Author: Princess Platinum
 
$(function() {
    $('#collapse-global').html('<a class="wikia-button" onclick="for (var i=0; i < 500; i++) { collapseTable([i]); }" style="color:#ffffff;">Show All / Hide All</a>');
});


////////////////////////////////////////////////////////////////////////////////
// Custom User Tags
window.UserTagsJS = {
	modules: {},
	tags: {
	bureaucrat: { order: 1, link:'Monster Hunter Wiki:Administrators', },
	sysop: { order: 1, link:'Monster Hunter Wiki:Administrators',},
	rollback: { u: 'Rollback', order: 1, link:'Monster Hunter Wiki:Administrators',},
	chatmoderator: { order: 2, link:'Monster Hunter Wiki:Administrators',},
// Custom Tags
	hunterl: { u: 'Viva La Hunterlution' },
	b: { u: 'Bow User' },
	cb: { u: 'Charge Blade User' },
	drex1: { u: 'Janitor' },
	drex2: { u: 'God-Tier Swag' },
	ds: { u: 'Dual Sword User' },
	gl: { u: 'Gunlance User' },
        gobul: { u: 'Deputy' },
	gs: { u: 'Great Sword User' },
	h: { u: 'Hammer User' },
	hbg: { u: 'Heavy Bowgun User' },
	hh: { u: 'Hunting Horn User' },
	ig: { u: 'Insect Glaive User' },
        kogath: { u: 'Dream Stomper' },
	l: { u: 'Lance User' },
	lbg: { u: 'Light Bowgun User' },
	ls: { u: 'Long Sword User' },
	mbg: { u: 'Medium Bowgun User' },
        rt: { u: 'Hammer Master Race' },
	sa: { u: 'Switch Axe User' },
	sns: { u: 'Sword and Shield User' },
	TVJ: { u: 'YOLO Master' },
	wolf: { u: 'The Queen' },
	}
};
UserTagsJS.modules.custom = {
        '- MHCaboose -': ['rollback',],
	'Azo369': ['h',],
	'Chimera-gui': ['hh', 'ig',],
	'Darksoulwolf': ['ds',],
	'Democide': ['b',],
	'Dracosaurian': ['rollback',],
	'Drexzen': ['rollback', 'sns', 'drex1', 'drex2',],
        'GobulPower': ['gobul',],
	'Kogath': ['kogath', 'gs',],
	'Mckrongs': ['gl', 'hunterl',],
	'Mr TR011': ['gs',],
	'Pike-The-Ninja': ['rollback',],
        'RampagingTigrex': ['hunterl', 'rt',],
	'Setheo': ['l',],
        'Slifer-The-Sky-Dragon': ['h',],
	'The Void Joker': ['h', 'TVJ',],
	'WolfQueen': ['l', 'wolf',],
	'Youla': ['gs',],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat']
UserTagsJS.modules.inactive = {
	days: 180,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});



//Reduce category page listings to one column by Bobogoobo
$(function() {
    if (mw.config.get('wgCanonicalNamespace') !== 'Category') {
        return;
    }
 
    var html = '';
    for (var i = 0; i < 3; i++) {
        html += $('#mw-pages table:first td')[i].innerHTML;
    }
    html = html.replace(/\<\/ul\>.*cont\.\<\/h3\>\n\<ul\>/g, '');
    $('#mw-pages table tr:first').html('<td style="width:100%;">' + html + '</td>');
});

importArticles({
 type:'script',
 articles:[
  "w:c:dev:Countdown/code.js",
  "MediaWiki:Sm2.js", //Extension:SoundManager2Button
 ]
});