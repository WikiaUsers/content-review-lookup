/* Any JavaScript here will be loaded for all users on every page load. */
/* WHM toolbar advertisement */
var toolbarLabel = 'WHM';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomWHMBlog-toolbar', label: 'Fandom blog'},
    {link: 'https://strangerthings.fandom.com/f/p/4400000000003517579', label: 'Discussions post'},
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
            .text('Learn about Women\'s History Month at Fandom')
        )
        .attr('href', 'https://bit.ly/FandomWHMBlog-logo')
);