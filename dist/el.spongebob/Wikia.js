/* AjaxRC */
window.ajaxPages = [
    "Blog:Recent_posts",
    "Special:Chat",
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Images",
    "Special:Contributions"
];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/spongebob/images/a/a1/LoadingCube.gif/revision/latest?cb=20170605072613&path-prefix=el';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';

$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_");
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});

// Add template to the upload page
// @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val('[[Κατηγορία:Εικόνες]]');
        });
    }
}

if ($("body").hasClass('ns-118')) {
    $('.wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/spongebob/images/f/f7/SBWIKIGR_SBMovieLogo.png/revision/latest?cb=20170610134353&path-prefix=el');
    $('.wordmark img').parent().attr('href', 'http://el.spongebob.wikia.com/wiki/Μπομπ_ο_Σφουγγαράκης:_Η_Ταινία');
}

/*---------------------- SpoilerAlert ----------------------------------*/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
/*--------------------------------------------------------------------*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WebArchive.js',
    ]
});