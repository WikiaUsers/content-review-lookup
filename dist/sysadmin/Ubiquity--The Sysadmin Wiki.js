 CmdUtils.CreateCommand({
 	names: ["sysadmin","saw"],
 	locale: "en-US",
 	license: "MPL, GPLv2+, GFDL and/or (at your option) LGPLv2+",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	homepage: "http://sysadmin.wikia.com",
 	icon: "https://images.wikia.nocookie.net/sysadmin/images/6/64/Favicon.ico",
 	preview: function(pblock, directObject) {
 		var searchText = jQuery.trim(directObject.text);
 		if(searchText.length < 1) {
 			pblock.innerHTML = "Searches The Sysadmin Wiki";
 			return;
 		}
 		var previewTemplate = "Searches The Sysadmin Wiki for <b>${query}</b>";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var searchText = jQuery.trim(args.object.text);
 		var url = "http://sysadmin.wikia.com/wiki/";
 		
 		if(searchText=="") url += "Main_Page";
 		else url += "Special:Search?search="+searchText+"&go=1";
 		
 		Utils.openUrlInBrowser(url);
 	}
 });