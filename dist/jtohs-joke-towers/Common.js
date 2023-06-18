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
		nothing: {u: '⠀⠀⠀', order: -1e100},
		bureaureal: {u: 'BUREAUCRAT (REAL)', order: -1e110}
	}
};
UserTagsJS.modules.custom = {
	'YataDev': ['owner', 'cool'],
	'Sanjay2133': ['creator', 'cool'],
	'AlsoOmori': ['former'],
	'IdklolXDXDXD': ['former'],
	'TheOquas': ['former'],
	'Bruhshard1': ['former', 'montheditor'],
	'YourNuglyguy': ['formerowner', 'god'],
	'Ferdinandloveslegos': ['formerowner'],
	'The Difficulty Enthusiast': ['formerowner'],
	'OrbentuneAlt': ['nothing'],
	'Bryanjr7747': ['montheditor'],
	'Jtohisgoodimo': ['bureaureal']
};
window.quizName = "The Hard Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "You suck so much, that's REALLY sad.",
    "mid",
    "You're clearly the biggest Babassian fan ever" 
];
window.questions = [
    ["sin 120°",
    "√3/2",
    "√2/2",
    "1/2",
    "-√2/2",
    "-√3/2",
    "-1/2"],

    ["sin 30°",
    "1/2",
    "√2/2",
    "√3/2",
    "-√2/2",
    "-√3/2",
    "-1/2"],

    ["sin 45°",
    "√2/2",
    "√3/2",
    "1/2",
    "-√2/2",
    "-√3/2",
    "-1/2"],
];
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;