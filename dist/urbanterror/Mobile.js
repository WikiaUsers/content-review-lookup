	//Settings for: Reveal Anon IP
	window.RevealAnonIP = {
		permissions : ['rollback', 'sysop', 'bureaucrat'] //Only show to these groups
	};
	//Import the code from dev.wikia.com
	importArticles({
		type: "script",
		articles: [
'u:dev:RevealAnonIP/code.js' //http://dev.wikia.com/wiki/RevealAnonIP
		]
	});
/* END Reveal Anon IP, Highlight user groups, UserTags */
console.info("Loaded MediaWiki:Mobile.js version 2");