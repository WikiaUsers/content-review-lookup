/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity'];

/* Customized JavaScripts */
importArticles({
    type: 'script',
    articles: [
        'u:animanga:MediaWiki:Anime-Common.js'
    ]
});

$(function() {
    if ((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value === '') {
        document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
    }
});

window.PurgeButtonText = 'Purge';

/* Customized User Tag (Inactive) */
window.InactiveUsers = {months: 2};

/* RailWAM */
window.railWAM = {
    logPage: 'Project:WAM Log'
};

/* Template:Username */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});