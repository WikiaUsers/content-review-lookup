mw.hook('wikipage.collapsibleContent').add(function() {
	document.querySelectorAll('.character-story .mw-collapsible-toggle').forEach(function(story) {
		story.click();
	});
});