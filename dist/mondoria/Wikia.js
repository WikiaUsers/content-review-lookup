window.UserTagsJS = {
	modules: {},
	tags: {
                code: {u:'codeministrator', title:'' },
                admin: {u:'administrator', title:'' },
                derp:  {u:'derpministrator', title:'' }

	}
};
 
UserTagsJS.modules.custom = {
	'Sabovia': ['admin'], ['code'], 
        'User:Deutschlandkaiser': ['derp'],
};

var messageWallUserTags = {
    'User:Deutschlandkaiser': 'administrator',
    'Sabovia': 'founder of our great society.'
};
window.messageWallTagColor = '#003366';
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MessageWallUserTags/code.js'
    ]
});

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});