// --- Start of UserTags Configuration ---

window.UserTagsJS = {
    modules: {},
    tags: {
       // empty
    }
};

// This automatically finds all official Fandom ranks (Admin, Bureaucrat, Content Moderator, etc.)
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback'];

UserTagsJS.modules.custom = {
    // empty
};

// --- End of UserTags Configuration ---

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:MastheadRightsBadge.js'
	]
});