/** START Import Articles Row **/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:CollapsibleInfobox/code.js',
        'w:c:dev:ReferencePopups/code.configure.js',
        'w:c:dev:ReferencePopups/custom.js',
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:DisplayClock/code.js',
        'u:dev:HeaderLinks/code.js',
        'w:dev:WallGreetingButton/code.js',
        'w:c:dev:UserTags/code.js'
    ]
});
/** END Articles Row **/
/** START User Tags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		dragonsysop: 'Dragonic Admin',
		templates: 'Templates Master',
                tree: 'Lord of Trees',
                pos: 'Prince of Shadows',
                theban: 'The Ban Hammer',
                observe: 'The Observer'
	}
};
UserTagsJS.modules.custom = {
	'Seadrus': ['dragonsysop', 'templates'],
        'Lord Dalek': ['dragonsysop', 'tree', 'theban'],
        'Dr0Shadow': ['pos'],
        'THEObserver': ['observe']
};
/** END User Tags **/