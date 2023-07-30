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
		'fandom-star': {u: 'Fandom Star', link: 'w:Help:Fandom Stars', order: 12},		
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

/* Pride toolbar advertisement
var toolbarLabel = 'Pride';
var toolbarLinks = [
	{link: 'https://bit.ly/FandomDragRaceTournament', label: 'June 29: Drag Race Bracket Tournament'},
    {link: 'https://bit.ly/PrideEditorStory-Kurt', label: 'June 28: Pride Highlight: Meet Kurt'},
    {link: 'https://bit.ly/PrideEditorStory-Vinny', label: 'June 27: Pride Highlight: Meet Vinny'},
    {link: 'https://bit.ly/PrideEditorStory-Sam', label: 'June 23: Pride Highlight: Meet Sam/Lemon Skweezy'},
    {link: 'https://bit.ly/PrideEditorStory-Allyship', label: 'June 20: How to Strengthen LGBTQIA+ Allyship'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'June 15: Pride Stories: Celebrate with Bart'},
    {link: 'https://hellskitchen.fandom.com/f/p/4400000000000070350', label: 'June 10: Discussions post'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'June 6: Pride blog with Drag Queens interview'},
    {link: 'https://bit.ly/FandomPridePlaylist', label: 'June 1: Pride spotify playlist'}
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">Pride Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* Disability Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Disability Pride Month')
        )
        .attr('href', 'https://bit.ly/DisabilityPrideMonth-Chris')
);