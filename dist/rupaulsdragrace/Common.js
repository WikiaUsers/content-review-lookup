/* Any JavaScript here will be loaded for all users on every page load. */
/* WHM toolbar advertisement */
var toolbarLabel = 'WHM';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomWHMFinalGirls', label: 'Final Girls: The Trading Cards*'},
    {link: 'https://bit.ly/FandomWHMFinalGirlsPlaylist', label: 'Final Girls: The Playlist'},
    {link: 'https://bit.ly/FandomWHMBlog-toolbar', label: 'Fandom blog'},
    {link: 'https://rupaulsdragrace.fandom.com/f/p/4400000000000168369', label: 'Discussions post'},
    {link: 'https://spoti.fi/3loZ1Nu', label: 'WHM spotify playlist'},
    {link: 'https://bit.ly/FandomWHMGamers', label: 'Gaming Stories: meet RinasaurusRex<br/>and Jessica Howard'},
    {link: 'https://bit.ly/FandomWHMGamers2', label: 'Gaming Stories: meet Minnichi and<br/>LucyKuranSKYDOME'},
    {link: 'https://bit.ly/FandomWHMGamers3', label: 'Gaming Stories: meet Miranda Phaal<br/>and Tiffany Tse'},
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
    '<h2 style="margin-left: 16px">Women\'s History Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* WHM logo link */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Meet the Women\'s History Month Final Girls')
        )
        .attr('href', 'https://bit.ly/FandomWHMFinalGirls')
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