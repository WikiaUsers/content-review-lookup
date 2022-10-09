/******************** Any JavaScript here will be loaded for all users on every page load. *********************/

/******************** Tooltips *********************/
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
/******************** UserTags *********************/
/* Dissabling override */
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/** Custom UserTags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		coder: { u: 'Coder', order: 110 },
		designer: { u: 'Designer', order: 111},
	}
};
/** Users **/
UserTagsJS.modules.custom = { // NOTE: order of list here does NOT matter //
	'JoasJSD' : ['coder', 'designer'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];