var paramTypeDescriptions = {
  'unknown': 'The "unknown" value is the default type value if no type is set. It can also be set manually by typing "type": "unknown".',
  'string': 'The "string" value is intended for any string of plain text. May contain line breaks.',
  'line': 'The "line" value is intended for content that should be forced to stay on one line. Short text field – use for names, labels, and other short-form fields.',
  'content': 'The "content" value is intended for wikitext of page content, for example, links, images or text formatting.',
  'unbalanced-wikitext': 'The "unbalanced-wikitext" value is intended for wikitext that cannot stand alone, i.e. it lacks an opening or closing tag or refers to other parts of wikitext.',
  'wiki-page-name': 'The "wiki-page-name" value is intended for a page name on a wiki.',
  'wiki-file-name': 'The "wiki-file-name" value is intended for a file name hosted either locally on a wiki or on Wikimedia Commons.',
  'wiki-template-name': 'The "wiki-template-name" value is intended for the name of a template.',
  'wiki-user-name': 'The "wiki-user-name" value is intended for a username on a wiki.',
  'number': 'The "number" value is intended for numerical values, including negative values and decimals.',
  'boolean': 'The "boolean" value is intended for a value that is either true, false or unknown. This is intended by the manual to be represented by a "1", "0" or blank value.',
  'date': 'The "date" value is intended for a date in the YYYY-MM-DD (ISO 8601) format; for example, 2014-05-22. The template data manual also designates it as being intended for ISO 8601 date–time combinations, such as "2014-05-22T16:01:12Z", but in practice no major editing interface as of February 2020 uses it in this fashion, and almost all major Wikimedia template parameters take dates and times separately.',
  'url': 'The "url" value is intended for a URL, with Internet protocol (e.g., "https://" or "//") included.',
};
(function() {
	if ((el = document.querySelector('.mw-templatedata-doc-wrap')) === null) {
		return;
	}

	mw.loader.using('mediawiki.api').then(function() {
		(new mw.Api()).get({
			action: 'templatedata',
			titles: mw.config.get('wgPageName'),
			formatversion: 2,
		}).then(function(res) {
			var templateData = res.pages[Object.keys(res.pages)[0]];
			var keys = Object.keys(templateData.params);
			for (var i in keys) {
			  var dfn;
			  var typeCell = el.querySelector('tbody > tr:nth-child(' + (+i + 1) + ') > .mw-templatedata-doc-param-type');
			  var typeText = typeCell.textContent;
			  typeCell.replaceChildren(dfn = document.createElement('dfn'));
			  dfn.append(Object.assign(document.createElement('abbr'), {
			    title: paramTypeDescriptions[templateData.params[keys[i]].type],
			    textContent: typeText,
			  }));
			}
		});
	});
})();