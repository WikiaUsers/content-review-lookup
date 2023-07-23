/* Any JavaScript here will be loaded for all users on every page load. */

$('.fandom-community-header__community-name-wrapper').append(
	/* Adds A+ Wiki Badge to Title */
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '30px')
	.attr('src', 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/96/Fandom-A%2Bwiki-badge.png'),
	
	/* Adds Fandom Compass Badge to Title */
	$('<img/>').addClass('hover-community-header-wrapper').css('height', '50px').css('padding-left', '10px')
	.attr('src', 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a2/FandomCompass-Banner-Light.png')
);