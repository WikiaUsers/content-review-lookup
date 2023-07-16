/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds A+ Wiki Badge to Title */
$('.fandom-community-header__community-name-wrapper').append(
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '30px').css('padding-bottom', '3px')
	.attr('src', 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/96/Fandom-A%2Bwiki-badge.png')
);