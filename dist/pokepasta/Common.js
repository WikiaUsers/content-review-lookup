window.UserBadgesJS = {
	groups: { bureaucrat:1, rollback:1 },
}
 
importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});


importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'wiki coder', order:1 },
	},
};
UserTagsJS.modules.custom = {

};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});