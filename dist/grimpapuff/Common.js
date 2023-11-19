/* Any JavaScript here will be loaded for all users on every page load. */

/* Configuring AddRailModule */
window.AddRailModule = [
	{page: 'Template:RailModule', prepend: true},
	'Template:NewPagesModule'
];

// Link Preview
/* Config object */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/grimpapuff/images/1/11/Doesn%27t_exist.webp';
window.pPreview.RegExp.noinclude = [ "img", ".thumb", ".no-link-preview", ".reference", ".error" ];

// Recover style on TOC that's removed by a Fandom script. Found on dev.fandom.com then check on kingdomthegame.fandom.com/wiki/MediaWiki:Common.js.
// And do you know that you can use italic or bold header in TOC? In current day, Offical Fandom Wikia straight up remove this TOC's style in their script. If want to taken back like Wikipedia's choice of style, you must use JS for justice...
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