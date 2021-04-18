// Configuration for the script that replaces the removed welcome bot
window.AutoCreateUserPagesConfig = {
	content: {
		2: '{{sub'+'st:MediaWiki:Welcome-user-page}}',
		3: false
	},
	summary: 'Script: Automatically creating user profile'
};


window.dplforumBoards = [
	{
		boardName: 'news-announcements',
		boardDescription: 'Announcements, newsletters, and more from the moderator team.',
	},
	{
		boardName: 'general-discussion',
		boardDescription: 'Got a question about the fanon tribes? Need help navigating the wiki? Want to share something exciting? This is the spot!',
	},
	{
		boardName: 'promotions-demotions',
		boardDescription: 'Looking to get someone promoted or demoted? This is where it all happens. Look at Help:Promotion and Help:Demotion for details.',
	},
];

// Only import these scripts for content mods and admins so we don't waste the
// bandwith of users who can't actually use them.
if (
	mw.config.get('wgUserGroups').includes('content-moderator') ||
	mw.config.get('wgUserGroups').includes('sysop')
) {
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:PowerDelete.js',
			'u:dev:MediaWiki:MassEdit/code.js',
			'u:dev:MediaWiki:MassCategorization/code.js',
		],
	});
}