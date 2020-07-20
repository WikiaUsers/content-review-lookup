if( wgNamespaceNumber != -1 && !window.WordmarkLink  ) {
	addOnloadHook( addWordmarkLink );
}
var WordmarkLink = true; // prevent duplication
 
function addWordmarkLink () {
        $('<a href="/Portal:Main" accesskey="z"><img alt="Vanilla WoWWiki" src="https://images.wikia.nocookie.net/__cb20121102071454/vanilla-wow/images/8/80/Ui-charactercreate-classes_paladin.png"></a>').before('#firestHeading');
}