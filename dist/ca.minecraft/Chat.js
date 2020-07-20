/* "Ping" als moderadors del xat que etiguin connectats */
/*
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );

/* Fa fora del xat a l'usuari indicat. Nomes funciona pels Mods */
/*
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );
*/

CustomLinks = {
	es: "http://es.minecraft.wikia.com",
	en: "http://minecraft.wikia.com",
        esp: "http://es.minecraft-esp.wikia.com",
	viquipedia: "http://ca.wikipedia.org",
        cawikia: "http://ca.wikia.com",
        preventDefault: true
};
importArticles({
	type: "script",
	articles: [
		"u:dev:ChatInterwikiLinks/code.js"
	]
});

importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('ChatRefresh/code.js', 'dev');