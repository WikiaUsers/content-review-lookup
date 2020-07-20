/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});
window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { founder:1, bureaucrat:0, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: { 'Lilliyan': ['GameSamba Staff'], 'Wizkiller96': ['Nekkid Wiz', 'Web Developer', 'Rainbow Saga Wiki Founder'] },
	names: {} // Badge display names
}
importScriptPage('ListAdmins/code.js', 'dev');
window.MessageWallUserTags = {
    tagColor: 'yellow',
    glow: true,
    glowSize: '15px',
    glowColor: '#F4FA58',
    users: {
        'Mysticalia': 'Founder • Inactive',
        'Lilliyan': 'Bureaucrat • GameSamba Staff',
        'Wizkiller96': 'Admin • Nekkid Wiz',
        'GeminiRK': 'Admin • Inactive',
        'Cyanea': 'Rollback • Inactive'
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
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

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

importArticles({
    type: "script",
    articles: [
        "u:dev:MarkForDeletion/code.js"
    ]
});

importScriptPage("PageMakerPro/code.js", "dev");

importScriptPage( 'PACE/pace.js', 'dev' );