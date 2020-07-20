/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

addOnloadHook(function() {
	var elm = document.getElementById("searchBody");

	if (elm) {
		while (elm.lastChild) elm.removeChild(elm.lastChild);

		elm = elm.appendChild(document.createElement("form"));
		elm.id = "searchform";
		elm.action = "/Special:Search";
		elm.method = "get";

		for (var i = 0; i < 16; i++) {
			elm = elm.appendChild(document.createElement("input"));
			elm.type = "hidden";
			elm.name = "ns" + i;
			elm.value = 1;
			elm = elm.parentNode;
		}

		elm = elm.appendChild(document.createElement("input"));
		elm.id = "searchInput";
		elm.accesskey = "f";
		elm.name = "search";
		elm.size = "25";
		elm.style.width = "125px";

		elm = elm.parentNode.appendChild(document.createElement("input"));
		elm.id = "searchGoButton";
		elm.type = "submit";
		elm.className = "searchButton";
		elm.name = "go";
		elm.value = "Go";

		elm = elm.parentNode.appendChild(document.createTextNode(" "));

		elm = elm.parentNode.appendChild(document.createElement("input"));
		elm.id = "mw-searchButton";
		elm.type = "submit";
		elm.className = "searchButton";
		elm.name = "fulltext";
		elm.value = "Search";
	}
});