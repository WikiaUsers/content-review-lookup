/* Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de la página. */
importArticles({
	type: 'script',
	articles: [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
		'w:c:clashofclans:MediaWiki:Common.js/ModeToggle.js',
		'w:c:clashofclans:MediaWiki:Common.js/GemCalculators.js',
		'MediaWiki:Common.js/HeroSkins.js',
        'MediaWiki:Common.js/Usernames.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:BadgeGenerator.js',
        'MediaWiki:Protection.js',
        'MediaWiki:Common.js/AvailableBuildings.js',
        'MediaWiki:Common.js/GoldPass.js',
        'MediaWiki:Common.js/Toggle.js',
        'MediaWiki:Custom-TZclock.js'
		]
});

//JS added by TheWikiaEditMachine that adds JS from his test wikia tht would also work here for the new home page.
importScriptPage('MediaWiki:Common.js','twem');