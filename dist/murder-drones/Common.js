/* Any JavaScript here will be loaded for all users on every page load. */



/* WHM toolbar advertisement */
var toolbarLabel = 'GLITCH Resources';
var toolbarLinks = [
    {link: 'https://twitter.com/glitch_prod', label: 'GLITCH Prod.\'s Twitter'},
    {link: 'https://www.youtube.com/@GLITCH', label: 'GLITCH Prod.\'s YouTube Channel'},
    {link: 'https://glitchproductions.store/', label: 'Official GLITCH Store'},
    {link: 'https://www.glitchprod.com/', label: 'Official GLITCH Website'},
    {link: 'https://www.youtube.com/@LiamVickersAnimation', label: 'Liam Vicker\'s YouTube Channel'},
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
    '<h2 style="margin-left: 16px">GLITCH Resources</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* below logo link bar */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to view the current episode.')
        )
        .attr('href', 'https://www.youtube.com/watch?v=caR9ouipm8o')
);