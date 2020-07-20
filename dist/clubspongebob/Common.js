/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		monthuser: { u:'User of the Month', order:-1/0 },
		announcer: { u:'Announcer', order:-1/0 },
		retired: { u:'Retired', order:-1/0 },
		wikibreak: { u:'On Wikibreak', order:-1/0 },
		}
};
UserTagsJS.modules.custom = {
	'Bots22': ['retired'],

};
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'JoJoMKWUTeam': 'Manager • Founder',
        'TheSuperAlmightyDragon': 'Employee',
        'BaldiBasicsFan': 'Employee',
        'SpongeBobDubs2096': 'Employee',
        'Morgan Gam': 'Employee',
        'CoolFriend3976': 'Employee',
        'CallMeBlonde929': 'Employee',
        'IloGaming4': 'Employee',
        'AK World': 'Employee',
        'WoofWoofGam3r': 'Junior Employee',
        'Cocopuff2018': 'Assistant • Junior Employee',
        'South Ferry': 'Krusty Krab Guard',
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatErrorExplanation.js',
    ]
});