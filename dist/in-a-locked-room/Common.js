/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		featured: { u:'Featured', order:-1/0 },
		retired: { u:'Retired' },
		cirno: { u:'Fairy of the Freezer', order:1/0 }
	}
};

UserTagsJS.modules.custom = {
	'BoltBlizard': ['cirno'],
};

// Namespace for notiplus
window.notiplus = window.notiplus || {};
// Settings for notiplus
notiplus.url = '/wiki/Project:Notiplus?action=render';
notiplus.cookiePrefix = 'notiplus';
notiplus.consentRequired = true;
notiplus.reverseOrder = false;
notiplus.lang = 'en';
window.MassCategorizationGroups = ['sysop', 'content-moderator'];