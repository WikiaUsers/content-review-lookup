/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */


/* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
gridContainer = '#gods-grid'
gridFilters = {
	'name': 'search',
	'pantheon': [ '- panteon -',
		['nordycki','Nordycki'],
                ['rzymski','Rzymski'],
                ['egipski','Egipski'],
                ['hinduski','Hinduski'],
                ['chiński','Chiński'],
                ['majski','Majski'],
		['grecki','Grecki'],
	],
	'roles': [ '- rola -',
		['zabójca','Zabójca'],
		['wojownik','Wojownik'],
		['strażnik','Strażnik'],
		['mag','Mag'],
		['łowca','Łowca'],
	],
	'type': [ '- typ ataku -',
		['wręcz','Walczący wręcz'],
		['dystansowy','Walczący z dystansu'],
	],
	'damage': [ '- obrażenia -',
		['fizyczne','Fizyczne'],
		['magiczne','Magiczne'],
	],
}


importArticles({
    type: "script",
    articles: [
        "w:c:pl.leagueoflegends:MediaWiki:Gadget-gridfiltering.js",
        "w:c:pl.leagueoflegends:MediaWiki:Dynamicgrid.js",
        "MediaWiki:Ability-tabber.js",
    ]
});

/* Podpisy zamiast prefiksów */
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Smie Wiki</h2>');
});

/* Wygląd plików OGG */
var oggPlayerButtonOnly = false;