Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto. */

wgSidebar['Contenidos'] = [
	{'Categoría:Programas de World Wrestling Entertainment|Programas': [
		'Raw',
		'SmackDown',
		'NXT',
		'WWE Superstars',
		'Categoría:Programas de World Wrestling Entertainment|Ver Más..'
	]},
	{'Categoría:Eventos PPV|Eventos': [
		'WrestleMania',
		'WWE Elimination Chamber',
		'Royal Rumble (2011)|Royal Rumble',
		'WWE TLC',
		'Categoría:Eventos PPV|Ver Más..'
	]},
        {'Categoría:Campeonatos|Campeonatos': [
		'Campeonato de la WWE',
		'Campeonato Mundial Peso Pesado',
		'Campeonato Intercontinental',
		'Campeonato de los Estados Unidos',
                'Campeonatos en Pareja de la WWE',
		'Campeonato de Divas',
                'Categoría:Campeonatos|Ver Más..'
        ]},
                
];
wgSidebar['Comunidad'] = [
       {'Categoría:Proyectos|Proyectos': [
		'World Wrestling Enciclopedia:Proyecto Eventos|Proyecto Eventos',
		'World Wrestling Enciclopedia:Proyecto Luchadores|Proyecto Luchadores',
	]},
        'Foro:Index|Foro'
];
wgSidebar['Ayuda'] = [
        'World Wrestling Enciclopedia:Acerca de|Acerca del Wiki', 
        'World Wrestling Enciclopedia:Administradores|Administradores',
        'World Wrestling Enciclopedia:Paleta de Colores|Paleta de Colores', 
        'Ayuda:Imágenes|Imágenes',
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);
/*</pre>*/