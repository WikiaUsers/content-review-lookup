/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Contenidos'] = [
	{'Categor�a:Personajes|Personajes': [
		'Crash Bandicoot (personaje)',
		'Coco Bandicoot',
		'Aku Aku',
		'Crunch Bandicoot',
		'Categor�a:Personajes|Ver M�s..'
	]},
	{'Categor�a:Villanos|Villanos': [
		'Dr. Neo Cortex',
		'Dr. Nitrus Brio',
		'Ripper Roo',
		'Uka Uka.',
		'Tiny Tiger',
		'Categor�a:Villanos|Ver M�s..'
	]},
        {'Categor�a:Juegos|Juegos': [
		'Crash Bandicoot (videojuego)',
		'Crash Bandicoot 2: Cortex Strikes Back',
		'Crash Bandicoot 3: Warped',
		'Crash Bandicoot: The Wrath of Cortex',
		'Crash TwinSanity',
		'Categor�a:Juegos|Ver M�s..'
	]},

];
wgSidebar['Comunidad'] = [
       {'Categor�a:Proyectos|Proyectos': [
		'Proyecto:Im�genes|Im�genes',
		'Proyecto:Personajes|Personajes',
	]},
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'Bandicoot Wiki:Crear un art�culo|Crea un Art�culo', 
        'Bnadicoot Wiki:Cambio de Apariencia de Bandicoot Wiki|Apariencia del Wiki'
];
/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/