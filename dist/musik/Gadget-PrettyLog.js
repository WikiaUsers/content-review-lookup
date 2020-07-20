// <source lang="javascript">

/*
   PrettyLog - reformat log pages. If the log contains file uploads, add small thumbnails of the
   files. If the GalleryDetails gadget is also activated, make sure that it adds its sidebar link.

   Authors: [[User:Lupo]], January 2009; [[User:Ilmari Karonen]], April 2010
   License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0)
*/

if (wgCanonicalSpecialPageName == "Log") addOnloadHook(function () {
    var maxThumbWidth = 70;
    var maxThumbHeight = 70;

    var content = document.getElementById("bodyContent") ||       // monobook & vector skins
                  document.getElementById("mw_contentholder") ||  // modern skin
                  document.getElementById("article");             // classic skins
    if (!content) return;

    var list = content.getElementsByTagName("ul")[0];
    if (!list) return;
    list.className = 'mw-search-results';

    // That's all that's needed for the pretty layout!  All code below is for the image thumbnails.

    // Get list of upload log entries, abort early if there are none.
    var uploads = getElementsByClassName(list, "li", "mw-logline-upload");
    if (!uploads || uploads.length == 0) return;

    // Get an XMLHTTPRequest object; if we can't get one, give up now.
    var ajax = sajax_init_object();
    if (!ajax) return;

    // Find image links within each upload entry.  This could have some false positives, but that
    // shouldn't matter much since the API query will just ignore them.  
    var imageLocations = {};
    for (var i = 0; i < uploads.length; i++) {
        var links = uploads[i].getElementsByTagName("a");
        for (var j = 0; j < links.length; j++) {
            var title = links[j].title;
            for (var e = links[j]; title && e && e != uploads[i]; e = e.parentNode) {
                // Skip any redlinks, links in log summaries and links to uploaders' user/talk/contribs/etc. pages
                if ( /(^|\s)(new|comment|mw-userlink|mw-usertoollinks|searchResultImage)(\s|$)/.test(e.className) ) title = null;
            }
            if (title) {
                if (!imageLocations[title]) imageLocations[title] = [];
                imageLocations[title].push(uploads[i]);
            }                 
        }
    }
    uploads = links = null;  // we don't need these NodeLists anymore

    // Build array of unique image titles.
    var images = [];
    for (var title in imageLocations) {
        if (typeof (title) == 'string') images.push(title);
    }
    if (images.length == 0) return;

    // Callback function to show the thumbnails:
    window.prettyLogAddThumbnails = function (result) {

        if (result.error || !result.query || !result.query.pages)
            return alert("Unexpected API result:\n" + result);
 
        // hopefully we don't get any normalization, but just in case...
        if (result.query.normalized) {
            var norm = result.query.normalized;
            for (var i = 0; i < norm.length; i++) {
                imageLocations[norm[i].to] = imageLocations[norm[i].from];
            }
        }

        // now loop over the result and insert thumbs
        var pages = result.query.pages;
        for (var id in pages) {
            var title = pages[id].title;
            if (!title) continue;  // should not happen

            if (pages[id].imagerepository && pages[id].imagerepository == "shared")
                continue;  // don't show thumbnails for remote images (could happen if an image shadowing a Commons image is uploaded locally and deleted)
 
            var info = pages[id].imageinfo;
            if (!info || !info.length) continue;  // can happen if the image has been deleted, or if it wasn't an image at all
            info = info[0];
            if (!info.thumburl || !info.thumbwidth || !info.thumbheight || !info.descriptionurl) continue;  // can happen e.g. for audio files
 
            // if the returned thumb is too large for some reason, scale it proportionately so it fits
            if (info.thumbheight > maxThumbHeight) {
                info.thumbwidth *= maxThumbHeight / info.thumbheight;
                info.thumbheight = maxThumbHeight;
            }
            if (info.thumbwidth > maxThumbWidth) {
                info.thumbheight *= maxThumbWidth / info.thumbwidth;
                info.thumbwidth = maxThumbWidth;
            }

            // if the URL is local, strip the hostname prefix (avoids needless external link icons on some browsers)
            if (info.descriptionurl.indexOf(wgServer + "/") === 0)
                info.descriptionurl = info.descriptionurl.substring(wgServer.length);

            var loglines = imageLocations[title];
            if (!loglines) continue;  // should not happen

            for (var i = 0; i < loglines.length; i++) {
                // safety check: don't process the same line twice
                if (/^table$/i.test(loglines[i].firstChild.tagName)) continue;

                // create image and link elements for the thumbnail
                var img = document.createElement("img");
                img.src = info.thumburl;
                img.width = Math.round(info.thumbwidth);
                img.height = Math.round(info.thumbheight);

                var link = document.createElement("a");
                link.href = info.descriptionurl;
                link.title = title;
                link.className = "image";
                link.appendChild(img);

                // transform the contents of this logline into a table
                var tbl = document.createElement("table");
                tbl.className = "searchResultImage";
                var tr = tbl.insertRow(-1);
                tr.setAttribute("valign", "top");

                var td = document.createElement("td");
                td.width = maxThumbWidth + 10;
                td.setAttribute("align", "center");
                td.appendChild(link);
                tr.appendChild(td);

                td = document.createElement("td");
                while (loglines[i].firstChild) td.appendChild(loglines[i].firstChild);
                tr.appendChild(td);

                loglines[i].appendChild (tbl);
            }
        }

        // if [[MediaWiki:Gadget-GalleryDetails.js]] is enabled but inactive, rerun it now that we have some images
        if (typeof (GalleryDetailsLoader) != 'undefined' && !document.getElementById('t-gallerydetails') && GalleryDetailsLoader.initialized) {
            GalleryDetailsLoader.initialize();        
        }
    };

    // Make the queries in batches, to avoid tripping API limits.
    var queryPrefix = wgScriptPath + "/api.php?format=json&callback=prettyLogAddThumbnails&action=query&maxage=3600&smaxage=3600&prop=imageinfo&iiprop=url&iiurlwidth="+maxThumbWidth+"&iiurlheight="+maxThumbHeight+"&titles=";
    var batchSize = 50;
    for (var i = 0; i < images.length; i += batchSize) {
        importScriptURI(queryPrefix + encodeURIComponent(images.slice(i,i+batchSize).join("|")));
    }
});

//</source>