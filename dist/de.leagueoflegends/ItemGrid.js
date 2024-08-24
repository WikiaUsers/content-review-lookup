ItemContainer = '#item-grid'
itemFilters = {
        'name': 'search',
	'abwehr': [ '- Abwehr -',
		['Lebensregeneration','Lebensregeneration'],
		['Leben','Leben'],
		['Magieresistenz','Magieresistenz'],
		['Rüstung','Rüstung'],
	],
        'angriff': [ '- Angriff -',
		['Angriffsschaden','Angriffsschaden'],
		['Angriffstempo','Angriffstempo'],
		['Kritische Treffer','Kritische Treffer'],
		['Lebensraub','Lebensraub'],
	],
        'magie': [ '- Magie -',
		['Abklingzeitverringerung','Abklingzeitverringerung'],
		['Fähigkeitsstärke','Fähigkeitsstärke'],
		['Mana','Mana'],
		['Manaregeneration','Manaregeneration'],
	],
        'verschiedenes': [ '- Verschiedenes -',
		['Augen','Augen'],
                ['Goldertrag','Goldertrag'],
		['Schmuck','Schmuck'],
		['Tränke','Tränke'],
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