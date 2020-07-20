 CmdUtils.CreateCommand({
 	names: ["wiktionary", "wid"],
 	locale: "en-US",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	license: "MPL, GPLv2+, GFDL and/or (at your option) LGPLv2+",
 	icon: "http://en.wiktionary.org/favicon.ico",
 	preview: function(pblock, directObject) {
 		var searchText = jQuery.trim(directObject.text);
 		if(searchText.length < 1) {
 			pblock.innerHTML = "Searches Wiktionary";
 			return;
 		}
 		var previewTemplate = "Searches Wiktionary for <b>${query}</b>";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var searchText = jQuery.trim(args.object.text);
 		var url = "http://en.wiktionary.org/wiki/";
 		
 		if(searchText=="") url += "Wiktionary:Main_Page";
 		else url += "Special:Search?search="+searchText+"&go=1";
 		
 		Utils.openUrlInBrowser(url);
 	}
 });