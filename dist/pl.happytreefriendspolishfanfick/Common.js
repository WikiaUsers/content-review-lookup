window.UserTagsJS = {
	tags: {
		sysop:	{u:'Dowódca'}
	},
	modules: {
		autoconfirmed: false,
		newuser: false,
		nonuser: false
	}
};
 
importArticles({
    type: "script",
    articles: [
	"w:c:dev:UserTags/code.js"
   ]
});