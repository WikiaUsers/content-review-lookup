/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Contenidos'] = [
        {'Categor�a:Medarots|Medarots': [
		'Categor�a:Medarots por videojuego|Medarots por videojuego',
		'Categor�a:Medarots en el manga|Medarots en el manga',
		'Categor�a:Medarots en el anime|Medarots en el anime'
	]},
        {'Categor�a:Videojuegos|Videojuegos': [
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
       {'Categor�a:Manga|Manga': [
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
       {'Categor�a:Anime|Anime': [
		'Medarot (anime)|Serie original',
		'Medarot Damashii|Serie Medarot Damashii'
	]},
       {'Lista de episodios|Episodios': [
		'Lista de episodios de Medarot|Episodios de la serie original',
		'Lista de episodios de Medarot Damashii|Episodios de la serie Medarot Damashii'
	]},
       {'Categor�a:Consolas|Consolas': [
                'Nintendo Game Boy',
                'Nintendo Game Boy Color',
                'Nintendo Game Boy Advance',
                'Nintendo GameCube',
                'Nintendo DS'
	]},
       {'Categor�a:Canciones|Canciones': [
		'Categor�a:Aperturas|Aperturas',
		'Categor�a:Clausuras|Clausuras'
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
        'Medateca:C�mo colaborar|C�mo colaborar', 
        'Medateca:Sobre el cambio de la apariencia de Medateca|Sobre el cambio de la apariencia de Medateca'
];
/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/