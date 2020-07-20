// Botón para cambiar a Ben 10 Wiki, modificado del SkinSwitchButton (http://dev.wikia.com/wiki/SkinSwitchButton)
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ben10wiki"><a title="Ingresar a Ben 10 Wiki, la enciclopedia no-fanon de Ben 10." href="http://es.ben10.wikia.com">Ben 10 Wiki</a></li>' ).appendTo( '#GlobalNavigation' );
		} else {
			$( '<li id="ca-wiki"><a title="Ingresar a Ben 10 Wiki, la enciclopedia no-fanon de Ben 10." href="http://es.ben10.wikia.com">Ben 10 Wiki</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		}
	}
} );