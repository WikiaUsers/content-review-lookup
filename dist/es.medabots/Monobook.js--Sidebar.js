/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Contenidos'] = [
        {'Categoría:Medarots|Medarots': [
		'Categoría:Medarots por videojuego|Medarots por videojuego',
		'Categoría:Medarots en el manga|Medarots en el manga',
		'Categoría:Medarots en el anime|Medarots en el anime'
	]},
        {'Categoría:Videojuegos|Videojuegos': [
		'Medarot (juego)|Medarot',
		'Medarot 2 (juego)|Medarot 2',
		'Medarot R',
		'Medarot 3 (juego)|Medarot 3',
		'Medarot 4 (juego)|Medarot 4',
		'Medarot 5 (juego)|Medarot 5',
		'Medarot G (juego)|Medarot G',
		'Medarot Navi (juego)|Medarot Navi',
		'Medarot 2 CORE',
		'Medarot BRAVE',
		'Shingata Medarot',
		'Medarot DS (juego)|Medarot DS'
	]},
       {'Categoría:Manga|Manga': [
		'Medarot (manga)|Medarot',
		'Medarot 2 (manga)|Medarot 2',
		'Medarotter Rintarou!',
		'Medarotter Rintarou! Medarot R',
		'Medarot 3 (manga)|Medarot 3',
		'Medarot 4 (manga)|Medarot 4',
		'Medarot 5 (manga)|Medarot 5',
		'Medarot G (manga)|Medarot G',
		'Medarot Navi (manga)|Medarot Navi',
		'Medarot DS (manga)|Medarot DS'
	]},
       {'Categoría:Anime|Anime': [
		'Medarot (anime)|Serie original',
		'Medarot Damashii|Serie Medarot Damashii'
	]},
       {'Lista de episodios|Episodios': [
		'Lista de episodios de Medarot|Episodios de la serie original',
		'Lista de episodios de Medarot Damashii|Episodios de la serie Medarot Damashii'
	]},
       {'Categoría:Consolas|Consolas': [
                'Nintendo Game Boy',
                'Nintendo Game Boy Color',
                'Nintendo Game Boy Advance',
                'Nintendo GameCube',
                'Nintendo DS'
	]},
       {'Categoría:Canciones|Canciones': [
		'Categoría:Aperturas|Aperturas',
		'Categoría:Clausuras|Clausuras'
	]},
];
wgSidebar['Comunidad'] = [
       {'Medateca:Proyectos|Proyectos': [
		'Medateca:Proyecto Medarot|Proyecto Medarot',
		'Medateca:Proyecto Videojuegos|Proyecto Videojuegos',
		'Medateca:Proyecto Manga|Proyecto Manga',
		'Medateca:Proyecto Anime|Proyecto Anime',
		'Medateca:Proyecto Cartas|Proyecto Cartas',
		'Medateca:Proyecto Multimedia|Proyecto Multimedia',
	]},
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'Medateca:Cómo colaborar|Cómo colaborar', 
        'Medateca:Sobre el cambio de la apariencia de Medateca|Sobre el cambio de la apariencia de Medateca'
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/