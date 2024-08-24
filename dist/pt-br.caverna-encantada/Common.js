/* Códigos aqui colocados serão carregados por todos que acessarem esta wiki */

// Recover style on ToC that's removed by a Fandom script.
// See details of the problem, and the solution by HumansCanWinElves on:
// dev.fandom.com/f/p/4400000000000019632/
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