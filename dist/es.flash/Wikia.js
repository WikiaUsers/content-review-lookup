var WikiaNotificationMessage = "Bienvenidos a <a href='/wiki/TheFlash Enciclopedia'>Flash Wiki</a>,la enciclopedia del velocista escarlata";
importArticles({
	type: 'script',
	articles: [
	        'u:dev:WikiaNotification/code.js',
		]
});
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage ('FloatingToc/code.js', 'dev');
importScriptPage('BackToTopArrow/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 2 };