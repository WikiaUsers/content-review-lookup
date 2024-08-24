/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
(function(window, $, mw) {
	"use strict";
	
	// Add default image for LinkPreview
	window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} }); 
    window.pPreview.defimage = 'https://static.wikia.nocookie.net/how-i-met-your-mother/images/e/e6/Site-logo.png/revision/latest?cb=20220420184901&format=original&path-prefix=fr';
    window.pPreview.noimage = 'https://static.wikia.nocookie.net/how-i-met-your-mother/images/e/e6/Site-logo.png/revision/latest?cb=20220420184901&format=original&path-prefix=fr';
	
	// Add custom class for styling long list of refs
	$(function() {
		if ($('.references li').length > 9)
			$('.references').addClass('compactreferences');
	});
	
}(window, jQuery, mediaWiki));