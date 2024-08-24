/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Contenidos'] = [
	{'Categoría:Personajes|Personajes': [
		'Crash Bandicoot (personaje)',
		'Coco Bandicoot',
		'Aku Aku',
		'Crunch Bandicoot',
		'Categoría:Personajes|Ver Más..'
	]},
	{'Categoría:Villanos|Villanos': [
		'Dr. Neo Cortex',
		'Dr. Nitrus Brio',
		'Ripper Roo',
		'Uka Uka.',
		'Tiny Tiger',
		'Categoría:Villanos|Ver Más..'
	]},
        {'Categoría:Juegos|Juegos': [
		'Crash Bandicoot (videojuego)',
		'Crash Bandicoot 2: Cortex Strikes Back',
		'Crash Bandicoot 3: Warped',
		'Crash Bandicoot: The Wrath of Cortex',
		'Crash TwinSanity',
		'Categoría:Juegos|Ver Más..'
	]},

];
wgSidebar['Comunidad'] = [
       {'Categoría:Proyectos|Proyectos': [
		'Proyecto:Imágenes|Imágenes',
		'Proyecto:Personajes|Personajes',
	]},
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'Bandicoot Wiki:Crear un artículo|Crea un Artículo', 
        'Bnadicoot Wiki:Cambio de Apariencia de Bandicoot Wiki|Apariencia del Wiki'
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/