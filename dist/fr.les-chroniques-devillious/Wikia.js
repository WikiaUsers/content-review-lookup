// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

importScriptPage('Content/SpoilersToggle.js', 'scripts');

window.DisplayClockJS = '%2I:%2M:%2S %p %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w, %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m, %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

// END Additional UserRights Icons in profile mastheads
importScriptPage('AjaxRC/code.js', 'dev');