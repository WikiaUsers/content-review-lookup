/* Any JavaScript here will be loaded for all users on every page load. */
/* Pride toolbar button */
var toolbarLabel = 'Pride';
var toolbarLinks = [
	{link: 'https://bit.ly/FandomDragRaceTournament', label: 'June 29: Drag Race Bracket Tournament'},
    {link: 'https://bit.ly/PrideEditorStory-Kurt', label: 'June 28: Pride Highlight: Meet Kurt'},
    {link: 'https://bit.ly/PrideEditorStory-Vinny', label: 'June 27: Pride Highlight: Meet Vinny'},
    {link: 'https://bit.ly/PrideEditorStory-Sam', label: 'June 23: Pride Highlight: Meet Sam/Lemon Skweezy'},
    {link: 'https://bit.ly/PrideEditorStory-Allyship', label: 'June 20: How to Strengthen LGBTQIA+ Allyship'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'June 15: Pride Stories: Celebrate with Bart'},
    {link: 'https://rupaulsdragrace.fandom.com/f/p/4400000000000174113', label: 'June 12: Discussions post'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'June 6: Pride blog with Drag Queens interview'},
    {link: 'https://www.instagram.com/p/Cs9dBw4qLbI/?igshid=MzRlODBiNWFlZA%3D%3D', label: 'June 1: Instagram highlight'},
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

/* Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Pride Month')
        )
        .attr('href', 'https://bit.ly/FandomPrideBlog-header')
);

/* Auto Refresh */
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* User Tags*/
window.UserTagsJS = {
	modules: {
        autoconfirmed: true,
        newuser: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        custom: {
			'Idekmandy': ['Idekmandy']
		},
		metafilter: {
			'rollback': ['sysop', 'bureaucrat', 'content-moderator'],
			'threadmoderator': ['sysop', 'bureaucrat'],
			'content-moderator': ['sysop', 'bureaucrat']
		},
        mwGroups: [
            'bureaucrat',
            'content-moderator',
            'threadmoderator',
            'bot',
            'rollback'
        ],
    },
	tags: {
        bureaucrat: {u:'Glamazon', link: 'Special:ListUsers/bureaucrat'}, 
        sysop: {u:'Hunty', link: 'Special:ListUsers/sysop'},
        'content-moderator': {u: 'Content Moderator', link: 'Special:ListUsers/content-moderator'},
        threadmoderator: {u: 'Thread Moderator', link: 'Special:ListUsers/threadmoderator'},
        'wiki-representative': {link: 'Help:Wiki_Representatives'},
        blocked: {link: 'Special:BlockList'},
        bot: {link: 'Special:ListUsers/bot'},
        rollback: {u: 'Rollback', link: 'Special:ListUsers/rollback'},
        'Idekmandy': { u:'Drag Superstar'}
	}
};
/* Braacket tournament */
    $(function () {
        $('#bracket').append('<script src="https://cdn.commoninja.com/sdk/latest/commonninja.js" defer></script><div class="commonninja_component pid-da2732cf-11c2-4f9a-a33f-3456ba4bfd69"></div>' );
    });