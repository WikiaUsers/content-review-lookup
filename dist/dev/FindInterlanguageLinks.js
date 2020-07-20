// Obtain a list of all language interwikis of a particular wiki.
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
	var api = new mw.Api();
	api.get( {
		action: 'query',
		meta: 'siteinfo',
		siprop: 'interwikimap|languages',
		sifilteriw: 'local',
	} ).done( function ( data ) {
		var languages = {}, duplicates = {}, name, curr, prev;
		// Filter out duplicate language names.
		// Try to assign it an non-aliased code.
		$.each(data.query.languages, function(i, language) {
			name = language['*']; // full name of language
			curr = language.code; // current code
			prev = languages[name]; // previously found code, if any
			// Assumes aliases are longer and start with non-aliased code
			// @TODO: Ensure that all languages are correct and valid.
			// See: https://meta.wikimedia.org/wiki/Special_language_codes
			if (prev === undefined) {
			    // first encounter with this language
				languages[name] = curr;
			} else if (curr.length < prev.length && prev.startsWith(curr)) {
				languages[name] = curr;
				duplicates[name] = prev;
			} else {
				duplicates[name] = curr;
			}
		});
		console.debug('Included language codes:', languages);
		console.debug('Excluded language codes:', duplicates);

		var interwikis = [], iw_prefix, iw_url, iw_language;
		var anchor = $('<a/>')[0];
		$.each(data.query.interwikimap, function(i, iw) {
			iw_prefix = iw.prefix;
			iw_url = iw.url.replace('$1', '');
			iw_language = iw.language;
			// The "correct" prefix-language combination, hopefully.
			var isCorrectPrefix = languages[iw_language] === iw_prefix;
			// Make use of the anchor element to obtain just the hostname.
			anchor.href = iw_url;
			var isNotWikia = !anchor.hostname.endsWith('.wikia.com');
			if (isCorrectPrefix && isNotWikia) {
				var str = '* [[:'+iw_prefix+':]] ('+iw_language+'): '+iw_url;
				interwikis.push(str);
			}
		});
		console.log('Interwiki languages:\n' + interwikis.join('\n'));
	});
});