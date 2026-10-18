/* Any JavaScript here will be loaded for all users on every page load.  */

// Template:Tabs
$(function() {
	// If a sub-tab is 'selected', also make the parent tabs also 'selected'
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabsp
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Template:Tabs

// tooltip thing
window.tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: false,
};
// end of tooltip thing

// UserTags Configuration
window.UserTagsJS = {
	modules: {},
	tags: {
		/* group: { associated tag data } */
		// staff ranks
		'head-of-wiki': {u:'Head of Wiki', order:-1, link:'Project:Wiki_Staff#Bureaucrats'},
		'founder': {u:'Founder', order:-1, link:'Project:Wiki_Staff#Bureaucrats'},
		'bureaucrat': {u:'Bureaucrat', order:1, link:'Project:Wiki_Staff#Bureaucrats'},
		'administrator': {u:'Administrator', order:1, link:'Project:Wiki_Staff#Administrators'},
		'dual-moderator': {u:'Dual Moderator', order:2, link:'Project:Wiki_Staff#Dual_Moderators'},
		'content-moderator': {u:'Content Moderator', order:2, link:'Project:Wiki_Staff#Content_Moderators'},
		'threadmoderator': {u:'Discussions Moderator', order:2, link:'Project:Wiki_Staff#Discussions_Moderators'},
		'ron-hos': {u:'RON Head of Staff', order:3, link:'Rise_of_Nations_Staff#Administrative'},
		'ron-senior-administrator': {u:'RON Senior Administrator', order:3, link:'Rise_of_Nations_Staff#Administrative'},
		// wiki contributor
		'wiki-contributor': {u:'Wiki Contributor', order:4, link:'Project:Wiki_Contributors'},
		// former wiki staff
		'former-bureau': {u:'Former Bureaucrat', order:5, link:'Project:Wiki_Staff#Former_Bureaucrats'},
		'former-admin': {u:'Former Administrator', order:6, link:'Project:Wiki_Staff#Former_Administrators'},
		'former-dual': {u:'Former Dual Moderator', order:7, link:'Project:Wiki_Staff#Former_Dual_Moderators'},		
		'former-cm': {u:'Former Content Moderator', order:7, link:'Project:Wiki_Staff#Former_Content_Moderators'},		
		'former-dm': {u:'Former Discussions Moderator', order:7, link:'Project:Wiki_Staff#Former_Discussions_Moderators'},			
	}
};

UserTagsJS.modules.implode = {
	// Merge sysop/mod ranks into a single tag
	'administrator': ['sysop'],
	'dual-moderator': ['content-moderator', 'threadmoderator'],
};

UserTagsJS.modules.metafilter = {
	// Hide redundant lower ranks when a higher rank is present
	'administrator':     ['bureaucrat'],
	'sysop':             ['bureaucrat', 'ron-hos'],
	'content-moderator': ['administrator', 'dual-moderator'],
	'threadmoderator':   ['administrator', 'dual-moderator'],
	'dual-moderator':    ['administrator'],
};

UserTagsJS.modules.custom = {
	/* 'user': [groups] */
	// Current Staff
	
	// Bureaucrats
	'SuperGlitchyTheo': ['head-of-wiki','bureaucrat'],
	'3meraldKv': ['founder'],
	// Administrators
    'Standoffiish': ['administrator','wiki-contributor'],
	'Dxrknrg': ['administrator','wiki-contributor'],
	'Antiverta': ['administrator','wiki-contributor'],
	
	// Dual Moderators

	// Content Moderators
	'Mysþıc': ['content-moderator','wiki-contributor'],
	'Sorayaann': ['content-moderator','wiki-contributor'],
	// Junior Content Moderators

	// Discussions Moderators
	'YugoMafia': ['threadmoderator'],
	'RXRunner27': ['threadmoderator'],
	// Junior Discussion Moderators

	// RON Senior Staff
	'FamicomBruv': ['ron-senior-administrator','retired-staff'],
	
	// Wiki Contributors
	'Cipherusxzy': ['wiki-contributor'],
	'HaHaBlah': ['wiki-contributor'],
	'RyeThePies': ['wiki-contributor'],
	'Thethingiforgor': ['wiki-contributor'],
	'Pro10boy2228': ['wiki-contributor'],
	'Blazarvortexd': ['wiki-contributor'],
	'Ameer.Jor': ['wiki-contributor'],
	'The Dimensional Doctor': ['wiki-contributor'],
	'Fish The 4th': ['wiki-contributor'],
	'IvoryCreamy': ['wiki-contributor'],
	
	// Retired Wiki Staff
	// Retired Bureaucrats
	'RabbyDevs': ['former-bureau'],
	'Aurawra': ['former-bureau'],
	'TheRichSeries': ['former-bureau'],
	'ZackRoN00': ['former-bureau'],
	'MP1Player': ['former-bureau'],
	'HolyMoa': ['former-bureau'],
	
	// Retired Administrators
	'GrayshaValor': ['former-admin'],
	'Man with no name or life': ['former-admin'],
	'RedElephantKing': ['former-admin'],
	'Arrokotth': ['former-admin'],
	'Vector Sigma': ['former-admin'],
	'Zidium': ['former-admin'],
	'OfficialKhrome': ['former-admin'],
	'DefoNotSyki': ['former-admin'],
	'LollipopWut': ['former-admin'],
	
	// Retired Dual Moderators
	'Awsomemysticcheese': ['former-dual'],
	'YesIHaveAnAccount': ['former-dual'],
	'Alvin': ['former-dual'],
	'Polloloko0o': ['former-dual'],
	
	// Retired Content Moderators
	'Bazyli123': ['former-cm'],
	'PenguinTech': ['former-cm'],
	'Eddy0725': ['former-cm'],
	'Nikograd': ['former-cm'],
	'Jjc0308': ['former-cm'],
	'Piteous': ['former-cm'],
	'CrusaderRosehip': ['former-cm'],
	'Pancake1824': ['former-cm'],
	'Imnotacan': ['former-cm'],
	'JHRacer': ['former-cm'],
	'NoobINFe': ['former-cm'],
	'S9 Closing Logo WikiReturnss': ['former-cm'],
	'TheSeal27': ['former-cm'],
	'Mylan389': ['former-cm'],
	'The Ukulele Man': ['former-cm'],
	'Alan Builder': ['former-cm'],
	'Kaisergluck': ['former-cm'],
	'Therealusman': ['former-cm'],
	'DragooNit': ['former-cm'],
	'Silkened': ['former-cm'],
	
	// Retired Discussions Moderators
	'CreeperSPG': ['former-dm'],
	'CrunchMCMunch': ['former-dm'],
	'Feepemaster': ['former-dm'],
	'Adogeeats25': ['former-dm'],
	'Nexandr': ['former-dm'],
	'Hisslandia': ['former-dm'],
	'The Shashophille': ['former-dm'],
	'Kaiyie': ['former-dm'],
};

//* LockOldComments.js Configuration *//
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

//* Page Purge *//
mw.loader.using('mediawiki.api').then(function () {
    var busy = false;
    $(document).on('click', '.purge-button', function (e) {
        e.preventDefault();
        if (busy) return;
        busy = true;
        var $btn = $(this);
        $btn.text('Refreshing…');
        new mw.Api().post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        }).then(function () {
            location.reload();
        }, function () {
            $btn.text('Refresh failed, try again');
            setTimeout(function () { busy = false; }, 5000);
        });
    });
});

// Load External .js
importArticle({
	type: "script",
    articles: [
        'MediaWiki:ModifierCalculator.js',
        'MediaWiki:Pseudo3d.js',
	]
});