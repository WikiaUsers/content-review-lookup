/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
	    'mega-admin': { u:'A Little Bit of Everything'},
	},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'})

UserTagsJS.modules.implode = {
    'mega-admin': ['admin', 'bureaucrat', 'rollback']
};