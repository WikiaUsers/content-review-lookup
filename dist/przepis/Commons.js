// Konfiguracja UserTags
window.UserTagsJS = {
	tags: {
	},
	modules: {
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:dev:UserTags/code.js"				// UserTag
   ]
});