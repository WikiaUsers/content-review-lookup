///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIND DUPLICATE IMAGES
// Original code courtesy of "pcj" of WoWPedia.org.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function findDupImages (gf) {
    var indicator = window.DupImageListIndicator || 'https://images.wikia.nocookie.net/__cb20100617113123/dev/images/6/6a/Snake_throbber.gif',
        dil = [],
        output = "",
        url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json",
        dupCount,
        x;

    if (!($('#dupImagesProgress').length)) {
        $("#DupImagesRefresh").after('<span id="dupImagesProgress" title="Progress"></span>');
    }

    if (gf) {
        url += "&gaifrom=" + gf;
    }

    $.getJSON(url, function (data) {
        if (data.query) {
            var pages = data.query.pages;
            for (var pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) === -1 && pages[pageID].title.indexOf("File::") === -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/wiki/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/wiki/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n";
                }
            }
            $('#mw-dupimages').append(output);
            // $('#dupImagesProgress').hide();

            if (data["query-continue"]) {
                setTimeout("findDupImages('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 1000);
                $('#dupImagesProgress').html('<img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="Loading" />&nbsp;Loading...');
            } else {
                console.log('DupImageList: Done!');
                $('#dupImagesProgress').empty().text('Done!');
                console.log('dups: ' + pages[pageID].duplicatefiles[x]);
            }
        }
    });
}

$(function () {
    $('#mw-dupimagelist').prepend('<a id="DupImagesRefresh" class="wikia-button noprint" style="padding:0 8px 0 5px; margin-right:10px;">Refresh list</a>');
    $('body').on('click', '#DupImagesRefresh', function () {
        console.log('DupImageList: Clearing list...');
        $('#mw-dupimages').empty();
        $('#dupImagesProgress').empty();
        console.log('DupImageList: Calling findDupImages() again...');
        findDupImages();
    });
});

$(function () {
    if ($('#mw-dupimages').length) {
        console.log('DupImageList: Calling findDupImages()...');
        findDupImages();
    }
});