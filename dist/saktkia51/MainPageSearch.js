// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:MainPageSearch.js

{
	if (document.getElementById("MainPageSearch") === null) {
		console.log("[Main Page Search] [LOG]: Template is not transcluded. Cancelling script.");
	} else if (mw.config.get("wgIsMainPage") === null) {
		console.log("[Main Page Search] [LOG]: Template is transcluded, but current page is not the main page. Cancelling script.");
	} else {
		console.log("[Main Page Search] [LOG]: Template is transcluded and current page is the main page. Running script.");
		document.getElementById("MainPageSearch").setAttribute("style", "border-left:0;border-right:0;border-bottom:0;text-align:center;font-size:24px;border-radius:initial;display:block;");
		
		const input = document.getElementById("SearchQuery").appendChild(document.createElement('textarea'));
		input.setAttribute('id', 'SearchQueryInput');
		input.setAttribute('style', 'padding:0.5em');
		
		const confirmButton = document.getElementById("SearchQueryButton").appendChild(document.createElement('button'));
		confirmButton.setAttribute('style', 'padding:0.75em;');
		confirmButton.innerHTML = 'Confirm';
		confirmButton.addEventListener('click', openSearch);
		
		function openSearch() {
			window.open(`${mw.config.get('wgServer')}/Special:Search?query=${input.value}`);
		}
	}
}