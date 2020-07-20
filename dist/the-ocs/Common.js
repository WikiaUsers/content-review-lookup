/* Any JavaScript here will be loaded for all users on every page load. */
/* This code was put together with various snippets of code from [[w:c:dev]], or the Dev Wiki! */
//Remember that most of these must be inserted BEFORE the 'importArticles' code.
/* Auto-Refresh */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
/* Admin Dashboard: Javascript Shortcut */
var editURL;
$("#AdminDashboardGeneral .control-section.wiki .controls").prepend("<a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "'><div style='border: 1px solid #CCCCCC; width: 50px; height: 50px; border-radius: 7px; font-family: Arial; cursor: pointer; position: absolute; left: 430px; top: 58px;'><img src='https://vignette.wikia.nocookie.net/lllioliol/images/d/d0/JS.png/revision/latest?cb=20150727171949' width='36' height='22' style='position:absolute; top: 13px; left: 8px;'><p style='position:absolute; top: 50px; font-size: 11px;'><a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "' style='text-decoration:none;' onmouseover='text-decoration: underline;'>JavaScript</a></p></div></a>");
 
/* WikiaPage Digital Clock */
window.DisplayClockJS = '%2I:%2M:%2S %p : %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
/* Reveal Anon IP */
// License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
window.RevealAnonIP = {
    permissions : ['bureaucrat', 'sysop', 'rollback', 'threadmoderator', 'helper', 'util', 'staff']
};
 
/* FastDeletes */
window.fdButtons = [];
    window.fdButtons[window.fdButtons.length] = {
        summary:'Vandalism',
        label:'V',
    };
    window.fdButtons[window.fdButtons.length] = {
        summary:'Spam',
        label:'S',
    };
    window.fdButtons[window.fdButtons.length] = {
        summary:'Housekeeping',
        label:'HK',
    };
 
/* QuickDeletes */
window.category = 'Candidates for deletion';
window.reason = 'Marked for deletion';
 
/* Automatic Block Message */
var MessageBlock = {
    title : 'Block.',
    message : 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck : true
};
 
/* Wikia User Tags */
window.UserTagsJS = {
    modules: {},
    tags: {
        founder: {u:'Founder'},
        bureaucrat: {u:'Bureaucrat'},
        sysop: {u:'Admin'},
        threadmoderator: {u:'Moderator'},
        chatmoderator: {u:'Chat Moderator'},
        rollback: {u:'Rollback'},
        coder: {u:'Wiki Coder'},
    }
};


/* User Tag Filters */
UserTagsJS.modules.metafilter = {
        'inactive': ['sysop', 'bureaucrat'], 
        'sysop': ['bureaucrat', 'founder'],
        'chatmoderator': ['sysop', ['patroller', 'rollback']],
};

/* {{USERNAME}} Template */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});