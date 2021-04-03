/* Any JavaScript here will be loaded for all users on every page load. */

function timeStamp_ImageHover_js() {
  return "2014.07.11 11:25 (UTC-7)";
}

function createImageHovers() {
   var imgCentral  = document.getElementsByClassName('info-central-image');
   var imgRollOver = document.getElementsByClassName('info-rollover-image');

   if (imgCentral.length < 1 || imgRollOver.length < 1)
      return;

   // Save the original image(s) so we can revert back to it
   for (var i = 0; i < imgCentral.length; i ++) {
      if (!imgCentral[i].id)
         imgCentral[i].id = 'image-hover-central-image-id-' + i;

      imgCentral[i].origImage = $('#' + imgCentral[i].id + ' img').get(0).src;
   }

   // Save the uncompressed image paths as well so we don't have to keep querying them
   for (var i = 0; i < imgRollOver.length; i ++) {
      var urlJSON;
      var currElem;

      if (!imgRollOver[i].id)
         imgRollOver[i].id = 'image-hover-rollover-image-id-' + i;

      currElem = $('#' + imgRollOver[i].id + ' img').get(0);

      if (!currElem.getAttribute('data-image-name'))
         continue;
     
      urlJSON = '/api.php?action=query&prop=imageinfo&titles=File:' +
         currElem.getAttribute('data-image-name') + '&iiprop=url&format=json';      

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
         $('#' + imgCentral[j].id + ' img').get(0).src = event.target.uncompressedPath;
   };

   var mouseOutImage = function(event) {
      // Reset all the central images
      for (var j = 0; j < imgCentral.length; j ++)
         $('#' + imgCentral[j].id + ' img').get(0).src = imgCentral[j].origImage;
   };

   // Apply the events
   $('span.info-rollover-image img').hover(mouseOverImage, mouseOutImage);
}

addOnloadHook(createImageHovers);