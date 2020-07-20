importScript('MediaWiki:Common.js/tetmondaSerĉo.js');
importScript('MediaWiki:Common.js/nav.js');

//KutimoRedaktuButonoj
// **************************************************
 
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020114114/central/images/f/fd/Button_underline.png",
     "speedTip": "Substreki",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Enigi tekston"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020115909/central/images/f/f8/Button_Tool_commons.png",
     "speedTip": "Vikimedia Komunejo",
     "tagOpen": "[[commons:<ligo>|",
     "tagClose": "<nomo>]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020115943/central/images/c/cb/Button_wikipedia.png",
     "speedTip": "Vikipedio",
     "tagOpen": "[[wikipedia:<ligo>|",
     "tagClose": "<nomo>]]",
     "sampleText": ""};
 
  }

$('.twtr-join-conv').replaceWith('<a style="color:#fff;" href="http://twitter.com/Valuto_Vikio">Aliĝi al la konversacio</a>');

/* UZANTONOMO funkcio (danke al Monchoman45 sur Community Central) */
 
addOnloadHook(function() {$('.uzantonomo').html(wgUserName);});
 
/* Resumo */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');