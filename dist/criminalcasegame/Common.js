var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
	buttonSize: '20px'
};
importScriptPage('SocialIcons/code.js','dev');

/****************
 * Auto Refresh *
 ***************/
window.ajaxPages = [
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';