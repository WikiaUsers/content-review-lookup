/* Any JavaScript here will be loaded for all users on every page load. */
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
	    Crat: 'Bureaucrat',
	    Metal: 'Samurai'
	}
};
	
//Custom
UserTagsJS.modules.custom = {
	'Matty the Samurai': ['Crat', 'Metal'],
	'ProjectPredacon': ['Crat']
};