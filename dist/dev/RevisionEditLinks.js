(function($, mw){
	"use strict";
	var config = mw.config.get([
		'wgUserLanguage',
		'wgPageName',
		'wgAction'
	]);
	window.RevisionEditLinks = window.RevisionEditLinks || {};
	function putEditLinks(){
		new mw.Api().get({
			"action": "query",
			"format": "json",
			"meta": "allmessages",
			"ammessages": "editold|pipe-separator",
			"amlang": config.wgUserLanguage
		}).then (function(data){
			RevisionEditLinks.editlabel = RevisionEditLinks.editlabel==null?data.query.allmessages[0]["*"]:RevisionEditLinks.editlabel;
			var separator = data.query.allmessages[1]["*"];
			$(".mw-contributions-list > li").queue(function(){
				var pgname = $(this).find('.mw-contributions-title').length?$(this).find('.mw-contributions-title').text():config.wgPageName,
				revid = $(this).attr('data-mw-revid');
				if ($(this).find('.mw-changeslist-links:not(.mw-usertoollinks, .mw-history-histlinks)').length)$(this).find('.mw-changeslist-links:not(.mw-usertoollinks, .mw-history-histlinks)').append('<span>' + (config.wgAction == "history"?'<span class="mw-history-undo">':'') + '<a href="' + mw.util.getUrl(pgname) + '?action=edit&amp;oldid=' + revid + '"' + (config.wgAction == "history"?'':' class="mw-changeslist-edit"') + ' title="' + pgname + '">' + editlabel + '</a>' + (config.wgAction = "history"?'</span>':'') + '</span>');
				else $(this).find($(this).find('.mw-tag-markers').length?'.mw-tag-markers':'.comment').before('<span class="mw-changeslist-links"><span><span class="mw-history-edit"><a href="' + mw.util.getUrl(pgname) + '?action=edit&amp;oldid=' + revid + '" title="' + pgname + '">' + editlabel + '</a></span></span></span> ');
			});
			$("table.mw-changeslist-line").queue(function(){
				var pgname = $(this).find('.mw-changeslist-title').text(),
				revid = $(this).attr('data-mw-revid');
				if (revid == null) {
					$(this).find("tr.mw-changeslist-line").queue(function(){
						var revid = $(this).attr('data-mw-revid');
						$(this).find(".mw-changeslist-diff").after(separator + '<span><a href="' + mw.util.getUrl(pgname) + '?action=edit&amp;oldid=' + revid + '" class="mw-changeslist-edit" title="' + pgname + '">' + editlabel + '</a></span>')
					})
				} else {
					$(this).find('.mw-changeslist-links:not(.mw-usertoollinks, .mw-history-histlinks)').append('<span><a href="' + mw.util.getUrl(pgname) + '?action=edit&amp;oldid=' + revid + '" class="mw-changeslist-edit" title="' + pgname + '">' + editlabel + '</a></span>');
				}
			});
		});
	}
	mw.loader.using([
        'mediawiki.api',
        'mediawiki.user',
        'mediawiki.util',
        'mediawiki.notification'
    ], putEditLinks);
})(jQuery, mediaWiki);