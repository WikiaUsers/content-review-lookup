/* define custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {}
};

/* assign custom tags to users */
UserTagsJS.modules.custom = {
	'Wooolz': ['custom'],
};

/* disable autoconfirmed tag */
UserTagsJS.modules.autoconfirmed = false;

/* define # of days for inactive tag */
UserTagsJS.modules.inactive = 300;

/* specify MediaWiki group tags to be enabled */
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'rollback',
    'bannedfromchat'
];