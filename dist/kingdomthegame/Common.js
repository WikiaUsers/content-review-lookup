/* Any JavaScript here will be loaded for all users on every page load. */

// dev:LockOldComments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;
window.lockOldComments.addNoteAbove = true;

// dev:ProfileTags - prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// dev:ReferencePopups - enable lockdown mode (remove configuration link from the bottom)
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

// Recover style on ToC that's removed by a Fandom script.
// Useful on pages like 'Seasons', and 'Merchant'.
// See details of the problem, and the solution by HumansCanWinElves here: dev.fandom.com/f/p/4400000000000019632/
mw.hook("wikipage.content").add(function() {
	var toc = document.querySelector("#toc");
	if (!toc)
		return;

	var tocEntries = toc.querySelectorAll(".toctext"),
		entriesMap = new Map();

	tocEntries.forEach(function(entry) {
		if (entry.innerHTML !== entry.textContent)
			entriesMap.set(entry, entry.innerHTML);
	});

	if (!entriesMap.size)
		return;

	var interval = setInterval(function() {
		var markupRecovered = false;

		entriesMap.forEach(function(savedInnerHTML, entry) {
			if (entry.innerHTML !== savedInnerHTML) {
				entry.innerHTML = savedInnerHTML;
				markupRecovered = true;
			}
		});

		if (markupRecovered)
			clearInterval(interval);
	}, 500);
});