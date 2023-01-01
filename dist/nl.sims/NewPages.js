/* De JavaScript-code die hier wordt geplaatst, wordt door gebruikers geladen wanneer ze elke pagina bezoeken. */

//==================================================================
// Nieuw artikelblok met sjabloon: NewPagesModule erin.

$(function(){
	$('<section class="new-pages-module"></section>')
		.appendTo('#WikiaRail')
		.load('/nl/index.php?title=Template:NewPagesModule&action=render');
});