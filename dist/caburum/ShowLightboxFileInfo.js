(function() {
	// find the name of the lightbox code in the module registry
	var n = 'ext.fandom.Lightbox.js';
	var s = Object.keys(mw.loader.store.items).find(function(m) {
		return m.indexOf(n + '@') === 0;
	});

	// exit if it's been patched already or doesn't exist
	if (!s || s.includes('patched')) return;

	// this function will be embedded anonymously in the new lightbox code
	// if we reference a global function in the modified code and it stops existing, the lightbox will stop working
	patchLightboxHtml = function(html) {
		return html
			// invert first isUserAnon
			.replace('{{#isUserAnon}}', '').replace('{{/isUserAnon}}', '').replace('{{^isUserAnon}}', '{{#isUserAnon}}')
			// restore link
			.replace(new RegExp('<div (class="wds-dropdown__toggle .+? more-info-button.+?)<\/div>', 's'), '<a href="{{fileUrl}}" $1</a>');
	};

	// let the code be loaded again
	delete mw.loader.moduleRegistry[n];

	var newCode = mw.loader.store.items[s]
		// update version
		.replace(s, s + '-patched')
		// apply patch
		.replace('Lightbox.templateHtml=e', 'Lightbox.templateHtml=(' + patchLightboxHtml.toString() + ')(e)');

	// reload the code
	eval(newCode);
})();