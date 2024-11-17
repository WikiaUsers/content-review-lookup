/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */


/* UTCClock */
@importArticles({
	type: 'script',
	articles: [        
		'u:dev:MediaWiki:UTCClock/code.js',    
		]
});
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)',
    location: 'header',
    offset: -300
};