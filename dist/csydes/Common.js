// 10:13, 21 May 2023 (UTC) <nowiki>

// AUTO-REFRESH RECENT CHANGES
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges"];
// END AUTO-REFRESH

// CREATE THE 'DEV' NAMESPACE IF IT DOESN'T EXIST ALREADY
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
		assistant: 'Assistant',
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
    'assistant',
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
if (['assistant','bot','content-moderator','sysop'].indexOf(mw.config.get('wgUserGroups')) >= 0) {
    massRenameDelay = 1000;
    massRenameSummary = 'automatic';
    importScriptPage('MediaWiki:MassRename/code.js', 'dev');

    massProtectDelay = 500;
    massProtectSummary = 'automatic';
    importScriptPage('MediaWiki:MassProtect/code.js', 'dev');
}
// END MASS RENAME AND MASS PROTECT DELAY

// INITIALISE THE GLOBAL OBJECTS USED WITHOUT OVERWRITING ANY ALREADY THERE
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['AdminDashboard_JS-Button'] = window.dev.i18n.overrides['AdminDashboard_JS-Button'] || {}

// CUSTOMISE THE DESIRED MESSAGES
window.dev.i18n.overrides['AdminDashboard_JS-Button']['text'] = 'Desktop JavaScript';
window.dev.i18n.overrides['AdminDashboard_JS-Button']['tooltip'] = 'Customise your wiki with local JavaScript.';
// END ADMINDASHBOARD JS-BUTTON OVERRIDES

// PREVENT USERS WITHOUT ROLLBACK RIGHTS FROM USING THE ROLLBACK SCRIPT
window.RollbackWikiDisable = true;
// END ROLLBACK SCRIPT PREVENTION

$(function BlogLink() {
 if (!$('.create-blog').length) {
        return;
    }
//CREATE AN 'ADD A BLOG POST' LINK TO THE PROJECT:ADMINISTRATORS' DASHBOARD PAGE
var $elem = $('.create-blog'),
    $html = $elem.html();

$elem.html(
  $('<a>', {
    href: mw.util.getUrl('User_blog:' + mw.config.get('wgUserName'), { createNewPost: 1 }),
    text: mw.html.escape($html) || "Add a Blog Post",
    title: "General",
  })
);
});
// END 'ADD A BLOG POST' LINK

// CREATE A 'MY ACTIVITY' LINK TO THE ACCOUNT NAVIGATION LINKS PAGE
mw.loader.using(['mediawiki.util'], function() {
    var $elem = $('.my-activity');
    if (!$elem.length) return;

    $elem.html(function() {
        return $('<a>', {
            href: mw.util.getUrl('Special:UserProfileActivity/' + mw.config.get('wgUserName')),
            text: $(this).text().replace('$1', mw.config.get('wgUserName')) || "My Activity",
    title: "Special:UserProfileActivity/" + mw.config.get('wgUserName'),    
        })
    });
});
// END 'MY ACTIVITY' LINK

// REPLACE ASTERISKS WITH ARABIC STARS FOR USER RIGHTS PAGE
$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Userrights') {
        return;
    }

    $('label.mw-userrights-groupcheckbox:contains(*)').each(function () {
        $(this).text(function (_, txt) {
            return txt.replace('*', '٭');
        });
    });
});
// END REPLACE ASTERISKS WITH ARABIC STARS

// REPLACE NUMBER SIGNS WITH MUSIC SHARP SIGNS FOR USER RIGHTS PAGE
$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Userrights') {
        return;
    }

    $('label.mw-userrights-groupcheckbox:contains(#)').each(function () {
        $(this).text(function (_, txt) {
            return txt.replace('#', '♯');
        });
    });
});
// END REPLACE NUMBER SIGNS WITH MUSIC SHARP SIGNS </nowiki>