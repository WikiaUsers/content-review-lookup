/* For CSS modules and Template: CSS */
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

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
		wikimanager: {u:'Wiki Manager', order: -1/0},
		forummanager: {u:'Forums Manager', order: -1/0},
		creator: {u:'The CSS Guy', order: -1e76},
		montheditor: { u:'Editor of the Month', order: -1e75},
		cool: { u:'Certified Cool Kid', order: -1e70},
		former: {u:'Former Staff', order: -1e50},
		formerowner: {u:'Former Owner', order: -1e69},
		god: {u:'God of the Wiki', order: -1e100},
		nothing: {u: '⠀⠀⠀', order: -1e100},
		bureaureal: {u: 'BUREAUREAL', order: -1e110},
	}
};
UserTagsJS.modules.custom = {
	'YataDev': ['cool', 'formerowner'],
	'Sanjay2133': ['wikimanager', 'creator', 'cool'],
	'Oh Noez! Oh Noez!': ['forumsmanager'],
	'SodafizzIGuess': ['former'],
	'IdklolXDXDXD': ['former'],
	'TheOquas': ['former'],
	'Bruhshard1': ['former'],
	'YourNuglyguy': ['formerowner', 'god'],
	'Ferdinandloveslegos': ['formerowner'],
	'The Difficulty Enthusiast': ['formerowner'],
	'OrbentuneAlt': ['nothing'],
	'Jtohisgoodimo': ['bureaureal'],
	'Touchgrass210779': ['montheditor'],
	'MapleIsNotAMapleLeaf': ['montheditor']
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
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'TemplateUserPage}}',
        3: false,
        1202: false
    },
    summary: 'Creating user page',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};