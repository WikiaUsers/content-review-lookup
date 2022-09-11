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
window.UserTagsJS = {
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Project:Bureaucrats', order: 6 },
		sysop: { u:'Administrator', link:'Project:Administrators', order: 7 },
		'content-moderator': { u:'Content Moderator', link:'Project:Moderators', order: 8 },
		rollback: {u: 'Trial Moderator', order: 8},
		threadmoderator: { u:'Discussion Moderator', link:'Project:Moderators', order: 9 },
		bot: { u: 'Bot', link: 'Special:ListUsers/bot' },
		inactive: { u: 'Inactive' },
		blocked: { u: 'Ejected', link: 'Special:BlockList' },
		'wiki-representative': { u: 'Wiki Representative', link: 'w:Help:Wiki_Managers', order: 1 },
		'wiki-specialist': { u: 'Wiki Specialists', link: 'w:Help:Wiki_Specialists', order: 2 },
		soap: { u: 'SOAP', link: 'w:Help:SOAP', order: 3 },
		vanguard: {u: 'Vanguard', link: 'w:Help:Vanguard', order: 4},
		'global-discussions-moderator': {w: 'Global Discussions Moderator', link:'w:Help:Global Discussions moderators', order: 5},
		council: {u: 'Council', link: 'w:Help:Community Council', order: 12},
		redditmod: {u: 'Reddit Moderator', link: 'Project:Wiki_Staff', order: 10 },
		discordmod: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 11 },
		discordmod1: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 11 },
		discordmod2: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 11 },
		discordmod3: {u: 'Discord Moderator', link: 'Project:Wiki_Staff', order: 11 },
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
		}
    }
};
//TZclock config
window.TZclockSimpleFormat = true;