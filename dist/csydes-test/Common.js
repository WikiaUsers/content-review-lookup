// 03:48, 28 September 2021 (UTC) <nowiki>

// AUTO-REFRESH RECENT CHANGES
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges"];
// END AUTO-REFRESH

// CREATE THE "DEV" NAMESPACE IF IT DOESN'T EXIST ALREADY
window.dev = window.dev || {};
 
// CREATE THE SUB-NAMESPACE FOR THIS ADDON AND SET SOME OPTIONS
window.dev.editSummaries = {
    select: 'Template:Stdsummaries'
};
// END STANDARD EDIT SUMMARIES

// USER TAGS
window.UserTagsJS = {
	modules: {},
	tags: {
		threadmoderator: 'Discussion Moderator',
		'content-moderator': 'Content Moderator'
	}
};

UserTagsJS.modules.inactive = 62;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'rollback',
    'threadmoderator',
    'content-moderator',
    'global-discussions-moderator'
];
// END USER TAGS

// *************************************************
// PAGETITLE REWRITE
//
// REWRITES THE PAGE'S TITLE, USED BY TEMPLATE:TITLE
// *************************************************
$(function() {
    var inter = setInterval(function() {
        if (!$('h1[itemprop=\"name\"]').length) return;

        clearInterval(inter);
        var newTitle = $("span.newPageTitle").find(':not(big, small, center, h1, h2, h3, h4, h5, h6, b, i, u, s, span, div)').remove().end().html();
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,h1[itemprop=\"name\"],.resizable-container .page-header__title").html(mw.html.escape(newTitle));
        $("#user_masthead_head h2").html(mw.html.escape(newTitle + "<small id='user_masthead_since'>" + edits + "</small>"));
    });
});

$(function changeTitle(){
    if (!$('span.newPageTitle').length) {
        return;
    }
    var title = $('span.newPageTitle').find(':not(big, small, center, h1, h2, h3, h4, h5, h6, b, i, u, s, span, div)').remove().end().html();
    $('h1.page-header__title').html(mw.html.escape(title));
});
// END PAGETITLE

// MASS RENAME AND MASS PROTECT DELAY
if (['bot','content-moderator','sysop'].indexOf(mw.config.get('wgUserGroups')) >= 0) {
    massRenameDelay = 1000;
    massRenameSummary = 'automatic';
    importScriptPage('MediaWiki:MassRename/code.js', 'dev');

    massProtectDelay = 500;
    massProtectSummary = 'automatic';
    importScriptPage('MediaWiki:MassProtect/code.js', 'dev');
}
// END MASS RENAME AND MASS PROTECT DELAY