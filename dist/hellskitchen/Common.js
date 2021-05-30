/* Any JavaScript here will be loaded for all users on every page load. */
/* User profile header custom tags */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{Remove this to start creating your userpage}}',
        3: false
    },
    summary: 'Script: Creating userpage on first edit'
};

mw.loader.using('mediawiki.api').then(function(){
	if (document.querySelector(".community-page-rail")) {
		const api = new mw.Api();
		api.get({
			action:'parse',
			page:'Template:CommunityRail',
		}).done( function ( data ) {
			mw.hook('wikipage.content').fire($(".community-page-rail").prepend(data.parse.text['*']));
		});
	}
});
window.MastheadRightsBadgeSettings = {
    iconSize: '40px',
};
window.UserTagsJS = {
	tags: {
		bureaucrat: { u:'Executive Chef', link:'Project:Wiki_Staff' },
		sysop: { u:'Head Chef', link:'Project:Wiki_Staff' },
		'content-moderator': { u:'Sous Chef', link:'Project:Wiki_Staff' },
		threadmoderator: { u:'Sous Chef', link:'Project:Wiki_Staff' },
		bot: { u: 'Bot', link: 'Special:ListUsers/bot' },
		inactive: { u: 'Inactive' },
		blocked: { u: 'Ejected', link: 'Special:BlockList' },
		'wiki-manager': { u: 'Wiki Manager', link: 'w:Help:Wiki_Managers' },
		soap: { u: 'SOAP', link: 'w:Help:SOAP' },
		council: {u: 'Council', link: 'w:Help:Community Council'},
		redditmod: {u: 'Reddit Moderator' },
		discordmod: {u: 'Discord Moderator' }
    },
	modules: {
        inactive: 60,
        mwGroups: true,
        autoconfirmed: true,
        custom: {
            'CollinKulesha': ['redditmod'],
            'Octranspo9307': ['redditmod'],
            'Anythingworx47': ['redditmod'],
            'UltimateKing98': ['discordmod'],
            'Marke34': ['discordmod']
        },
        metafilter: {
        	sysop: ['bureaucrat','bot'],
			threadmoderator: ["content-moderator"],
			}
        }
};