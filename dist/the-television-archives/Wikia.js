/* Any JavaScript here will be loaded for all users on every page load. */

// AjaxRC
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page when new edits occur.';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Log",
    "Special:NewFiles",
    "Special:Videos",
    "Special:Contributions"
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
        'u:dev:MediaWiki:MassEdit/code.js',
    ]
});

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
            $('#wpUploadDescription').val('');
        });
    }
}