/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
/* Ajoute A+ Wiki Badge à l’en-tête. Code provenant de https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:common.js */
$('.fandom-community-header__community-name-wrapper').append(
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '30px')
	.attr('src', 'https://static.wikia.nocookie.net/seigneur-des-anneaux/images/b/bf/A%2BWiki.png/revision/latest?cb=20230719103744&path-prefix=fr')
);