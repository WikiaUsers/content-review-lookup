mw.hook('wikipage.content').add(function() {
	document.querySelectorAll('.character-story .mw-collapsible-toggle').forEach(function(story) {
		story.click();
	});
});