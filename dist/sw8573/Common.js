/* Any JavaScript here will be loaded for all users on every page load. */

var fdButtons = [];
 
fdButtons[fdButtons.length] = {
	'summary': 'Spam',
	'label': 'Spam'
};

window.LockForums = {
    expiryDays: 180,
    warningDays: 1,
    disableOn: ["2211"],
    ignoreDeletes: false,
    banners: true,
};

importArticles({
    type: "script",
    articles: [
	"MediaWiki:Common.js/RevealIP.js",	//Reveals anon IPs
        "w:c:dev:AjaxUndo/code.js",
	"w:c:dev:DisplayClock/code.js",		//UTC Clock
        "w:c:dev:FastDelete/code.js",
        "w:c:dev:ListAdmins/code.js",
        "w:c:dev:LockForums/code.js",
        "w:c:dev:SocialIcons/code.js",
	"w:c:dev:ReferencePopups/code.js"		// Reference Popups
    ]
});

//Username template
$(function() {
  if (typeof wgUserName != 'undefined') {
     $('.insertusername').html(wgUserName);
  }
});

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

 
/* Adding links to On the Wiki tab - From Runescape Wiki */
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').append('<li style="background-color:#40e020"><a class="subnav-2a" href="/wiki/Bloons Wiki:Policies">Guidelines and Policies</a></li>');
/*        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Bloons Wiki:Requests for Rollbacker">Rollbacker nominations</a></li>'); */
    }
});
/* End */

/* Clash of clans wiki - ImageHover.js */
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