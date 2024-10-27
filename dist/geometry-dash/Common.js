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

/* Template:USERNAME Substitution */
$(function () { 
mw.config.get('wgUserName');
if (mw.config.get('wgUserName') !== null) $('span.username-insert').text(mw.config.get('wgUserName'));
});

/* CSS classes for daytime periods */
$(function() {
    'use strict';
var currentTime = new Date().getHours();
if (0 <= currentTime && currentTime < 6) {
    if (document.body) {
        document.body.classList.add('night');
    }
}
else if (6 <= currentTime && currentTime < 12) {
    if (document.body) {
        document.body.classList.add('morning');
    }
}
else if (12 <= currentTime && currentTime < 18) {
    if (document.body) {
        document.body.classList.add('afternoon');
    }
}
else {
    if (document.body) {
        document.body.classList.add('evening');
    }
}
});

/* Class addition for VisualEditor Source Mode edit preview */
document.querySelector('.fandom-preview-panel').classList.add('page');