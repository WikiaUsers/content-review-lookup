/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Pokémon'] = [
	{'Pokémon Negro y Blanco|Quinta generación': [
		'Lista de Pokémon de la quinta generación|Nuevos Pokémon'
	]},
	{'Clasificación de los Pokémon|Pokédex': [
		{'Lista de Pokémon': [
				'Lista de Pokémon de la primera generación|Primera generación',
				'Lista de Pokémon de la segunda generación|Segunda generación',
				'Lista de Pokémon de la tercera generación|Tercera generación',
				'Lista de Pokémon de la cuarta generación|Cuarta generación',
				'Lista de Pokémon de la quinta generación|Quinta generación'
			]},
		'Lista de movimientos',
		'Lista de habilidades',
		'Clasificación de los Pokémon|Todas las listas'
	]},
	{'Anime': [
		{'Lista de episodios|Episodios': [
			{'Serie original': [
				'Lista de episodios de la primera temporada|Temporada 1',
				'Lista de episodios de la segunda temporada|Temporada 2',
				'Lista de episodios de la tercera temporada|Temporada 3',
				'Lista de episodios de la cuarta temporada|Temporada 4',
				'Lista de episodios de la quinta temporada|Temporada 5'
			]},
			{'Serie Advanced Generation': [
				'Lista de episodios de la sexta temporada|Temporada 6',
				'Lista de episodios de la séptima temporada|Temporada 7',
				'Lista de episodios de la octava temporada|Temporada 8',
				'Lista de episodios de la novena temporada|Temporada 9'
			]},
			{'Serie Diamante y Perla': [
				'Lista de episodios de la décima temporada|Temporada 10',
				'Lista de episodios de la undécima temporada|Temporada 11',
				'Lista de episodios de la duodécima temporada|Temporada 12',
				'Lista de episodios de la decimotercera temporada|Temporada 13'
			]},
			{'Serie Negro y Blanco': [
				'Lista de episodios de la decimocuarta temporada|Temporada 14',
				'Lista de episodios de la decimoquinta temporada|Temporada 15'
			]},
			'Lista de episodios|Ver todas'
		]},
		{'Categoría:Personajes del anime|Personajes': [
			'Ash Ketchum',
			'Cilan/Millo',
			'Iris (anime)|Iris',
			'Brock (anime)|Brock',
			'Dawn/Maya',
			'Categoría:Personajes del anime|Ver más'
		]}
	]},
	'Películas',
	{'Manga': [
		{'Pocket Monsters Special|Pokémon Special': [
			'Lista de capítulos de Pokémon Special|Capítulos',
			'Categoría:Personajes del manga Pocket Monsters Special|Personajes'
		]},
		'Magical Pokémon Journey',
		'Pokémon Gold & Silver: The Golden Boys|Pokémon Golden Boys',
		'Pokémon Getto da ze!',
		'Pocket Monsters Zensho|Pokémon Zensho',
		'Pokémon Ranger-The Comic-',
		'Manga|Más...'
	]},
        {'TCG': [
		'Carta de Pokémon',
		'Carta de energía',
		'Carta de entrenador',
		'Lista de ataques del TCG|Ataques',
		'Lista de expansiones del Pokémon Trading Card Game|Expansiones',
		'Pokémon Trading Card Game|Más...'
	]},
	{'Categoría:Mecánica|Mecánica': [
		'Tipos elementales',
		'Movimiento|Movimientos',
		'Habilidad|Habilidades',
		{'Objeto|Objetos': [
			'Lista de objetos',
			'Objeto clave',
			'Objeto oculto',
			'Objetos que pueden llevar los Pokémon salvajes|En Pokémon salvajes',
			'Objetos que se pueden obtener utilizando golpe roca|Utilizando golpe roca'
		]},
		'Crianza Pokémon|Crianza',
		'Combate Pokémon|Combates',
		'Evolución',
		'Amistad',
		'Estadísticas'
	]},
	{'Juegos de Pokémon|Videojuegos': [
		'Pokémon Negro y Blanco 2|Negro y Blanco 2',
		'PokéPark 2: Un mundo de ilusiones|PokéPark 2',
		'Super Pokémon Rumble',
		'Pokémon Negro y Blanco|Negro y Blanco',
		'Pokémon Oro HeartGold y Plata SoulSilver|Oro HeartGold y Plata SoulSilver',
		'Pokémon Ranger: Trazos de Luz|Trazos de Luz',
		'Pokémon Mundo Misterioso: Exploradores del Cielo|Exploradores del Cielo'
	]},
	'Categoría:Guías y manuales|Guías y manuales'
];

wgSidebar['Cómo colaborar'] = [
	'WikiDex:Ayuda|Introducción',
	'Ayuda:Guía de edición|Guía de edición',
	'Ayuda:Crear un artículo|Crear un artículo',
	'WikiDex:Zona de pruebas|Zona de pruebas',
	{'WikiDex:Proyectos|Proyectos': [
		'WikiDex:Proyecto Anime|Anime',
		'WikiDex:Proyecto Ciudades y Pueblos|Ciudades y Pueblos',
		'WikiDex:Proyecto Juegos de Pokémon|Juegos de Pokémon',
		'WikiDex:Proyecto Manga|Manga',
		'WikiDex:Proyecto Movimientos|Movimientos',
		'WikiDex:Proyecto Objetos|Objetos',
		'WikiDex:Proyecto Pokédex|Pokédex',
		'WikiDex:Proyecto Rutas|Rutas',
		'WikiDex:Proyecto MM|Mundo Misterioso',
		'WikiDex:Proyecto TCG|TCG'
	]}
];

wgSidebar['Comunidad'] = [
	'WikiDex:Sabías (archivo)|¿Sabías que...?',
	'WikiDex:Artículos destacados|Artículo Destacado',
	'WikiDex:Pokémon Destacado|Pokémon Destacado',
	'WikiDex:Administradores|Administradores',
	'Foro:Index|Foro',
	'WikiDex:Limitación general de responsabilidad|Información legal'
];

wgSidebar['help'] = [
	'Ayuda:Guía de edición|Guía de edición',
	'Ayuda:Crear un artículo|Crear un artículo',
	'Ayuda:Lista de plantillas|Lista de plantillas',
	'Ayuda:Imágenes|Imágenes',
	'Ayuda:Navegar por WikiDex|Navegar por WikiDex'
];

/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/