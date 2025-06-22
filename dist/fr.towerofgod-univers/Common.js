/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
 
/*Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js*/
if ($.inArray(wgNamespaceNumber, [ 0, 1, 4, 5, 6, 7, 14, 15, 110, 111, 400, 401, 500, 502, 503, -1 ] ) !== -1) {
    $('<div />', { 
        'class': 'legaldisclaimer',
        css: {
            padding: '2px 5px',
            marginTop: '10px',
            clear: 'both',
            fontSize: '85%',
            color: '#555555',
            borderRadius: '7px',
            textAlign : 'center',
            boxShadow : '0px 0px 10px #75B5F3',
        }
    }).text('Tower of God est un webtoon créé par SIU. Le wiki Tower of God est un site indépendant non sponsorisé par Webtoon ou SIU. Les images proviennent en majorité du manwha et anime.')
    .appendTo('.WikiaArticle');
}

window.UserTagsJS = {
	modules: {},
	tags: {
		user: {u: 'Régulier', link: 'Régulier'},
		ranker: {u: "Ranker", link: 'Ranker'},
		
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;