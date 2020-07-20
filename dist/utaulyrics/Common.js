// <nowiki>

// redirect from unsupported page titles when searching
if (mw.config.get("wgPageName") === "Special:Search") {
	switch (document.getElementById("search-v2-input").value) {
		case ".":
			window.location = "/wiki/．";
			break;
	}
}

// add a link to producer page from "song pages not linked to from/..." categories
var h1 = document.getElementsByClassName("page-header__title")[0];
var notLinkedToFromMatch = mw.config.get("wgPageName").match(/^Category:Song_pages_not_linked_to_from\/(.+)$/);
if (h1 && notLinkedToFromMatch) {
	console.log(notLinkedToFromMatch);
	var producer = notLinkedToFromMatch[1];
	var a = document.createElement("a");
	a.href = "../" + producer + "?action=edit";
	a.innerHTML = "<mark>→→→</mark>";
	h1.appendChild(a);

	var songsLinks = document.querySelectorAll("#mw-pages li a");
	var wikitext = '';
	for (var i = 0; i < songsLinks.length; i++) {
		wikitext += '\n|-\n| {{pwt row|' + songsLinks[i].innerText + '}}';
	}
	var wikitextElement = document.createElement("pre");
	wikitextElement.innerText = wikitext;
	document.getElementById("mw-content-text").appendChild(wikitextElement);
}