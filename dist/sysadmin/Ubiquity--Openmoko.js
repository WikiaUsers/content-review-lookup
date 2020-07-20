 CmdUtils.CreateCommand({
 	names: ["openmoko", "omwi"],
 	locale: "en-US",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	license: "MPL, GPLv2+, GFDL and/or (at your option) LGPLv2+",
 	homepage: "http://wiki.openmoko.org",
 	icon: "http://wiki.openmoko.org/favicon.ico",
 	preview: function(pblock, directObject) {
 		var searchText = jQuery.trim(directObject.text);
 		if(searchText.length < 1) {
 			pblock.innerHTML = "Searches the Openmoko Wiki";
 			return;
 		}
 		var previewTemplate = "Searches the Openmoko Wiki for <b>${query}</b>";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var searchText = jQuery.trim(args.object.text);
 		var url = "http://wiki.openmoko.org/wiki/";
 		
 		if(searchText=="") url += "Main_Page";
 		else url += "Special:Search?search="+searchText+"&go=1";
 		
 		Utils.openUrlInBrowser(url);
 	}
 });