 CmdUtils.CreateCommand({
 	names: ["yubnub","yn"],
 	locale: "en-US",
 	arguments: [ {role: "object", nountype: noun_arb_text, label: "search term"}],
 	homepage: "http://yubnub.org",
 	icon: "http://yubnub.org/favicon.ico",
 	preview: function(pblock, directObject) {
 		searchText = jQuery.trim(directObject.text);
 		if(searchText.length < 1) {
 			pblock.innerHTML = "Lookup on YubNub";
 			return;
 		}
 
 		var previewTemplate = "Looks up <b>${query}</b> on YubNub";
 		var previewData = {query: searchText};
 		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);
 	},
 	execute: function(args) {
 		var url = "http://yubnub.org/parser/parse?command={QUERY}"
 		var query = args.object.text;
 		var urlString = url.replace("{QUERY}", query);
 		Utils.openUrlInBrowser(urlString);
 	}
 });