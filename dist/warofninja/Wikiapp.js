if( wgNamespaceNumber != -1 && !window.WordmarkLink  ) {
	addOnloadHook( addWordmarkLink );
}
var WordmarkLink = true; // prevent duplication
 
function addWordmarkLink () {
	$('<a href="/Portal:Main" accesskey="z"><img alt="WoWWiki" src="http://images2.wikia.nocookie.net/__cb31/warofninja/images/8/89/Wiki-wordmark.png"></a>').before('#firstHeading');
}