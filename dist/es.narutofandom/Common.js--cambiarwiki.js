// Botón para cambiar a Naruto Wiki, modificado del SkinSwitchButton (http://dev.wikia.com/wiki/SkinSwitchButton)
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="naruto"><a title="Aspecto Monobook." href="http://es.narutofandom.wikia.com">Monobook</a></li>' ).appendTo( '#GlobalNavigation' );
		} else {
			$( '<li id="ca-wiki"><a title="Ven al Ascpecto Monobook" href="http://es.narutofandom.wikia.com">Monobook</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		}
	}
} );