///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIND DUPLICATE IMAGES
// Code courtesy of "pcj" of WoWPedia.org.
// Modified: Vuh
///////////////////////////////////////////////////////////////////////////////////////////////////////////
if(wgNamespaceNumber === 4) {
	function findDupImages(gf, title, output, dil) {
		var indicator = 'https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427020309&path-prefix=pl',
			url = '/api.php?format=json&action=query&prop=duplicatefiles&dflimit=500&generator=allimages&gailimit=500';
		dil = dil || {};

		if(!($('#dupImagesProgress').length)) {
			$('#mw-dupimages').prepend('<div id="dupImagesProgress" style="height: 0; text-align: center;"><img src="' + indicator + '" style="border: 0 none;" alt="In progress..." /></div>');
		}

		if(gf) {
			if(gf.indexOf('|') > -1) {
				url += '&dfcontinue=' + encodeURIComponent(gf);
				gf = gf.split('|')[0];
			}
			url += '&gaifrom=' + encodeURIComponent(gf);
		}

		$.getJSON(url, function (data) {
			if(data.query) {
				var pages = data.query.pages;
				for(var pageID in pages) {
					if(!dil[pages[pageID].title] && pages[pageID].duplicatefiles) {
						if(title !== pages[pageID].title) {
							if(output) {
								$('#mw-dupimages').append(output + '</ul>');
							}
							title = pages[pageID].title;
							output = '<h3><a href="/wiki/' + encodeURI(title.replace(/ /g, '_')) + '">' + title + '</a></h3><ul>';
						}
						for(var x = 0; x < pages[pageID].duplicatefiles.length; x++) {
							output += '<li><a href="/wiki/File:' + encodeURI(pages[pageID].duplicatefiles[x].name) + '">File:' + pages[pageID].duplicatefiles[x].name.replace(/_/g, ' ') + '</a></li>';
							dil['File:' + pages[pageID].duplicatefiles[x].name.replace(/_/g, ' ')] = true;
						}
					}
				}

				if(data['query-continue']) {
					if(data['query-continue'].duplicatefiles) {
						findDupImages(data['query-continue'].duplicatefiles.dfcontinue, title, output, dil);
					} else {
						findDupImages(data['query-continue'].allimages.gaifrom, title, output, dil);
					}
				} else {
					$('#dupImagesProgress').empty();
					if(output) {
						$('#mw-dupimages').append(output + '</ul>');
					}
				}
			}
		});
	}

	$(function () {
		if($('#mw-dupimages').length) {
			findDupImages();
		}
	});
}