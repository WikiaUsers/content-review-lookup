ItemContainer = '#item-grid'
itemFilters = {
        'name': 'search',
	'abwehr': [ '- Abwehr -',
		['Lebensregeneration','Lebensregeneration'],
		['Leben','Leben'],
		['Magieresistenz','Magieresistenz'],
		['R�stung','R�stung'],
	],
        'angriff': [ '- Angriff -',
		['Angriffsschaden','Angriffsschaden'],
		['Angriffstempo','Angriffstempo'],
		['Kritische Treffer','Kritische Treffer'],
		['Lebensraub','Lebensraub'],
	],
        'magie': [ '- Magie -',
		['Abklingzeitverringerung','Abklingzeitverringerung'],
		['F�higkeitsst�rke','F�higkeitsst�rke'],
		['Mana','Mana'],
		['Manaregeneration','Manaregeneration'],
	],
        'verschiedenes': [ '- Verschiedenes -',
		['Augen','Augen'],
                ['Goldertrag','Goldertrag'],
		['Schmuck','Schmuck'],
		['Tr�nke','Tr�nke'],
	],
        'bewegung': [ '- Bewegung -',
		['Anderes','Anderes'],
		['Schuhe','Schuhe'],
	],
}

importArticles({
    type: "script",
    articles: [
        "MediaWiki:ItemGrid.js/ItemFixer.js",
        "MediaWiki:ItemGrid.js/ItemFiltering.js"
    ]
});