/* Any JavaScript here will be loaded for all users on every page load. */

/***************************/
/***** Script Imports ******/
/***************************/

// See [[MediaWiki:ImportJS]].

/***************************/
/** Import Configuration ***/
/***************************/

/* StandardEditSummary */
window.dev = window.dev || {};
window.dev.editSummaries = {
	css: false,
	select: [
		'(browse edit summaries)',
		'1. General editing', [
			'Updated information',
			'Corrected spelling/grammar',
			'Reorganised content',
			'Added media'
		],
		'2. Radical editing', [
			'Removed content',
			'Revised article',
			'Reverted to older version'
		],
		'3. Maintenance', [
			'Updated category',
			'Included notice template',
			'Removed/fixed link(s)',
			'Removed/replaced file(s)',
			'Removed/corrected template(s)'
		]
	]
};

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		moderator: {u:'Moderator'},
		newuser: {u:'Non-Editor'},
		sysop: {u:'Administrator'}
	}
};
UserTagsJS.modules.implode = {'moderator': ['content-moderator', 'threadmoderator']};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {'sysop': ['bureaucrat']};
UserTagsJS.modules.newuser = {
	edits: 10,
	namespace: 0
};

/***************************/
/* Interface Modification **/
/***************************/