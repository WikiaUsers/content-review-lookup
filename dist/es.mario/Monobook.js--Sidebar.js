/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Contenidos'] = [
	{'Categoría:Personajes|Personajes': [
		'Mario',
		'Luigi',
		'Princesa Peach',
		'Princesa Daisy',
		'Yoshi',
		'Categoría:Personajes|Ver Más..'
	]},
	{'Categoría:Enemigos|Enemigos': [
		'Goomba',
		'Koopa',
		'Bowser',
		'Bowser Jr.',
		'Koopaling',
		'Categoría:Enemigos|Ver Más..'
	]},
        {'Categoría:Juegos|Juegos': [
                {'Categoría:Juegos|Plataformas': [
		'Super Mario Bros.',
		'Super Mario Bros. 3',
		'Super Mario World',
		'Super Mario 64',
                'Super Mario Sunshine',
		'Super Mario Galaxy',
                'Super Mario Galaxy 2',
        ]},
                {'Categoría:Juegos|RPGS': [
                'Super Mario RPG: Legend of the Seven Stars',
                'Paper Mario 64',
                'Paper Mario: La Puerta Milenaria',
                'Super Paper Mario',
                'Paper Mario 3DS',
                'Mario & Luigi: Superstar Saga',
                'Mario & Luigi: Compañeros en el Tiempo',
                'Mario & Luigi: Viaje al Centro de Bowser',
        ]},
                {'Categoría:Juegos|Carreras': [
                'Super Mario Kart',
                'Mario Kart 64',
                'Mario Kart: Double Dash!!',
                'Mario Kart: Super Circuit',
                'Mario Kart DS',
                'Mario Kart Wii',
                'Mario Kart 3DS',
        ]},
                {'Categoría:Juegos|Super Smash Bros.': [
                'Super Smash Bros.',
                'Super Smash Bros. Melee',
                'Super Smash Bros. Brawl',
        ]},
		'Categoría:Juegos|Ver Más..'
	]},
       {'Categoría:Items|Items': [
		'Champiñón',
		'Flor de Fuego',
		'Flor de Hielo',
		'Champiñón Gigante',
		'Hoja',
		'Categoría:Items|Ver Más..'
	]},
       {'Categoría:Lugares|Lugares': [
		'Reino Champiñón',
		'Castillo de Bowser',
		'Reino Judía',
		'Castillo de Peach',
		'Categoría:Galaxias|Galaxias',
		'Categoría:Lugares|Ver Más..'
	]},
];
wgSidebar['Comunidad'] = [
       {'Categoría:Proyectos|Proyectos': [
		'Proyecto:Imágenes|Imágenes',
		'Proyecto:Super Smash Bros|Super Smash Bros.',
	]},
        'Super Mario Wiki:Chat|Chat',
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'Super Mario Wiki:Crear un artículo|Crea un Artículo', 
        'Super Mario Wiki:Acerca del cambio de apariencia de Super Mario Wiki|Apariencia del Wiki',
        'Super Mario Wiki:Paleta de Colores|Paleta de Colores', 
        'Ayuda:Guía de edición|Guía de edición',
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/