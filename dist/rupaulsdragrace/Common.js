/* Any JavaScript here will be loaded for all users on every page load. */
/* BHM toolbar advertisement */
var toolbarLabel = 'BHM';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomBHMblog-toolbar', label: 'Fandom blog'},
    {link: 'https://rupaulsdragrace.fandom.com/f/p/4400000000000165944', label: 'Discussion post'},
    {link: 'https://trivia.fandom.com/f/p/4400000000000034213', label: 'Quiz: know your Black queens'},
    {link: 'https://www.instagram.com/p/CoHf3gVIKwS/?igshid=YmMyMTA2M2Y%3D', label: 'Instagram: Black drag history'},
    {link: 'https://www.instagram.com/p/Cokz108KgI5/?igshid=YmMyMTA2M2Y%3D', label: 'Instagram: Gladys Bentley'},
    {link: 'https://bit.ly/FandomBHMMillerStory', label: 'Editor Story: Meet Miller'},
    {link: 'https://bit.ly/FandomBHMTimeline', label: 'BHM Entertainment Timeline'},
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* BHM logo link */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to learn more about Black History Month at Fandom.')
        )
        .attr('href', 'https://bit.ly/FandomBHMblog-logo')
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
        'wiki-manager': {link: 'Help:Wiki_Representatives'},
        blocked: {link: 'Special:BlockList'},
        bot: {link: 'Special:ListUsers/bot'},
        rollback: {u: 'Rollback', link: 'Special:ListUsers/rollback'},
        'Idekmandy': { u:'Drag Superstar'}
	}
};