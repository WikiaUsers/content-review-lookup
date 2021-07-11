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
		bureaucrat: { u:'Bureaucrat', link:'Project:Wiki_Staff', order: 3 },
		sysop: { u:'Administrator', link:'Project:Wiki_Staff', order: 4 },
		'content-moderator': { u:'Content Moderator', link:'Project:Wiki_Staff', order: 5 },
		threadmoderator: { u:'Discussion Moderator', link:'Project:Wiki_Staff', order: 6 },
		bot: { u: 'Bot', link: 'Special:ListUsers/bot' },
		inactive: { u: 'Inactive' },
		blocked: { u: 'Ejected', link: 'Special:BlockList' },
		'wiki-manager': { u: 'Wiki Manager', link: 'w:Help:Wiki_Managers', order: 1 },
		soap: { u: 'SOAP', link: 'w:Help:SOAP', order: 2 },
		council: {u: 'Council', link: 'w:Help:Community Council', order: 9},
		redditmod: {u: 'Reddit Moderator', link: 'Project:Wiki_Staff', order: 7 },
		discordmod: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 8 },
		discordmod1: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 8 },
		discordmod2: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 8 },
		discordmod3: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 8 },
		staff: {u: 'Staff', link: 'w:Project:Staff', order: 0}
    },
	modules: {
        inactive: 60,
        mwGroups: true,
        autoconfirmed: true,
        custom: {
            'CollinKulesha': ['redditmod'],
            'Octranspo9307': ['redditmod'],
            'Anythingworx47': ['redditmod'],
            'Zacatero': ['redditmod'],
            'UltimateKing98': ['discordmod'],
            'Marke34': ['discordmod']
        },
        metafilter: {
        	sysop: ['bot'],
        	'discordmod': ['bot'],
        	'discordmod3': ['sysop','threadmoderator','content-moderator'],
        	'discordmod2': ['threadmoderator'],
        	'inactive': ['bureaucrat','sysop','threadmoderator','content-moderator','discordmod','redditmod','SOAP','wiki-manager','staff','bot']
		},
		explode: {
			'discordmod': ['sysop'],
			'discordmod1': ['threadmoderator'],
			'discordmod2': ['content-moderator'],
			'discordmod3': ['redditmod']
		}
    }
};
//TZclock config
window.TZclockSimpleFormat = true;