///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIND DUPLICATE IMAGES
// Code courtesy of "pcj" of WoWPedia.org.
// Modified: Vuh
///////////////////////////////////////////////////////////////////////////////////////////////////////////
dil = new Array();
 
function findDupImages(gf) {
	indicator = stylepath + '/common/progress-wheel.gif';
	output = "";
	url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
	if (!($('#dupImagesProgress').length)) {
		$("#mw-dupimages").prepend('<span style="float: right;" id="dupImagesProgress" title="W toku..."><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="W toku..." /></span>');
	}
	if ( gf ) {
		url += "&gaifrom=" + gf;
	}
	$.getJSON( url, function (data) {
		if ( data.query ) {
			pages = data.query.pages;
			for ( pageID in pages ) {
				dils = "," + dil.join();
				if ( dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles ) {
					output += "<h3><a href='/wiki/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
					for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
						output += "<li><a href='/wiki/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
						dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
					}
					output += "</ul>\n\n"
				}
			}
			$("#mw-dupimages").append(output);
			if (data["query-continue"]) setTimeout("findDupImages('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 5000);
		}
	} );
}
$( function () {
	if ( $("#mw-dupimages").length ) {
		findDupImages();
	} else {
		$('#dupImagesProgress').hide();
	}
} );