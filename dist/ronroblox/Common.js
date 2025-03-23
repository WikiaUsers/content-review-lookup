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
	'RabbyDevs': ['head-of-wiki','content-moderator'],
	'3meraldKv': ['founder'],
	// Retired Wiki Staff
	'imnotacan': ['retired-staff'],
	// RON Senior Staff (3 senior admins missing, they don't have fandom accounts)
	'GrayshaValor': ['ron-senior-administrator'],
	'Yxrae': ['ron-senior-administrator'],
	// Wiki Contributors
	'Dxrknrg': ['Wiki-Contributor'],
	'PanzerundLancer': ['Wiki-Contributor'],
	'Sdvwevfregv': ['Wiki-Contributor'],
	'Eddy0725': ['Wiki-Contributor'],
	'SuperGlitchyTheo': ['Wiki-Contributor'],
	'Quinncm': ['Wiki-Contributor'],
	'Spaniard123': ['Wiki-Contributor'],
	'Zarc.0724': ['Wiki-Contributor'],
	'Mysþıc': ['Wiki-Contributor'],
	'Antiverta': ['Wiki-Contributor'],
	'StrikerFRFX': ['Wiki-Contributor'],
	// Guide Makers 
	'CookieDogAJ': ['Guide-Maker'],
	'PorlaiWasTaken': ['Guide-Maker'],
	'Piteous': ['Guide-Maker'],
};
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;
//* END of UserTags *//