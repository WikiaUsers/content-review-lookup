/*global mw, jQuery*/
/*jshint curly:false */
jQuery(document).ready(function() {
'use strict';
	if (mw.config.get('wgNamespaceNumber') !== 6 || mw.config.get('wgAction') !== "view" || !document.getElementById('file')) return;

	var imgs = document.getElementById('file').getElementsByTagName('img');
	if (!imgs || imgs.length === 0) return; // No preview image, e.g. for large PNGs

	var imageurl = imgs[0].parentNode.href;
	if (!imageurl) return; /* This occurs with thumbs of videos for instance */

	// For the case of 'Error creating thumbnail: Invalid thumbnail parameters or PNG file with more than 12.5 million pixels'
	if (document.getElementById('file').getElementsByTagName('img').length <= 0) return; 

	if (document.getElementById('file').getElementsByTagName('img')[0].width <= 300) {
		imageurl = document.getElementById('file').getElementsByTagName('img')[0].src; //Image smaller than 300px width
	} else { //Get thumb url
		var n = imageurl.indexOf("/commons/");
		imageurl = imageurl.substring(0, n + ("/commons/").length) + "thumb/" + imageurl.substring(n + ("/commons/").length);

		n = imageurl.lastIndexOf('/') + 1;
		imageurl = imageurl + "/300px-" + imageurl.substring(n); 
	}

	mw.util.addPortletLink('p-cactions', 'https://www.google.com/searchbyimage?image_url=' + encodeURIComponent(imageurl), 'Google Images', 'ca-googleimages', null);
});