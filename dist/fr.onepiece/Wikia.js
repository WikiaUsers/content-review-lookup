/* Version du JS revue par @John Trololo et @Think D. Solucer */
/* <pre> */
importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/Switch.js', // Modèle manga/anime : à ne jamais toucher si possible
        'MediaWiki:Common.js/Modeles.js', // Pour la plupart des modèles : correctifs
        'MediaWiki:Common.js/References.js', // systeme de fenetre pour les references
    ]
});
/* Fin JS */

//==========================================
//    Personnalisation d'interface (Test)
//==========================================
//Code by Hulothe d'après l'idée de Flo121297 pour One Piece Encyclopédie
 
function getDiffLink(url) {
    return $.ajax({
        type: "GET",
        url: url
    });
}
if ($( '#WikiaRail' ).length) {
  $( '#WikiaRail' ).bind('DOMNodeInserted', function(event) {
    if ($( '#WikiaRecentActivity' ).length) {
        $( '.WikiaActivityModule li em > a' ).each(function() {
            var $this = $( this ),
                lien = wgServer + $this.attr( 'href' ) + '?action=history',
                lienDiff = getDiffLink(lien);
            lienDiff.success(function(content) {
                var link =  $(content).find( '#pagehistory li' ).eq(0).find( '.mw-history-histlinks a' ).attr( 'href' );
                $this.parents( 'li' ).find( 'img.sprite.edit' ).replaceWith( '<a href="' + link + '" title="voir les changements de cette page" rel="nofollow"><img src="https://images.wikia.nocookie.net/__cb1435262597/common/extensions/wikia/MyHome/images/diff.png" width="16" height="16" style="left: 3px; top: 8px; position: absolute" alt="diff"></a>' );
            });
        });
    }
  });
}

// perso display
window.BackToTopText = "Retourner en haut";
window.BackToTopSpeed = 800;