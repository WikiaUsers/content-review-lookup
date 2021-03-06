/* AjaxRC */
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/theloudhouse/images/5/53/Loading_bar.gif';
window.ajaxPages = [
    "Blog:Recent_posts",
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:Contributions"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
var WikiaNotificationMessage = "";
 
/*More JS*/
$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_")
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});
 
// Add template to the upload page
// @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val('[[Category:Images]]');
        });
    }
}
 
/* This code removes the ability to use arrow keys to navigate pages.
var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
    prop,
    el = document.createElement('div');
 
for(var i = 0, l = props.length; i < l; i++) {
    if(typeof el.style[props[i]] !== "undefined") {
        prop = props[i];
        break;
    }
}
 
var xAngle = 0, yAngle = 0;
$('body').keydown(function(evt) {
    switch(evt.keyCode) {
        case 37: // left
            yAngle -= 90;
            break;
 
        case 38: // up
            xAngle += 90;
            evt.preventDefault();
            break;
 
        case 39: // right
            yAngle += 90;
            break;
 
        case 40: // down
            xAngle -= 90;
            evt.preventDefault();
            break;
    };
    document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
});
*/ 
 
/*** Ensure image load ******************************************************
 * Forces an image to load on startup
 * Loads images designed to load when scrolled past
 * For tabbers and collapsible content where images can
    appear at the top due to things above collapsing
 * Written by JBed of FFWiki
 ****************************************************************************/
function loadImagesInTabber() {
  var tabber = getElementsByClassName(document,"div","tabbertab");
  for (var i = 0; i < tabber.length; i++) {
    var images = tabber[i].getElementsByTagName("img");
    for (var ii = 0; ii < images.length; ii++) {
      loadHiddenImage(images[ii]);
    }
  }
}
 
function loadHiddenImage(sender) {
  var source = sender.getAttribute("data-src");
  if (source) {
    sender.src = source;
    sender.style.opacity = 1;
  }
}

addOnloadHook(loadImagesInTabber);