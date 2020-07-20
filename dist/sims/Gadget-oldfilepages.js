// <nowiki>
// BEGIN MW GADGET
// *********

$(function restoreFilePages() {
	if (mw.config.get("wgNamespaceNumber") != 6 || !$("ul.tabs").length)
		return;
	if (skin === "oasis") {
		var api = new mw.Api();
		$("ul.tabs").remove();
		$(".tabBody").css({display: "block"});
		var newListing = $("<div id='file-listings'><h2>Pages that use this file</h2><ul id='file-listing-list'></ul></div>");
		$("section.page-listings").remove();
		$("div[data-tab-body='history']").after(newListing);
		api.get({
			action: "query",
			list: "imageusage",
			iutitle: mw.config.get("wgPageName"),
			format: "json",
			iulimit: 100
		}).done(function (data) {
			var pages = data.query.imageusage;
			for (var i = 0; i < pages.length; i++) {
				var page = pages[i];
				$("#file-listing-list").append("<li class='file-listing-list-item'><a href='/wiki/" + encodeURIComponent(page.title) + "'>" + page.title + "</a></li>");
			}
			if (data.hasOwnProperty("query-continue")) {
				$("#file-listing-list").prepend("<li class='file-listing-list-item'>More than 100 pages use this file. <a href='/wiki/Special:WhatLinksHere/" + encodeURIComponent(page.title) + "'>See all pages that use this file.</a></li>");
			}
		});
		return;
	} else {
		return;
	}
});

//END MW GADGET
//</nowiki>