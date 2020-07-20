/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/*Texte d'information, de lego.fandom.com/fr/wiki/MediaWiki:Common.js*/
if ($.inArray(wgNamespaceNumber, [ 0, 1, 4, 5, 6, 7, 14, 15, 110, 111, 400, 401, 500, 502, 503, -1 ] ) !== -1) {
    $('<div />', { 
        'class': 'legaldisclaimer',
        css: {
            padding: '2px 5px',
            marginTop: '1em',
            clear: 'both',
            fontSize: '85%',
            border: '1px solid #c90000',
            color: '#d48b04',
            borderRadius: '7px',
            textAlign : 'center',
            boxShadow : '0 0 5px 0 rgba(86,58,58,.39)',
        }
    }).text('Le Wiki High School Musical est un site indépendant non sponsorisé par The Walt Disney Company. Les images appartiennent en majorité aux chaînes de diffusion Disney Channel et Disney+.')
    .appendTo('.WikiaArticle');
}