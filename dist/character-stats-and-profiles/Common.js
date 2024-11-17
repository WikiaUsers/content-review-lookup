//==========================================================
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
//==========================================================
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

//==============
// Ajax Rename
//==============
window.AjaxRename = {
	doKeyBind: false,
	
    renameReasons: {
        "Convention": "Renamed to match naming conventions in use on the wiki",
        "Formatting": "Reformatting name",
        "Namespace": "Incorrect namespace",
        "Capitalization": "Fixing capitalization",
    },
    
	check: {
		watch: false,
	},
};

if (/sysop|content-moderator|rollback/.test(mw.config.get('wgUserGroups').join())) {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:AjaxRename/code.js',
		]
	});	
}

//======================================================
// Mass Delete scripts.
// Intended primarily for quality control purges.
//======================================================
window.batchDeleteDelay = 2000; // 2 second interval
window.nukeDeleteReason = "Enacting quality control purge";
window.nukeDelay = 2000; // 2 second interval

//==========================
// AjaxRC Configuration 
//==========================
window.ajaxPages = new Array(
    "Blog:Recent posts",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:Images",
    "Special:ListFiles",
    "Special:Log",
    "Special:Contributions",
    "Special:RecentChangesLinked",
    "Special:RecentChanges"
);
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

//=========================
// Spoiler Alert Code
//=========================
window.SpoilerAlertJS = {
    question: "This area contains potential spoilers. Are you sure want to read it?",
    yes: 'Yes',
    no: 'No',
    fadeDelay: 625
};
 
//==============================================================
// Sorts content on Special:WhatLinksHere alphabetically
//==============================================================
(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') 
        return;

    var sortedList,
        list = $('#mw-whatlinkshere-list');

    sortedList = list.children('li').sort(function (a, b) {
        return (
            $(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')
        ) ? 1: -1;
    });

    list.children('li').remove();
    list.append(sortedList);
})($);
 
//=================================================================
// Adds links to Special:WhatLinksHere to edit pages linked on it.
// By OneTwoThreeFall
//=================================================================
if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

//=================================================================
// Adds a button to clear Deletion reasons
// Also by OneTwoThreeFall
//=================================================================
$(function() {
	if (mw.config.get('wgAction') === 'delete') {
	    $('#wpReason').after(' <span id="wpClearReason" class="button" id="clearDeleteReason">\u232b</span>');
	    $('#wpClearReason').click(function() {
	        $('#wpReason').val('').focus();
	    });
	}
});