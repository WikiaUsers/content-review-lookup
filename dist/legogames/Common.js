/* Any JavaScript here will be loaded for all users on every page load. */
/* 
This code is loaded on all skins.
*/

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ShowHide/code.js",
        "w:c:dev:AjaxRC/code.js"
    ]
});
// Skin Switch Button for monobook to oasis and vice versa
// and for monobook and oasis to wikiamobile

/*
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">MB</a></li>' ).appendTo( '#AccountNavigation' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">WM</a></li>' ).appendTo( '#AccountNavigation' );
		} else {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">Oasis</a></li>' ).appendTo( '#p-cactions > .pBody > ul' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">Mobile</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		} 
	}
} );
*/