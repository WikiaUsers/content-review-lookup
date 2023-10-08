/* Any JavaScript here will be loaded for all users on every page load. */

$('.fandom-community-header__community-name-wrapper').append(
 	/* Adds A+ Wiki Badge to Title */
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '50px')
	.attr('src', 'https://static.wikia.nocookie.net/central/images/e/ed/A%2B_wiki_badge.png/revision/latest/scale-to-width-down/1000?cb=20230728135027'));