function addWordmarkLink () {
  $('<a href="/iSC_Pedia:Main_Page" accesskey="z"><img alt="iSC Pedia 3.0" src="https://images.wikia.nocookie.net/__cb6/en-isc-pedia/images/8/89/Wiki-wordmark.png"></a>').before('#firstHeading');
}

if ( wgNamespaceNumber != -1 && !window.WordmarkLink  ) {
  $( addWordmarkLink );
}
var WordmarkLink = true; // prevent duplication