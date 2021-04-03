dil = new Array();
function findDupImages(gf) {
	output = "";
	url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
	if (gf) url += "&gaifrom=" + gf;
	$.getJSON(url,function (data) {
		if (data.query) {
			pages = data.query.pages;
			for (pageID in pages) {
				dils = ","+dil.join();
				if (dils.indexOf(","+pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
					output += "<h3><a href='/" + pages[pageID].title + "'>"+pages[pageID].title+"</a></h3>\n<ul>\n";
					for (x=0;x<pages[pageID].duplicatefiles.length;x++) {
						output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:"+pages[pageID].duplicatefiles[x].name+"</a></li>\n";
						dil.push("File:"+pages[pageID].duplicatefiles[x].name.replace(/_/g," "));
					}
					output += "</ul>\n\n"
				}
			}
			$("#mw-dupimages").append(output);
			if (data["query-continue"]) setTimeout("findDupImages('"+data["query-continue"].allimages.gaifrom+"');",5000);
		}
	});
}
$(function() {
	if ($("#mw-dupimages").length) findDupImages();
});