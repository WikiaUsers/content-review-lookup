/* Any JavaScript here will be loaded for all users on every page load. */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: { link:'Project:Wiki Staff' },
		sysop: { link:'Project:Wiki Staff' },
		rollback: { link:'Project:Wiki Staff' },
        chatmoderator: { link:'Project:Wiki Staff' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'rollback',
    'chatmoderator',
    'bot'
];
// UserTagsJS.modules.metafilter = { ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];