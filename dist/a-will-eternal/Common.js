/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    extensions: {},
	modules: {},
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 60; // Inactive if no edits in 60 days

UserTagsJS.extensions.Over100Edits = {
	start: function(config, username) {
		var promise = $.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				action: 'parse',
				format: 'json',
				text: '{{Special:Editcount/' + username + '/0}}',
				prop: 'text',
				disablepp: 1
			},
			dataType: 'json'
		}).then(function(json) {
			var num = $(json.parse.text['*']).text().replace(/[^\d]/g, '');
			if (num && +num > 100) {
				return ['edit100'];
			}
			return null;
		});
		return {
			tags: {
				edit100: { u: '100+ Article Edits!' }
			},
			promise: promise
		};
	}
};
window.UserTagsJS.modules.Over100Edits = true;

UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'edit100': ['sysop', 'bureaucrat'], // Remove 100 Edits tag from all bureaucrats and sysops
};

window.MessageWallUserTags = {
    tagColor: 'white',
    txtSize: '10px',
    glow: true,
    glowSize: '5px',
    glowColor: '#FFD700',
    users: {
        'Schwarzsäule': 'Transcendor • Patriarch',
        'LordRimus': 'Transcendor • Patriarch'
    }
};

/* Reference Popups */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});