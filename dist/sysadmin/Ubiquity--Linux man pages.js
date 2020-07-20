 CmdUtils.CreateCommand({
 	names: ["man"],
 	locale: "en-US",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	license: "MPL, GPLv2+, GFDL and/or (at your option) LGPLv2+",
 	icon: "http://kernel.org/favicon.ico",
 	preview: function(pblock, directObject) {
 		var searchText = jQuery.trim(directObject.text);
 		var searchDesc = "Searches Linux man pages";
 		if(searchText.length < 1) {
 			pblock.innerHTML = searchDesc;
 			return;
 		}
 		var previewTemplate = searchDesc+" for <b>${query}</b>";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var url = "http://www.linuxmanpages.com/search.php?term="+encodeURIComponent(args.object.text)+"&section=-1&submitted=1"
 		Utils.openUrlInBrowser(url);
 	}
 });