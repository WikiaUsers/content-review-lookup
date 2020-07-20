 CmdUtils.CreateCommand({
 	names: ["debian-package","deb"],
 	locale: "en-US",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	license: "MPL, GPLv2+, GFDL, LGPLv2+",
 	icon: "http://packages.debian.org/favicon.ico",
 	preview: function(pblock, directObject) {
 		var searchText = jQuery.trim(directObject.text);
 		var searchDesc = "Searches Debian packages";
 		if(searchText.length < 1) {
 			pblock.innerHTML = searchDesc;
 			return;
 		}
 		var previewTemplate = searchDesc+" for <b>${query}</b>";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var url = "http://packages.debian.org/search?keywords={QUERY}"
 		var urlString = url.replace("{QUERY}", args.object.text);
 		Utils.openUrlInBrowser(urlString);
 	}
 });