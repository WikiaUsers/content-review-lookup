// Add the total numbers of links and transclusions to WhatLinksHere pages
// Authors: RheingoldRiver, Rye Greenwood

$(document).ready(function() {
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
	
	// get WLH page title and namespace from the form input fields
	var title = $('#mw-whatlinkshere-target').val();
	var ns = $('#namespace').val();
	title = title ? title : mw.config.get('wgTitle').replace('WhatLinksHere/', ''); // if failed, get title from URL
	
	// fetch data
	return new mw.Api().get({
		action : 'query',
		prop : 'linkshere|transcludedin',
		titles : title,
		lhlimit : 'max',
		tilimit : 'max',
		lhnamespace : ns === '' ? '*' : ns,
		tinamespace : ns === '' ? '*' : ns,
	}).then(function(data) {
		var linkshereCount, transcludedinCount = 0;
		// extract information from the API result
		for (var p in data.query.pages) {
			var page = data.query.pages[p];
			linkshereCount = page.linkshere ? page.linkshere.length : 0;
			transcludedinCount = page.transcludedin ? page.transcludedin.length : 0;
		}
		
		// i18n: load localized pipes and parentheses
		new mw.Api().loadMessagesIfMissing( [ 'pipe-separator', 'parentheses' ] )
		.then(function() {
			var pipe = mw.msg("pipe-separator");
			
			// prepare injection into HTML
			var fieldset = $("#mw-content-text > fieldset"); // element that holds the "Hide transclusions | ..." string
			var fieldsetText = fieldset.html(); // get raw HTML text of its contents
			var firstPipe = fieldsetText.indexOf(pipe);
			var secondPipe = fieldsetText.lastIndexOf(pipe);
			// inject
			var newText = ''.concat(
				fieldsetText.substring(0, firstPipe), " ",
				mw.msg('parentheses', transcludedinCount),
				fieldsetText.substring(firstPipe, secondPipe), " ",
				mw.msg('parentheses', linkshereCount),
				fieldsetText.substring(secondPipe)
			);
			fieldset.html(newText); // replace HTML text with new text
		});
	});
});