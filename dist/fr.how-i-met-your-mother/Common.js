/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
(function(window, $, mw) {
	"use strict";
	
	// Add custom class for styling long list of refs
	$(function() {
		if ($('.references li').length > 9)
			$('.references').addClass('compactreferences');
	});
	
}(window, jQuery, mediaWiki));