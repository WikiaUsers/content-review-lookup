	/* Any JavaScript here will be loaded for all users on every page load. */
// Template:Tabs
$(function() {
	// If a sub-tab is 'selected', also make the parent tabs also 'selected'
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabs
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

//* UserTags *//
window.UserTagsJS = {
	modules: {},
	tags: {
		/* group: { associated tag data } */
		// staff ranks, renaming of some ranks too
		'head-of-wiki': {u:'Head of Wiki', order:-1},
		'founder': {u:'Founder', order:-1},
		'senior-content-administrator': {u:'Senior Content Administrator', order:1},
		'content-administrator': {u:'Content Administrator', order:1},
		'senior-discussions-administrator': {u:'Senior Discussions Administrator', order:1},
		'discussions-administrator': {u:'Discussions Administrator', order:1},
		'bureaucrat': {u:'Senior Administrator', order:1},
		'threadmoderator': {u:'Discussions Moderator', order:2},
		'content-moderator': {u:'Content Moderator', order:2},
		'wiki-developer': {u:'Wiki Developer', order:3},
		// non-staff tags
		'Wiki-Contributor': {u:'Wiki Contributor', order:9e9},
		'retired-staff': {u:'Former Wiki Staff', order:9e9},
		'ron-hos': {u:'RON Head of Staff', order:9e9},
		'ron-senior-administrator': {u:'RON Senior Administrator', order:9e9},
		'Guide-Maker': {u:'Guide Maker', order:9e9}
	}
};

UserTagsJS.modules.implode = {
	// merge sysop (or bureaucrat) and mod ranks
	'content-administrator': ['sysop','content-moderator'],
	'senior-content-administrator': ['bureaucrat','content-moderator'],
	'discussions-administrator': ['sysop', 'threadmoderator'],
	'senior-discussions-administrator': ['bureaucrat','threadmoderator'],
};

UserTagsJS.modules.metafilter = {
	// remove admin ranks from bureaucrats
	'discussions-administrator': ['bureaucrat'],
	'content-administrator': ['bureaucrat'],
	'sysop': ['bureaucrat', 'ron-hos'],
	// remove content mod, just a permissions role for wiki developer
	'content-moderator': ['wiki-developer']
};

UserTagsJS.modules.custom = {
	/* 'user': [groups] */
	// Current Staff: Edited.
	// Bureaucrats
	'HolyMoa': ['head-of-wiki','bureaucrat'],
	'3meraldKv': ['founder'],
	// Administrators
	'Antiverta': ['content-administrator','discussions-administrator','Wiki-Contributor'],
	'SuperGlitchyTheo': ['content-administrator','Wiki-Contributor'],
	// Moderators
	// Content Moderators
	'RyeThePies': ['content-moderator','Wiki-Contributor'],
	'Dxrknrg': ['content-moderator','Wiki-Contributor'],
	'Quinncm': ['content-moderator','Wiki-Contributor'],
	'Zarc.0724': ['content-moderator','Wiki-Contributor'],
	'Mysþıc': ['content-moderator','Wiki-Contributor'],
	// Discussions Moderators
	'YugoMafia': ['threadmoderator'],
	'Noidtouse': ['threadmoderator'],
	'Kaiyie': ['threadmoderator'],
	'The Shashophille': ['threadmoderator'],
	// Retired Wiki Staff 
	// Retired Bureaucrats
	'Standoffiish': ['retired-staff'],
	'RabbyDevs': ['retired-staff'],
	'Aurawra': ['retired-staff'],
	'TheRichSeries': ['retired-staff'],
	'ZackRoN00': ['retired-staff'],
	'MP1Player': ['retired-staff'],
	// Retired Administrators
	'GrayshaValor': ['retired-staff'],
	'Man with no name or life': ['retired-staff'],
	'RedElephantKing': ['retired-staff'],
	'Arrokotth': ['retired-staff'],
	'Vector Sigma': ['retired-staff'],
	'Zidium': ['retired-staff'],
	'OfficialKhrome': ['retired-staff'],
	'DefoNotSyki': ['retired-staff'],
	'LollipopWut': ['retired-staff'],
	'HaHaBlah': ['retired-staff'],
	// Retired Dual Moderators
	'Awsomemysticcheese': ['retired-staff'],
	'YesIHaveAnAccount': ['retired-staff'],
	'Alvin': ['retired-staff'],
	'Polloloko0o': ['retired-staff'],
	// Retired Content Moderator
	'Bazyli123': ['retired-staff'],
	'PenguinTech': ['retired-staff'],
	'Eddy0725': ['retired-staff'],
	'Nikograd': ['retired-staff'],
	'Jjc0308': ['retired-staff'],
	'Piteous': ['retired-staff'],
	'CrusaderRosehip': ['retired-staff'],
	'Pancake1824': ['retired-staff'],
	'imnotacan': ['retired-staff'],
	'JHRacer': ['retired-staff'],
	'NoobINFe': ['retired-staff'],
	'S9 Closing Logo WikiReturnss': ['retired-staff'],
	'TheSeal27': ['retired-staff'],
	'Mylan389': ['retired-staff'],
	'The Ukulele Man': ['retired-staff'],
	'Alan Builder': ['retired-staff'],
	'Kaisergluck': ['retired-staff'],
	// Retired Discussions Moderator
	'CreeperSPG': ['retired-staff'],
	'CrunchMCMunch': ['retired-staff'],
	'Feepemaster': ['retired-staff'],
	'Adogeeats25': ['retired-staff'],
	'Nexandr': ['retired-staff'],
	'Hisslandia': ['retired-staff'],
	// RON Senior Staff (3 senior admins missing, they don't have fandom accounts)
	'FamicomBruv': ['ron-senior-administrator','retired-staff'],
	// Wiki Contributors
	'Sorayaann': ['Wiki-Contributor'],
    'Silkened': ['Wiki-Contributor'],
    'Cipherusxzy': ['Wiki-Contributor'],
    'Therealusman': ['Wiki-Contributor'],
    'DragooNit': ['Wiki-Contributor'],
    'HaHaBlah': ['Wiki-Contributor'],
	// Guide Makers 
	'CookieDogAJ': ['Guide-Maker'],
	'Slabx3': ['Guide-Maker'],
	'BungoJungo': ['Guide-Maker'],
};
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;
//* END of UserTags *//