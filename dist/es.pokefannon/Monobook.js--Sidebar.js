/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Pok�mon'] = [
	{'Pok�mon Negro y Blanco|Quinta generaci�n': [
		'Lista de Pok�mon de la quinta generaci�n|Nuevos Pok�mon'
	]},
	{'Clasificaci�n de los Pok�mon|Pok�dex': [
		{'Lista de Pok�mon': [
				'Lista de Pok�mon de la primera generaci�n|Primera generaci�n',
				'Lista de Pok�mon de la segunda generaci�n|Segunda generaci�n',
				'Lista de Pok�mon de la tercera generaci�n|Tercera generaci�n',
				'Lista de Pok�mon de la cuarta generaci�n|Cuarta generaci�n',
				'Lista de Pok�mon de la quinta generaci�n|Quinta generaci�n'
			]},
		'Lista de movimientos',
		'Lista de habilidades',
		'Clasificaci�n de los Pok�mon|Todas las listas'
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
				'Lista de episodios de la s�ptima temporada|Temporada 7',
				'Lista de episodios de la octava temporada|Temporada 8',
				'Lista de episodios de la novena temporada|Temporada 9'
			]},
			{'Serie Diamante y Perla': [
				'Lista de episodios de la d�cima temporada|Temporada 10',
				'Lista de episodios de la und�cima temporada|Temporada 11',
				'Lista de episodios de la duod�cima temporada|Temporada 12',
				'Lista de episodios de la decimotercera temporada|Temporada 13'
			]},
			{'Serie Negro y Blanco': [
				'Lista de episodios de la decimocuarta temporada|Temporada 14',
				'Lista de episodios de la decimoquinta temporada|Temporada 15'
			]},
			'Lista de episodios|Ver todas'
		]},
		{'Categor�a:Personajes del anime|Personajes': [
			'Ash Ketchum',
			'Cilan/Millo',
			'Iris (anime)|Iris',
			'Brock (anime)|Brock',
			'Dawn/Maya',
			'Categor�a:Personajes del anime|Ver m�s'
		]}
	]},
	'Pel�culas',
	{'Manga': [
		{'Pocket Monsters Special|Pok�mon Special': [
			'Lista de cap�tulos de Pok�mon Special|Cap�tulos',
			'Categor�a:Personajes del manga Pocket Monsters Special|Personajes'
		]},
		'Magical Pok�mon Journey',
		'Pok�mon Gold & Silver: The Golden Boys|Pok�mon Golden Boys',
		'Pok�mon Getto da ze!',
		'Pocket Monsters Zensho|Pok�mon Zensho',
		'Pok�mon Ranger-The Comic-',
		'Manga|M�s...'
	]},
        {'TCG': [
		'Carta de Pok�mon',
		'Carta de energ�a',
		'Carta de entrenador',
		'Lista de ataques del TCG|Ataques',
		'Lista de expansiones del Pok�mon Trading Card Game|Expansiones',
		'Pok�mon Trading Card Game|M�s...'
	]},
	{'Categor�a:Mec�nica|Mec�nica': [
		'Tipos elementales',
		'Movimiento|Movimientos',
		'Habilidad|Habilidades',
		{'Objeto|Objetos': [
			'Lista de objetos',
			'Objeto clave',
			'Objeto oculto',
			'Objetos que pueden llevar los Pok�mon salvajes|En Pok�mon salvajes',
			'Objetos que se pueden obtener utilizando golpe roca|Utilizando golpe roca'
		]},
		'Crianza Pok�mon|Crianza',
		'Combate Pok�mon|Combates',
		'Evoluci�n',
		'Amistad',
		'Estad�sticas'
	]},
	{'Juegos de Pok�mon|Videojuegos': [
		'Pok�mon Negro y Blanco 2|Negro y Blanco 2',
		'Pok�Park 2: Un mundo de ilusiones|Pok�Park 2',
		'Super Pok�mon Rumble',
		'Pok�mon Negro y Blanco|Negro y Blanco',
		'Pok�mon Oro HeartGold y Plata SoulSilver|Oro HeartGold y Plata SoulSilver',
		'Pok�mon Ranger: Trazos de Luz|Trazos de Luz',
		'Pok�mon Mundo Misterioso: Exploradores del Cielo|Exploradores del Cielo'
	]},
	'Categor�a:Gu�as y manuales|Gu�as y manuales'
];

wgSidebar['C�mo colaborar'] = [
	'WikiDex:Ayuda|Introducci�n',
	'Ayuda:Gu�a de edici�n|Gu�a de edici�n',
	'Ayuda:Crear un art�culo|Crear un art�culo',
	'WikiDex:Zona de pruebas|Zona de pruebas',
	{'WikiDex:Proyectos|Proyectos': [
		'WikiDex:Proyecto Anime|Anime',
		'WikiDex:Proyecto Ciudades y Pueblos|Ciudades y Pueblos',
		'WikiDex:Proyecto Juegos de Pok�mon|Juegos de Pok�mon',
		'WikiDex:Proyecto Manga|Manga',
		'WikiDex:Proyecto Movimientos|Movimientos',
		'WikiDex:Proyecto Objetos|Objetos',
		'WikiDex:Proyecto Pok�dex|Pok�dex',
		'WikiDex:Proyecto Rutas|Rutas',
		'WikiDex:Proyecto MM|Mundo Misterioso',
		'WikiDex:Proyecto TCG|TCG'
	]}
];

wgSidebar['Comunidad'] = [
	'WikiDex:Sab�as (archivo)|�Sab�as que...?',
	'WikiDex:Art�culos destacados|Art�culo Destacado',
	'WikiDex:Pok�mon Destacado|Pok�mon Destacado',
	'WikiDex:Administradores|Administradores',
	'Foro:Index|Foro',
	'WikiDex:Limitaci�n general de responsabilidad|Informaci�n legal'
];

wgSidebar['help'] = [
	'Ayuda:Gu�a de edici�n|Gu�a de edici�n',
	'Ayuda:Crear un art�culo|Crear un art�culo',
	'Ayuda:Lista de plantillas|Lista de plantillas',
	'Ayuda:Im�genes|Im�genes',
	'Ayuda:Navegar por WikiDex|Navegar por WikiDex'
];

/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/