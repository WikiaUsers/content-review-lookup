/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    $('.insertusername').text(mw.config.get('wgUserName'));
});

window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: {u: 'Major Contributor'},
		founder: {u: 'Wiki Creator' },
		chat_moderator: {u: 'Foxfire Principal' },
		discussions_moderator: {u: 'Member of the Nobility' },
		featured_user: {u: 'Featured User' }
	}
};

window.disableUsernameReplace = true;

AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];

window.railWAM = {
    logPage:"Project:WAM Log"
};