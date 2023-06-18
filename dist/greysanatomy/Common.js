/* Any JavaScript here will be loaded for all users on every page load. */
/* Pride toolbar advertisement */
var toolbarLabel = 'Pride';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomPridePlaylist', label: 'Pride spotify playlist'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'Pride blog with Drag Queens interview'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000394927', label: 'Discussion post'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000394902', label: 'Queer highlights in Grey\'s Anatomy'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'Pride Stories: Celebrate with Itsbartbytheway'}
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