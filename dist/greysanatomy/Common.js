/* Any JavaScript here will be loaded for all users on every page load. */
/* Pride toolbar advertisement */
var toolbarLabel = 'Disability Pride';
var toolbarLinks = [
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395090', label: 'July 13: Disability Pride - Heart disease'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395089', label: 'July 12: Disability Pride - ADHD'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395084', label: 'July 11: Disability Pride character highlights'}
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
    '<h2 style="margin-left: 16px">Disability Pride Month</h2>' +
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
            .text('Celebrating Disability Pride Month')
        )
        .attr('href', 'https://greysanatomy.fandom.com/f/p/4400000000000395084')
);