/* Any JavaScript here will be loaded for users using the MonoBook skin */
/*<pre>
Avis: Això és codi JavaScript. Si hi ha algun tipus d'error de sintaxis en aquests codi el menú del sidebar deixarà de funcionar. Assegurat que no trenques res.
Cada element de wgSidebar es el text (després del |) de l'element en [[MediaWiki:Sidebar]]
Els menús son llistes [ ... ]. Un string ' ... ' es un element. Un objecte { ... } es un element amb un submenú, on la clau (abans dels : ) és el propi element i el valor (després dels : ) és una llista [ ... ] amb el contingut del submenú.
Par a cada element, serà tant l'enllaç com el text. Si es posa una barra | el que hi hagi abans serà l'enllaç i el de després el text.
*/
wgSidebar['El Detectiu Conan'] = [
	{'El Detectiu Conan (anime)|Anime': [
		'Llista d'episodis|Llista d'episodis'
	]},
	{'El Detectiu Conan (manga)|Manga': [
		'Llista de capítols|Llista de capítols'
	]},
	'Pel·lícules i especials|Pel·lícules i especials',
	'Música|Música',
];

/* Trucada al codi per inicialitzar això */
$(MonobookSidebar.init);

/*</pre>*/