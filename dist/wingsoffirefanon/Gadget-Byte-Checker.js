mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(function () {
	"use strict";

	// don't run more than once
	if (window.byteCounter) return;
	window.byteCounter = true;

	if (mw.config.get("wgIsArticle") === false) return;

	importArticles({
		type: "script",
		articles: ["u:dev:MediaWiki:Toasts.js", "u:dev:MediaWiki:Dorui.js"],
	});

	const regularExpressions = [
		// Remove most html tags supported by fandom and comments
		{
			target: "<(/)?" + "(abbr|b|big|blockquote|br|center|code|dd|div|dt|em|font|h1|h2|h3|h4|h5|h6|hr|i|li|ol|p|pre|q|s|small|span|strike|strong|sub|sup|table|td|th|tr|tt|u|ul|!--)" + "([^>]+)?>",
			replacement: "",
		},
		// Remove the style attribute
		{
			target: 'style="([^"]*)"( )?(\\|)?',
			replacement: "",
		},
		// Remove files and categories
		{
			target: "(\\[\\[)?(File|Category):.*(\\]\\])?",
			replacement: "",
		},
		// Two+ new spaces, replace with a space
		{
			target: "[  ]{2,}",
			replacement: " ",
		},
		// Two+ new lines, replace with two newlines
		{
			target: "(?:h*\n){2,}",
			replacement: "\n\n",
		},
		// Remove (most of) external links
		{
			target: "\\[(http|https)://([^\\s]+)",
			replacement: "",
		},
	];

	/**
	 * Add the button to the page side tool list
	 */
	const addButton = function (ui) {
		const editSideTool = document.querySelector("#ca-edit-side-tool");
		const sideToolBar = document.querySelector(".page-side-tools");

		const button = ui.button({
			classes: ["page-side-tool", "byte-checker-button"],
			text: "BC",
			events: {
				click: main,
			},
			child: ui.div({
				classes: ["wds-tooltip", "is-right", "byte-checker-tooltip"],
				text: "Check page size",
			}),
		});

		if (editSideTool) {
			editSideTool.insertAdjacentElement("afterend", button);
		} else {
			sideToolBar.append(button);
		}
	};

	const sendToast = function (type, message) {
		switch (type) {
			case "success":
				dev.toasts.success(message, { timeout: 10000 });
				break;
			case "warning":
				dev.toasts.warning(message, { timeout: 10000 });
				break;
			case "error":
				dev.toasts.error(message, { timeout: 10000 });
				break;
		}
	};

	const getPage = function () {
		return new mw.Api().get({
			action: "parse",
			prop: "wikitext",
			page: mw.config.get("wgPageName"),
			format: "json",
			formatversion: "latest",
		});
	};

	const checkPage = function (data) {
		const pageContents = data.parse.wikitext;

		// wrap in nowiki tags to prevent the source page from being categorized
		// <nowiki>
		if (pageContents.includes("[[Category:Genre (Comic)]]")) {
			sendToast("success", "This page is a comic and should not be deleted.");
		}
		// </nowiki>

		return pageContents;
	};

	const filterPage = function (pageContents) {
		// put the page in an object to get around no `let`
		const page = { contents: pageContents };

		regularExpressions.forEach(function (i) {
			const regexp = new RegExp(i.target, "gim");

			page.contents = page.contents.replaceAll(regexp, i.replacement);
		});

		return page.contents;
	};

	const main = function () {
		getPage()
			.then(checkPage)
			.then(filterPage)
			.then(function (pageContents) {
				const size = new TextEncoder().encode(pageContents).length;

				if (size < 2500) {
					sendToast("warning", "Page is smaller than 2500 bytes: " + size);
				} else {
					sendToast("success", "Page is larger than 2500 bytes: " + size);
				}
			})
			.catch(function (error) {
				console.error(error);
				sendToast("error", "Something went wrong. Check console for details.");
			});
	};

	mw.hook("doru.ui").add(function (ui) {
		addButton(ui);
	});
});