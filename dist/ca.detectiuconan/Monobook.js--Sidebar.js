/* Any JavaScript here will be loaded for users using the MonoBook skin */
/*<pre>
Avis: Aix� �s codi JavaScript. Si hi ha algun tipus d'error de sintaxis en aquests codi el men� del sidebar deixar� de funcionar. Assegurat que no trenques res.
Cada element de wgSidebar es el text (despr�s del |) de l'element en [[MediaWiki:Sidebar]]
Els men�s son llistes [ ... ]. Un string ' ... ' es un element. Un objecte { ... } es un element amb un submen�, on la clau (abans dels : ) �s el propi element i el valor (despr�s dels : ) �s una llista [ ... ] amb el contingut del submen�.
Par a cada element, ser� tant l'enlla� com el text. Si es posa una barra | el que hi hagi abans ser� l'enlla� i el de despr�s el text.
*/
wgSidebar['El Detectiu Conan'] = [
	{'El Detectiu Conan (anime)|Anime': [
		'Llista d'episodis|Llista d'episodis'
	]},
	{'El Detectiu Conan (manga)|Manga': [
		'Llista de cap�tols|Llista de cap�tols'
	]},
	'Pel�l�cules i especials|Pel�l�cules i especials',
	'M�sica|M�sica',
];

/* Trucada al codi per inicialitzar aix� */
$(MonobookSidebar.init);

/*</pre>*/