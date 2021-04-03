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
            border: '1px solid #10611b',
            color: '#484848',
            borderRadius: '7px',
            textAlign : 'center',
            boxShadow : '0 0 5px 0 rgba(58,81,86,.39)',
        }
    }).text('Dr.Stone est un manga adapté en anime par le studio TMS Entertainment. Le wikia Dr.Stone est un site indépendant non sponsorisé par le groupe. Les images appartiennent en majorité à Riichiro Inagaki, Boichi, Weekly Shōnen Jump ou TMS Entertainment.')
    .appendTo('.WikiaArticle');
}