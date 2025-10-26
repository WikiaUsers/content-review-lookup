(function($, mw) {
	'use strict';

	/// Search for the CSS rule of `toDisplay`, and assign it for `toHide` instead.
	/// The CSS rule should only consists of `{ display: none; }`.
	function changeCategoryHidden(toHide,toDisplay) {
		for (var i = 0; i < document.styleSheets.length; i++) {
		    var sheet = document.styleSheets[i];
			try {
				for (var j = 0; j < sheet.cssRules.length; j++) {
					var rule = sheet.cssRules[j];
					if ((rule.selectorText || '').includes(toDisplay) && rule.style.display == 'none') {
						var newRule = rule.cssText.replace(toDisplay, toHide);
						sheet.deleteRule(j);
						sheet.insertRule(newRule, j);
						// Stop after the first replacement
						return true;
					}
				}
			// Ignore only DOMException
			} catch (err) {
				if (!err.isPrototypeOf(DOMException))
					throw err;
			}
		}
		return false;
	}

	/// [[Template:ChangeLanguage]]
	/// @{

	function changeBoldedText() {
		$('span.change-lang').each(function(i,o) {
			$(o).css('font-weight', (o.dataset.lang || '') == mw.cookie.get('text-lang',null,'en') ? 'bold' : 'normal');
		});
	}

	// Apply click callback on span.chang-lang
	$('span.change-lang')
		.on('click', function (o) {
			var newL = o.target.dataset.lang;
			if (!newL || newL == mw.cookie.get('text-lang',null,'en')) return;
			if (!changeCategoryHidden('.lang-' + mw.cookie.get('text-lang',null,'en'), '.lang-' + newL)) return;
			mw.cookie.set('text-lang', newL);
			changeBoldedText();
		});
	
	// Set current language
	changeBoldedText();
	if (mw.cookie.get('text-lang',null,'en') != 'en') {
		changeCategoryHidden('.lang-en', '.lang-' + mw.cookie.get('text-lang'));
	}
	
	/// @}

	/// Skill description
	/// @{

	// Apply click callback
	$('span.expand-desc')
		.on('click', function (o) {
			changeCategoryHidden('.short-desc','.full-desc');
		});
	$('span.collapse-desc')
		.on('click', function (o) {
			changeCategoryHidden('.full-desc','.short-desc');
		});

	/// @}

})(window.jQuery, window.mediaWiki);