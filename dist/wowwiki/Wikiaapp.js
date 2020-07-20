function addWordmarkLink () {
  $('<a href="/Portal:Main" accesskey="z"><img alt="WoWWiki" src="https://images.wikia.nocookie.net/__cb1/wowwiki/images/8/89/Wiki-wordmark.png"></a>').before('#firstHeading');
}

if ( wgNamespaceNumber != -1 && !window.WordmarkLink  ) {
  $( addWordmarkLink );
}
var WordmarkLink = true; // prevent duplication