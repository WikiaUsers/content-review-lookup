/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month', order: -1/0},
		cool: { u:'Coolest Cools', order: -1e101},
		former: {u:'Former Staff', order: -1e50},
		formerowner: {u:'Former Owner', order: -1e100}
	}
};
UserTagsJS.modules.custom = {
	'Sanjay2133': ['cool', 'montheditor'],
	'AlsoOmori': ['former'],
	'IdklolXDXDXD': ['former'],
	'TheOquas': ['former'],
	'Bruhshard1': ['former'],
	'YourNuglyGuy': ['formerowner'],
	'Ferdinandloveslegos': ['formerowner'],
	'The Difficulty Enthusiast': ['formerowner'],
	'OrbentuneAlt': ['montheditor']
};
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;