/* Any JavaScript here will be loaded for all users on every page load. */

/* UserTags settings and import */
window.UserTagsJS = {
	modules: {},
	tags: {
        codemaster: { u: 'Code Master' },
        bot: { u: 'Bot' }
	},
};
UserTagsJS.modules.custom = {
	'Sophiedp': ['codemaster'],
	'Dorumin': ['codemaster'],
	'PolarbearBot': ['bot'],
	'OpalBot': ['bot'],
	'PearlescentBot': ['bot']
};
UserTagsJS.modules.mwGroups = [
    'rollback',
    'bot'
];
importScriptPage('MediaWiki:UserTags/code.js', 'dev');