/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/*
 * Ajout d'un sous-titre
 * Fonction utilisée par [[Modèle:Sous-titre de la page]]
 * La fonction cherche un élément de la forme
 * <span id="sous_titre_h1">Sous-titre</span>
 */
 
function sousTitreH1( $content ) {
	$( '#firstHeading > #sous_titre_h1' ).remove();
	var $span = $content.find( '#sous_titre_h1' );
	if ( $span.length ) {
		$span.prepend( ' ' );
		$( '#firstHeading' ).append( $span );
	}
}
mw.hook( 'wikipage.content' ).add( sousTitreH1 );