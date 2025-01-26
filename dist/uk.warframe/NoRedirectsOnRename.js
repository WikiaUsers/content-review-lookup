/* NoRedirectsOnRename.js
Знімає прапорець з чекбокса "Залишити перенаправлення" під час перейменування сторінки */
;(function ($) {
	"use strict";
	
	if (mw.config.get('wgCanonicalSpecialPageName') == "Movepage") {
		$("input[name=wpLeaveRedirect]").prop( "checked", false );
	}
}(jQuery));