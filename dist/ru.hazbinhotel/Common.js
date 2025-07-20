/* Импорт JS-страниц Fixes.js, Scroll.js, RefTooltips.js */
importArticles({
	    type: 'script',
	    articles: [
	        "u:ru.wikicorporate:MediaWiki:Fixes.js",
	        "u:ru.wikicorporate:MediaWiki:Scroll.js",
	        "u:ru.wikicorporate:MediaWiki:RefTooltips.js"
	    ]
	});

/* Конфигурация для dev:AddRailModule */
 window.AddRailModule = [
 	{page: 'Template:CommunityRail', maxAge: 0},
 	{page: 'Template:LinksRail', maxAge: 0},
 	{page: 'Template:NewPagesModule', maxAge: 0},
 	{page: 'Template:VideoRail', maxAge: 0},
 ];