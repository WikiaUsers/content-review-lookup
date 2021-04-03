window.railWAM = {
    logPage:"Project:WAM Log"
}
window.ItemsToAdd = [
  {
    'Name': 'General Improvement',
    'Page': 'Category:General_Improvement',
    'Description': 'These articles need some cleanup work done on them.'
  },
  {
    'Name': 'Grammatical Cleanup',
    'Page': 'Category:Grammar_Cleanup',
    'Description': 'These articles need to be checked for grammar mistakes.'
  },
];
window.AffectsSidebar = true;

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		Owner: { u:'Owner', order:-1/0 },
		featured: 'Featured',
		templates: 'Templates Owner'
	}
};
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});