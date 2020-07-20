/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */


/* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
gridContainer = '#character-grid'
gridFilters = {
	'name': 'search',
	'attribute': [ '- atrybut -',
		['siła','Siła'],
		['inteligencja','Inteligencja'],
		['zręczność','Zręczność'],
	],
	'role': [ '- rola -',
		['Carry','Carry'],
		['Disabler','Disabler'],
		['Durable','Durable'],
		['Escape','Escape'],
		['Initiator','Initiator'],
		['Jungler','Jungler'],
		['Lane Support','Lane Support'],
		['Nuker','Nuker'],
		['Pusher','Pusher'],
		['Support','Support'],
	],
	'type': [ '- typ ataku -',
		['Wręcz','walczący wręcz'],
		['Zasięgowy','walczący z dystansu'],
	],
}


importArticles({
    type: "script",
    articles: [
        "w:c:pl.leagueoflegends:MediaWiki:Gridfiltering.js",
        "w:c:pl.leagueoflegends:MediaWiki:Dynamicgrid.js",
    ]
});