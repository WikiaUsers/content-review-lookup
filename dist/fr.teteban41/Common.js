/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

/*** Test Alert & Confirm ***/
switch (mw.config.get('wgPageName')) {
    case 'Test:JS-Alert':
        alert('Ceci est une alerte.');
        break;
    case 'Test:Confirm':
        if (confirm('Merci de confirmer que vous respecterez le règlement du wiki.')) {
			document.css('.ooui-theme-fandom .wds-community-header .wds-community-header__sitename a::before { content: \"Approuvé\"; color: palegoldenrod; font-family: \'Rubik\'; font-size: 60%; margin-left: 15px;  }');
		}
        break;
}

/*** Spoiler click ***/
const spoiler = document.querySelector('span classe=\"spoiler\"');

spoiler.onclick = function() {
  if (confirm('Ceci est un spoiler, êtes-vous sûr de vouloir le lire ?')) {
  	spoiler.style("background: transparent; color: #3A3A3A; ")
  }
};

/*** Button pseudo ***/
const buttonPseudo = document.querySelector('span classe=\"wds-button pseudo\"');

spoiler.onclick = function() {
  let name = prompt('Quel est votre pseudonyme sur Fandom ?');
  alert('Bienvenue sur le wiki,  ' + name + ', passez un bon moment !');
};

/*** Sous-titre (provient de https://fr.wikipedia.org/wiki/MediaWiki:Common.js) ***/
function sousTitreH1( $content ) {
	$( '#firstHeading > #sous_titre_h1' ).remove();
	var $span = $content.find( '#sous_titre_h1' );
	if ( $span.length ) {
		$span.prepend( ' ' );
		$( '#firstHeading' ).append( $span );
	}
}
mw.hook( 'wikipage.content' ).add( sousTitreH1 );