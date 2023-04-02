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
		creator: {u:'The CSS Guy', order: -1e76},
		montheditor: { u:'Editor of the Month', order: -1e75},
		cool: { u:'Certified Cool Kid', order: -1e70},
		former: {u:'Former Staff', order: -1e50},
		formerowner: {u:'Former Owner', order: -1e69},
		god: {u:'God of the Wiki', order: -1e100},
		nothing: {u: '⠀⠀⠀', order: -1e100}
	}
};
UserTagsJS.modules.custom = {
	'YataDev': ['owner', 'cool'],
	'Sanjay2133': ['creator', 'cool', 'montheditor'],
	'AlsoOmori': ['former'],
	'IdklolXDXDXD': ['former'],
	'TheOquas': ['former'],
	'Bruhshard1': ['former'],
	'YourNuglyguy': ['formerowner', 'god'],
	'Ferdinandloveslegos': ['formerowner', 'montheditor'],
	'The Difficulty Enthusiast': ['formerowner'],
	'OrbentuneAlt': ['nothing']
};
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;