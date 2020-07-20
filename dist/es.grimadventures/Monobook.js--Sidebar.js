/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Personajes'] = [
	{'Las Macabras Aventuras de Billy y Mandy|Billy y Mandy': [
		'Lista de personajes (Billy y Mandy)|Lista de personajes',
		'Billy',
		'Mandy',
		'Calavera',
		'Categoría:Personajes de Billy y Mandy|más...'
	]},
	{'Demonio Con Carne': [
	        'Lista de personajes (Demonio Con Carne)|Lista de personajes',
		'Héctor Con Carne',
		'Doctora Espanto',
		'General Cicatriz',
		'Categoría:Personajes de Demonio Con Carne|más...'
	]},
	{'Super Puño': [
		'Hoss Delgado',
                'Irwin',
                'Jeff',
                'Fred Fredburger',
		'Categoría:Personajes de Super Puño|más...'
	]},
];

wgSidebar['Series'] = [
	'Demonio Con Carne y Compañía',
	{'Las Macabras Aventuras de Billy y Mandy|Billy y Mandy': [
		'Primera temporada (Billy y Mandy)|1ª Temporada',
		'Segunda temporada (Billy y Mandy)|2ª Temporada',
		'Tercera temporada|3ª Temporada',
		'Cuarta temporada|4ª Temporada',
		'Quinta temporada|5ª Temporada',
                'Sexta temporada|6ª Temporada',
                'Séptima temporada|7ª Temporada'
	]},
	{'Demonio Con Carne': [
	        'Primera temporada (Demonio Con Carne)|1ª Temporada',
		'Segunda temporada (Demonio Con Carne)|2ª Temporada'
	]},
        'Underfist: The Series',
	{'Categoría:Películas|Películas': [
		'La Gran Aventura de Billy y Mandy con el Coco',
                'Billy y Mandy: La Ira de la Araña Reina|La Ira de la Araña Reina',
                'Super Puño'
	]},
	{'Las Macabras Aventuras de Billy y Mandy (cortos)|Cortos': [
		"Billy's Birthday Shorties",
		'Irwin Hearts Mandy',
		'Otros cortos'
	]},
	{'Categoría:Cómics|Cómics': [
		'Las Macabras Aventuras de Billy y Mandy (cómics)|Billy y Mandy',
                'Super Secret Crisis War!'
	]},
	{'Categoría:Videojuegos|Videojuegos': [
		'The Grim Adventures of Billy & Mandy',
                'Cartoon Network: Explosión de Puñetazos|Explosión de Puñetazos',
                'Cartoon Network Universe: FusionFall|FusionFall'
	]},
];

/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/