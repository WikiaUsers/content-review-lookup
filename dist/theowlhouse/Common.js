//Add username alt attribute to masthead profile so highlight css works there
$(function () {
    if (!mw.config.get('profileUserName')) {
        return;
    }

    if ($('#userProfileApp .user-identity-avatar__image').length) {
    	$('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    	return;
    }

    var interval = setInterval(function () {
        if (!$('#userProfileApp .user-identity-avatar__image').length) {
            return;
        }
        clearInterval(interval);
        $('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    }, 100);
});

//EraIcons config
window.useIncludedStylesheet = true;

/* Pride logo link */

$('.fandom-community-header__community-name-wrapper').append(

$('<a/>').addClass('hover-community-header-wrapper')

.append($('<div/>')

.addClass('message')

.text('Celebrating Pride Month')

)

.attr('href', 'https://bit.ly/FandomPrideBlog-header')

);

/* Pride toolbar button */

var toolbarLabel = 'Pride';

var toolbarLinks = [

{link: 'https://bit.ly/FandomPridePlaylist', label: 'Pride spotify playlist'},

{link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'Pride blog with Drag Queens interview'},

{link: 'https://miraculousladybug.fandom.com/f/p/4400000000000213107', label: 'Discussion post'},

{link: 'https://miraculousladybug.fandom.com/f/p/4400000000000212609', label: 'Week 1 - The Gays in Art Class'},

{link: 'https://miraculousladybug.fandom.com/f/p/4400000000000213088', label: 'Week 2 - The punk lesbians of Kitty Section'}

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