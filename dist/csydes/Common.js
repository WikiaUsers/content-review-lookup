// 15:12, 5 September 2021 (UTC) <nowiki>

// AUTO-REFRESH RECENT CHANGES
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges"];
// END AUTO-REFRESH

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
    select: 'Template:Stdsummaries'
};

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

if (['assistant','bot','content-moderator','sysop'].indexOf(mw.config.get('wgUserGroups')) >= 0) {
    massRenameDelay = 1000;
    massRenameSummary = 'automatic';
    importScriptPage('MediaWiki:MassRename/code.js', 'dev');

    massProtectDelay = 500;
    massProtectSummary = 'automatic';
    importScriptPage('MediaWiki:MassProtect/code.js', 'dev');
}

// Initialise the global objects used without overwriting any already there
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['AdminDashboard_JS-Button'] = window.dev.i18n.overrides['AdminDashboard_JS-Button'] || {}

// Customise the desired messages
window.dev.i18n.overrides['AdminDashboard_JS-Button']['tooltip'] = 'Customise your wiki with local JavaScript.';

// Prevent users without rollback rights from using the rollback script
window.RollbackWikiDisable = true;

// Create an "Add a Blog Post" link to the Project:Administrators' dashboard page
var $elem = $('.create-blog'),
    $html = $elem.html();

$elem.html(
  $('<a>', {
    href: mw.util.getUrl('User_blog:' + mw.config.get('wgUserName'), { createNewPost: 1 }),
    text: mw.html.escape($html) || "Add a Blog Post",
    title: "General",
  })
);