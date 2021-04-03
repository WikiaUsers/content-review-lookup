/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/*Texte d'information, de fr.amour-sucre.wikia.com/wiki/MediaWiki:Common.js*/
if ($.inArray(wgNamespaceNumber, [ 0, 1, 4, 5, 6, 7, 14, 15, 110, 111, 400, 401, 500, 502, 503, -1 ] ) !== -1) {
    $('<div />', { 
        'class': 'legaldisclaimer',
        css: {
            padding: '2px 5px',
            marginTop: '1em',
            clear: 'both',
            fontSize: '85%',
            border: '1px solid #58c5ea',
            color: '#555555',
            borderRadius: '7px',
            textAlign : 'center',
            boxShadow : '0 0 5px 0 rgba(58,81,86,.39)',
        }
    }).text('Le Secret d’Henri est un jeu du studio de création Beemoov. Wiki Le Secret d’Henri est un site indépendant non sponsorisé par le groupe Beemoov. Les images proviennent en majorité du jeu.')
    .appendTo('.WikiaArticle');
}