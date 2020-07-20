// **********************************************
// User Tags - https://dev.wikia.com/wiki/UserTags
// **********************************************
  
window.UserTagsJS = {
	modules: {},
	tags: {
		duck: { u: 'King Ducky', order:  100 }, 
		 demu: { u: 'Ruler Of The Demus', order: 101 },
	}
};
UserTagsJS.modules.custom = {
	'How To Train Your Deathsong': ['duck'],
	'DeathSongLover': ['demu']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];