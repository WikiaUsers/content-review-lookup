/* Any JavaScript here will be loaded for all users on every page load. */
window.DiscussionTemplates = {
    templates: {
        'item-1': {
            name: 'Template:Staff',
            title: 'Staff'
        }
    },
    allowedGroups: ['bureaucrat','sysop', 'content-moderator', 'threadmoderator', 'rollback']
};
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		owner: {u:'Owner', order: -1/0},
		creator: {u:'The CSS Guy', order: -1e501},
		montheditor: { u:'Editor of the Month', order: -1e500},
		cool: { u:'Coolest Cools', order: -1e101},
		former: {u:'Former Staff', order: -1e50},
		formerowner: {u:'Former Owner', order: -1e100}
	}
};
UserTagsJS.modules.custom = {
	'YataDev': ['owner'],
	'Sanjay2133': ['creator', 'cool'],
	'AlsoOmori': ['former'],
	'IdklolXDXDXD': ['former'],
	'TheOquas': ['former'],
	'Bruhshard1': ['former'],
	'YourNuglyGuy': ['formerowner'],
	'Ferdinandloveslegos': ['formerowner'],
	'The Difficulty Enthusiast': ['formerowner', 'montheditor'],
};
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;
// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
    // wds is a shortcut to window.dev.wds
});

importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });