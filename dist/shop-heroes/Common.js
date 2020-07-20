/* Any JavaScript here will be loaded for all users on every page load. */
/*******************************************************************************
	Import from Articles, using mw-loader-script.
	These will be loaded asynchronously after this script.

	References:
	* [[w:MediaWiki:Interwiki_map]]
	* [[w:Help:Including_additional_CSS_and_JS/technical]]
*******************************************************************************/
// Wikia-specific
importArticles(
// Javascripts
	{type: 'script', articles: [
	// Custom User Tags [[w:c:dev:UserTags]]
		"u:dev:UserTags/code.js"
	,// Purge Button [[w:c:dev:PurgeButton]]
		"u:dev:PurgeButton/code.js"
	]}
,// Stylesheets
	{type: 'style', articles: [
	// Google-Fonts: Ubuntu        {font-family: 'Ubuntu', sans-serif;}
		"https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,700italic,500italic,400italic,300,300italic&subset=latin,latin-ext"
	,// Google-Fonts:Open Sans:    {font-family: 'Open Sans', sans-serif;}
		"https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic&subset=latin,latin-ext"
	,// Local Wiki: Dynamic-fonts
		"MediaWiki:Webfonts.css"
	,// Local Wiki: Typeset definitions
		"MediaWiki:Wiki Typeset.css"
	,// Local Wiki: CSS for {{Ambox}}
		"Template:Ambox/code.css"
	,// Local Wiki: default CSS for Portable Infoboxes
		"MediaWiki:Portable Infobox.css"
	,// Local Wiki: CSS for {{Infobox item}}
		"MediaWiki:Portable Infobox item.css"
	]}
);
/*
	NON-Wikia-specific
	Use:
	* importScriptURI(url);
	* importStylesheetURI(url,media);
*/
// Navigation popups [[Wikipedia:Wikipedia:Tools/Navigation popups]]
importScriptURI('https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-popups.js&action=raw&ctype=text/javascript');
importStylesheetURI('https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-navpop.css&action=raw&ctype=text/css');
/*******************************************************************************
	Configurations for scripts imported
*******************************************************************************/
/***************************************
	Custom User Tags
	References:
	* [[w:c:dev:UserTags]]
	* [/Special:AllMessages?prefix=user-identity-box-group- Special:AllMessages]
***************************************/
window.UserTagsJS = {
	modules: {},
	tags: {
		csshelper: { u: 'CSS', order: 10, title:'Cascading-Style-Sheet Coder' }
		,jshelper: { u: 'JS', order: 11, title:'Javascript Coder' }
		,templatehelper: { u: '{{T}}', order: 12, link:'Special:Templates', title:'Template Coder' }
		,imageuploader: { u: 'IMG', order: 13, title:'Graphics Provider' }
		,chatmoderator: { u: 'Mod(C)', order: 5, link:'Special:ListUsers/chatmoderator', title:'Chat Mod' }
		,threadmoderator: { u: 'Mod(F)', order: 4, link:'Special:ListUsers/threadmoderator', title:'Forum Mod' }
		,poweruser: { u: 'P', order: 3, link:'w:Thread:810670', title:'Poweruser' }
		,sysop: {order: 2, link:'Special:ListAdmins', title:'Wiki Admin' }
		,bureaucrat: { order: 1, link:'Special:ListUsers/bureaucrat', title:'Wiki Admin Coordinator' }
		,founder: { order: -1/0 }
		,retired: { u: 'Retired', order: 50, title:'Retired Staff' }
	}
};
// Add custom tags to users
UserTagsJS.modules.custom = {
	'©TriMoon™': ['csshelper', 'jshelper', 'templatehelper']
	,'Els236': ['templatehelper', 'imageuploader']
	,'Gentimouton': ['templatehelper']
	,'Kdevine': ['imageuploader']
	,'Elbonians': ['retired']
};
// Remove tags from users
UserTagsJS.modules.userfilter = {
	'Wender1': ['founder']
};
// Add MediaWiki groups to the internal group list
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'poweruser', 'threadmoderator', 'chatmoderator'];
// Define inactive days
UserTagsJS.modules.inactive = 30;

/***************************************
	Purge Button
***************************************/
PurgeButtonText = 'Purge';

/***************************************
	Navigation popups
***************************************/
popupStructure = 'menus';
popupDelay = 1.5;
popupPreviewKillTemplates = false;