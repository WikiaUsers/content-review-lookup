/** <nowiki>
 * Dodaje wysuwaną pływającą ramkę Facebooka w prawym rogu ekranu
 */
require( ['wikia.window', 'wikia.browserDetect'], function( window, browserDetect ) {
	// Zapobieganie wielokrotnemu ładwaniu + nie ładuj na telefonach
	if ( browserDetect.isMobile() || window.FloatingFBLoaded ) return;
	window.FloatingFBLoaded = true;

	// Załaduj potrzebny kod CSS z pliku
	importArticle( {
		type: 'style',
		article: 'MediaWiki:Facebook.css'
	} );

	// Stwórz elementy DOM potrzebne w skrypcie
	var element = document.createElement( 'div' );
	var content = document.createElement( 'iframe' );

	// Dodaj atrybuty tagu <iframe>
	content.src = 'https://facebook.com/plugins/page.php?href=https://facebook.com/gothicpedia/&tabs=timeline&width=195&height=360&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=true&appId';
	content.width = 195;
	content.height = 360;
	content.scrolling = 'no';
	content.frameborder = 0;
	content.allowTransparency = true;

	// Dodaj ID tagu <div>
	element.id = 'FacebookWnd';

	// Dodaj pływającą ramkę na końcu dokumentu
	element.appendChild( content );
	document.body.appendChild( element );
} );