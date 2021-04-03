/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

//DiscussionsActivity config
window.rdaSubtitleLinksPages = {
    RecentChanges: {
        links: ['DiscussionsRC'],
    },
    DiscussionsRC: {
        title: 'Recent Discussions changes',
        links: ['RecentChanges'],
    },
    WikiActivity: {
        links: ['WikiActivity/watchlist', 'RecentChanges', 'DiscussionsActivity', 'DiscussionsRC']
    },
    DiscussionsActivity: {
        links: ['WikiActivity']
    },
    'WikiActivity/watchlist': {
        links: ['WikiActivity', 'RecentChanges', 'DiscussionsActivity', 'DiscussionsRC']
    }
};

//LockForums config
window.LockForums = {
    expiryDays: 14,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
};

//Add username alt attribute to masthead profile so highlight css works there
$(function () {
    if (!mw.config.get('profileUserName')) {
        return;
    }
    if ($('#userProfileApp .user-identity-avatar__image').length) {
    	$('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    	return;
    }
    var interval = setInterval(function () {
        if (!$('#userProfileApp .user-identity-avatar__image').length) {
            return;
        }
        clearInterval(interval);
        $('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    }, 100);
});