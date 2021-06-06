// Importy skryptów
importArticles({
	type: 'script',
	articles: [
		'u:pl.tes:MediaWiki:License.js',
		'u:dev:MediaWiki:MassCategorization/code.js',
		'u:dev:MediaWiki:MassEdit/code.js',
		'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
		'u:dev:MediaWiki:AjaxBatchDelete/code.2.js',
		'u:dev:MediaWiki:DiscordModule/code.js',
		'u:dev:MediaWiki:MultipleActivity.js',
	]
});

// Licencje
var options = {
	'{{fairuse}}': 'Screeny (zrzuty ekranu) z filmów, serialu lub gier',
	'{{fairuse-inne}}': 'Grafiki filmowe DreamWorks (promocyjne, plakaty, concepty, okładki, zdjęcia zabawek)',
	'{{ilustracje}}': 'Ilustracje do powieści Cressidy Cowell oraz ich okładki',
	'{{copyright}}': 'Fan Art',
	'{{copyright-inne}}': 'plik własnego autorstwa, np. zdjęcia (nie dotyczy Fan Artów)',
	'{{Brak licencji}}': 'Prawa autorskie nieznane',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Screenshot-Web}}': 'Zdjęcie strony internetowej (screenshot)',
	'{{cc-by-3.0}}': 'Licencja CC BY-SA 3.0 (ikonki tylko techniczne!)'
};