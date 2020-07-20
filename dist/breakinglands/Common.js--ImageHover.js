function timeStamp_ImageHover_js() {
  return "2014.05.16 13:15 (UTC-7)";
}

function createImageHovers() {
   var imgCentral  = document.getElementsByClassName('info-central-image');
   var imgRollOver = document.getElementsByClassName('info-rollover-image');

   if (imgCentral.length < 1 || imgRollOver.length < 1)
      return;

   // Save the original image(s) so we can revert back to it
   for (var i = 0; i < imgCentral.length; i ++)
      imgCentral[i].origImage = imgCentral[i].childNodes[0].childNodes[0].childNodes[0].src;

   // Save the uncompressed image paths as well so we don't have to keep querying them
   for (var i = 0; i < imgRollOver.length; i++) {
      var currElem = imgRollOver[i];
      var urlJSON;

      // Iterate down until we hit an image
      while (currElem.childNodes[0]) {
         currElem = currElem.childNodes[0];

         if (currElem.tagName === 'IMG')
            break;
      }

      if (currElem.tagName !== 'IMG')
         continue;

      urlJSON = '/api.php?action=query&prop=imageinfo&titles=File:' + currElem.getAttribute('data-image-name') +
         '&iiprop=url&format=json';      

      $.getJSON(urlJSON, (function(data) {
         var elem = currElem;

         return function(data) {
            for (var first in data.query.pages)
               break;

            elem.uncompressedPath = data.query.pages[first].imageinfo[0]['url'];
         };
      })());
   }

   // Create mouseover/mouseout functions
   var mouseOverImage = function(event) {
      if (event.target.tagName !== 'IMG')
         return;

      // Set every central image (if there is more than one) to the appropriate hovered-over image
      for (var j = 0; j < imgCentral.length; j ++)
         imgCentral[j].childNodes[0].childNodes[0].childNodes[0].src = event.target.uncompressedPath;
   };

   var mouseOutImage = function(event) {
      // Reset all the central images
      for (var j = 0; j < imgCentral.length; j ++)
         imgCentral[j].childNodes[0].childNodes[0].childNodes[0].src = imgCentral[j].origImage;
   };

   // Apply the events
   $('span.info-rollover-image img').hover(mouseOverImage, mouseOutImage);
}

addOnloadHook(createImageHovers);