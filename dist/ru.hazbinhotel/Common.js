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
 	{page: 'Template:DiscordRail', maxAge: 0},
 	{page: 'Template:VKRail', maxAge: 0},
 	{page: 'Template:NewPagesModule', maxAge: 0},
 	{page: 'Template:CodeRail', maxAge: 0},
 	{page: 'Template:SliderRail', maxAge: 0},
 	{page: 'Template:VideoRail', maxAge: 0},
 	{page: 'Template:CommunityCorner', maxAge: 0},
 	{page: 'Template:WikiRail', maxAge: 0}
 ];