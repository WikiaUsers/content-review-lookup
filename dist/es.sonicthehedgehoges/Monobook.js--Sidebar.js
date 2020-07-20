/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Contenidos'] = [
	{'Categoría:Heroes|Heroes': [
		'Sonic the Hedgehog (personaje)',
		'Miles "Tails" Prower',
		'Knuckles the Echidna',
		'Amy Rose',
		'Categoría:Heroes|Ver Más..'
	
	]},
        {'Categoría:Juegos|Juegos': [
		'Sonic the Hedgehog(1991)',
		'Sonic the Hedgehog 2',
		'Sonic the Hedgehog 3',
		'Sonic Adventure',
		'Sonic Adventure 2',
		'Categoría:Juegos|Ver Más..'
	]},
	{'Categoría:Consolas|Consolas': [
		'Sega Mega Drive',
		'Sega Saturn',
		'Sega DreamCast',
		'Nintendo GameCube',
                'Wii',
		'Categoría:Consolas|Ver Más..'
	
	]},
	{'Categoría:Shows|Shows': [
		'Las Aventuras de Sonic el Erizo',
		'Sonic the Hedgehog (SaTaM)',
		'Sonic Underground',
		'Sonic X',
		'Categoría:Shows|Ver Más..'
	
	]},

];
wgSidebar['Comunidad'] = [
       {'Categoría:Proyectos|Proyectos': [
		'Proyecto:Juegos|Juegos',
		'Proyecto:Personajes|Personajes',
	]},
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'Sonic the hedgehog Wiki:Crear un artículo|Crea un Artículo', 
        'Sonic the hedgehog Wiki:Cambio de Apariencia de Sonic the hedgehog Wiki|Apariencia del Wiki'
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/