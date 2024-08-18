window.forgeScripts = {
	getPageContents: function getPageContents() {
		new mw.Api()
			.get({
				format: "json",
				formatversion: 2,
				action: "parse",
				prop: "wikitext",
				page: mw.config.get("wgPageName"),
			})
			.then((data) => console.log(data.parse.wikitext))
			.catch((error) => console.error(error));
	},
};