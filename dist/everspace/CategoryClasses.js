/* ┌───────────────────────────────┐ */
/* │  Category classes script      │ */
/* └───────────────────────────────┘ */
;(function(window, $, mw){
	'use strict';
	
	// Override existing script (if original still present)
	window.andrewds1021 = { category_classes: { has_run: true } }; 
	
	window.everspacewiki = window.everspacewiki || {};
	if (window.everspacewiki.categoryClasses && window.everspacewiki.categoryClasses.applied) return;
	window.everspacewiki.categoryClasses = { applied: true };

	const illegalChars = /[\x00-\x20!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~]|\xC2\xA0/g;

	const categories = mw.config.get('wgCategories') || [];

	for (const name of categories) {
		const cls =
			'category-' + name
				.replace(illegalChars, '_')
				.replace(/_+/g, '_')
				.replace(/^_+|_+$/g, '');

		document.body.classList.add(cls);
	}

})(this, jQuery, mediaWiki);