/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Contenidos'] = [
	{'Categoría:Personajes|Personajes': [
		'Categoría:Personajes de videojuegos|Personajes de videojuegos',
		'Categoría:Personajes del manga|Personajes del manga',
		'Categoría:Personajes del anime|Personajes del anime',
		'Categoría:Personajes de películas|Personajes de películas',
	]},
	{'Categoría:Aparatos|Aparatos': [
		'Categoría:Aparatos de Doraemon|Aparatos de Doraemon',
		'Categoría:Aparatos de Dorami|Aparatos de Dorami',
		'Categoría:Aparatos de Dora El Kid|Aparatos de Dora El Kid',
		'Categoría:Aparatos de Wang Dora|Aparatos de Wang Dora',
		'Categoría:Aparatos de Dora Med III|Aparatos de Dora Med III',
		'Categoría:Aparatos de Dora Nichov|Aparatos de Dora Nichov',
                'Categoría:Aparatos de El Matadora|Aparatos de El Matadora',
                'Categoría:Aparatos de Dora Rinho|Aparatos de Dora Rinho'
	]},
        {'Categoría:Videojuegos|Videojuegos': [
		'Doraemon (Arcadia 2001)',
                'Doraemon (Game Boy)',
                'Doraemon 2: Leyenda del Planeta Animal',
                'Doraemon: El contraataque de Giga Zombie',
                'Doraemon: Nobita y la Tierra de las Hadas',
                'Doraemon 2: La gran aventura de Nobita en la Tierra de los Juguetes',
                'Doraemon 3: Nobita y la Joya del Tiempo',
                'Doraemon 4: Nobita y el Reino de la Luna',
                'Doraemon Kart',
                'Doraemon Kart 2',
                'Doraemon: Nobita y los Tres Espíritus Mágicos de Piedra',
                'Doraemon 2: Nobita y el Templo de la Luz',
                'Doraemon 3: ¡Ciudad SOS de Nobita!',
                'Doraemon: Nobita y la gran aventura de la máquina del tiempo',
                'Doraemon: ¡Todos a jugar! Mini-Dorando',
                'Doraemon: Juego de tablero',
                'Doraemon: El dinosaurio de Nobita 2006 DS',
                'Doraemon: La nueva gran aventura de Nobita en el infierno DS',
                'Doraemon Wii: Herramienta secreta del Rey del Torneo',
                'Doraemon: Nobita y la leyenda del Gigante Verde DS',
                'Aprendiendo a leer Doragana',
	]},
       {'Categoría:Manga|Manga': [
		'Doraemon (manga)|Doraemon',
		'Los Doraemons',
		'Dorabase'
	]},
       {'Categoría:Anime|Anime': [
		'Doraemon (anime de 1973)',
		'Doraemon (anime de 1979)',
		'Doraemon (anime de 2005)'
	]},
       {'Categoría:Películas|Películas': [
		'Doraemon: El dinosaurio de Nobita',
                'Doraemon: La historia de Nobita el pionero espacial',
                'Doraemon: La gran frontera mágica de Nobita',
                'Doraemon: El demonio submarino de Nobita',
                'Doraemon: La gran aventura de Nobita en el infierno',
                'Doraemon: La guerra espacial de Nobita',
                'Doraemon: Nobita y el ejército de los Hombres de hierro',
                'Doraemon: Nobita y el caballero del dragón',
                'Doraemon: El viaje al Oeste paralelo de Nobita',
                'Doraemon: Nobita y el nacimiento de Japón',
                'Doraemon: Planeta Animal de Nobita',
                'Doraemon: Las Noches de Dorabia de Nobita',
                'Doraemon: Nobita y el reino de las nubes',
                'Doraemon: Nobita y el secreto del laberinto',
                'Doraemon: Nobita y la espada de las ilusiones',
                'Doraemon: El diario de Nobita',
                'Doraemon: Nobita y el tren expreso galáctico',
                'Doraemon: La aventura de Nobita en la Ciudad de cuerda',
                'Doraemon: La aventura de Nobita en el Mar del Sur',
                'Doraemon: Nobita a la deriva por el espacio',
                'Doraemon: La leyenda del rey del Sol de Nobita',
                'Doraemon: Nobita y los héroes alados',
                'Doraemon: Nobita y el imperio robot',
                'Doraemon: Nobita y los dioses del viento',
                'Doraemon: El dinosaurio de Nobita 2006',
                'Doraemon: La nueva gran aventura de Nobita en el infierno - Los siete magos',
                'Doraemon: Nobita y los caballeros enmascarados',
                'Doraemon: Nobita y la leyenda del Gigante Verde',
                'Doraemon: Nobita y la odisea en el espacio',
                'Doraemon: La gran batalla de Nobita del Reino de las sirenas'
	]},
       {'Categoría:Episodios|Episodios': [
		'Categoría:Episodios de Doraemon (anime de 1973)|Episodios de Doraemon (anime de 1973)',
		'Categoría:Episodios de Doraemon (anime de 1979)|Episodios de Doraemon (anime de 1979)',
		'Categoría:Episodios de Doraemon (anime de 2005)|Episodios de Doraemon (anime de 2005)'
	]},
       {'Categoría:Consolas|Consolas': [
		'Nintendo Entertainment System',
		'Super Nintendo Entertainment System',
                'Nintendo 64',
                'Nintendo Game Boy',
                'Nintendo Game Boy Color',
                'Nintendo Game Boy Advance',
                'Nintendo GameCube',
                'Nintendo DS',
                'Nintendo Wii'
	]},
       {'Categoría:Canciones|Canciones': [
		'Categoría:Aperturas|Aperturas',
                'Categoría:Clausuras|Clausuras',
	]},
];
wgSidebar['Comunidad'] = [
       {'Categoría:Proyectos|Proyectos': [
		'Proyecto:Imágenes y videos|Imágenes y videos',
		'Proyecto:Doraemon|Doraemon',
	]},
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'Doraenciclopedia:Cómo colaborar|Cómo colaborar', 
        'Doraenciclopedia:Sobre el cambio de la apariencia de Doraenciclopedia|Sobre el cambio de la apariencia de Doraenciclopedia'
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/