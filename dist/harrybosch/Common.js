/* Any JavaScript here will be loaded for all users on every page load. */

$('.fandom-community-header__community-name-wrapper').append(
 	/* Adds A+ Wiki Badge to Title */
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '30px')
	.attr('src', 'https://static.wikia.nocookie.net/harrybosch/images/2/2c/A+_Badge.png'));