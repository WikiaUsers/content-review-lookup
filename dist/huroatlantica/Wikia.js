window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: {u:'Editor of the Month'},
		featured: 'Featured',
		templates: 'Templates Guru',
                founder2: {u:'Co-Founder', title:'Founder of the Wiki, forever to be remembered.', link: '#' },
                engin: {u:'Engineer', title:'This user experiments with JS and CSS  of this Wiki and/or his own pages', link: '#' },
                inactivebureaucrat: {u:'Inactive Bureaucrat' },
                inactivesysop: {u:'Inactive Sysop' },
                hawstaff: {u:'Staff', title:'This user is part of the HuroAtlanticaWiki staff!', order:-1/0  },
                bot: {u:'Bot', title: 'Bot account with no special editing privileges.' },
                amazing: {u:'Chief', title:'This user is amazing, because he helped around the Wiki and participated in several projects!'},
                veteran: {u:'Veteran', title:'This user was decided to be a part of the veteran user group.'},
	}
};

UserTagsJS.modules.implode = {
	'inactivebureaucrat': ['bureaucrat', 'inactive'],
	'inactivesysop': ['sysop', 'inactive'],
};

UserTagsJS.modules.custom = {
	'Huro-Atlantica Gov': ['founder2'],
	'OrangeHills': ['founder2'],
        'Eastest566': ['amazing'],
};

var messageWallUserTags = {
    'Huro-Atlantica Gov': 'Co-Founder',
    'OrangeHills': 'Co-Founder',
    'Eastest566': 'Chief',
};

window.messageWallTagColor = 'red';
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
        'u:dev:SearchSuggest/code.js',
	'u:dev:DisplayClock/code.js',
	'MediaWiki:Logo.js'
    ]
});