 CmdUtils.CreateCommand({
 	names: ["lucky","ifl"],
 	locale: "en-US",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	license: "MPL, GPLv2+, GFDL, LGPLv2+",
 	homepage: "http://google.com",
 	icon: "http://www.google.com/favicon.ico",
 	preview: function(pblock, directObject) {
 		var searchText = jQuery.trim(directObject.text);
 		var searchDesc = "Searches with Google's \"I'm Feeling Lucky\" functionality";
 		if(searchText.length < 1) {
 			pblock.innerHTML = searchDesc;
 			return;
 		}
 		var previewTemplate = searchDesc+" for <b>${query}</b>";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var url = "http://google.com/search?q={QUERY}&btnI=lucky"
 		var urlString = url.replace("{QUERY}", args.object.text);
 		Utils.openUrlInBrowser(urlString);
 	}
 });