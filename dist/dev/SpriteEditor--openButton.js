;(function(mw) {
	'use strict';
	var config = mw.config.get([
			"skin",
			"wgArticlePath",
			"wgFormattedNamespaces",
			"wgTitle"
		]);
	function getURL() {
		var c = config.wgArticlePath.replace("$1", config.wgFormattedNamespaces[-1] + ":Blankpage/SpriteEditor?sprite=" + config.wgTitle);
		return c;
	}
	var ele, inner, label;
	if (config.skin === "fandomdesktop") {
		var clickFunc = function() {
			window.location.href = getURL();
		};
		mw.hook('dev.ct').add(function(customTools) { // ToDo: Localization
			customTools([
				{
					click: clickFunc,
					// i18n: 'SpriteEditor',
					icon: 'images',
					placement: 'page-tools-left',
					position: -1,
					text: 'Open in SpriteEditor'
				},
				{
					click: clickFunc,
					// i18n: 'SpriteEditor',
					icon: 'images',
					placement: 'page-actions-dropdown',
					position: 0,
					text: 'Open in SpriteEditor'
				}
			]);
		});
	
		importArticle({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:CustomTools.js'
			]
		});
	} else if (config.skin === "vector" || config.skin === "vector-2022") {
		ele = document.createElement("li");
		ele.id = "se-open";
		ele.className = "vector-tab-noicon mw-list-item collapsible";
		inner = document.createElement("a");
		inner.setAttribute("href", getURL());
		inner.setAttribute("title", "Open in SpriteEditor");
		label = document.createElement("span");
		label.innerText = "Open in SpriteEditor";
		inner.appendChild(label);
		ele.appendChild(inner);
		document.querySelector("#right-navigation .vector-menu-content > ul").appendChild(ele);
		if (config.skin === "vector-2022")
			document.getElementById("p-views").classList.remove("emptyPortlet");
	}
})(window.mediaWiki);