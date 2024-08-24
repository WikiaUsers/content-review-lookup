/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Manhunt Wiki'] = [
	'w:c:manhunt.respuestas:Manhunt_Respuestas|Respuestas'
];
wgSidebar['GTA Revolution'] = [
	'http://www.gtarevolution.net/index.php|Web',
	'http://www.gtarevolution.net/public/index.php|Foro',
	'http://www.gtarevolution.net/public/index.php?action=mgallery|Galería',
	'http://www.youtube.com/GTARevolutionChannel|YouTube',
	'http://www.vimeo.com/gtarevolution|Vimeo',
	'http://www.facebook.com/gtarevolution|Facebook',
	'http://twitter.com/gtarevolution|Twitter'
];

wgSidebar['Comunidad'] = [
	'Manhunt_Wiki:Administración|Administración',
        'Manhunt_Wiki:Políticas|Políticas',
	{'Foro:Portada|Foro': [
		'Foro:Portada/Respuestas|Foro de Respuestas'
        ]},
	'Project:Actualidad|Actualidad',
	'Manhunt_Wiki:Vandalismo|Vandalismos',
	'Manhunt_Wiki:Plantillas|Plantillas',
        'blogs-recent-url|Blogs'
];

wgSidebar['Saga Manhunt'] = [
	{'Manhunt|Manhunt': [
		'Personajes de Manhunt|Personajes',
		'Vehículos de Manhunt|Vehículos',
		'Misiones de Manhunt|Misiones',
		'Bandas de Manhunt|Bandas',
		'Armas de Manhunt|Armas'
        ]},
	{'Manhunt 2|Manhunt 2': [
		'Personajes de Manhunt 2|Personajes',
		'Vehículos de Manhunt 2|Vehículos',
		'Misiones de Manhunt 2|Misiones',
		'Bandas de Manhunt 2|Bandas',
		'Armas de Manhunt 2|Armas'
        ]}
];

wgSidebar['Participa'] = [
	'Categoría:Artículos_para_actualizar|Actualizar',
	'Categoría:Artículos_para_arreglar|Arreglar',
	'Categoría:Artículos_para_borrar|Borrar',
	'Especial:PáginasSinCategorizar|Categorizar',
	'Especial:PáginasRequeridas|Crear',
	'Categoría:Esbozos|Esbozos',
	'Categoría:Artículos_con_errores_ortográficos|Ortografiar',
	'Categoría:Artículos_sin_foto|Sin foto',
	'Categoría:Artículos_en_obras|Terminar'
];
wgSidebar['Rockstar Games'] = [
	'w:c:es.gta:Grand_Theft_Encyclopedia|Grand Theft Encyclopedia',
	'w:c:es.caniscanem:Canis_Canem_Wiki|Canis Canem Wiki',
	'w:c:es.maxpayne:Max_Payne_Wiki|Max Payne Wiki',
	'w:c:es.midnightclub:Midnight_Club_Wiki|Midnight Club Wiki',
	'w:c:es.reddead:Red_Dead_Wiki|Red Dead Wiki',
	'w:c:es.thewarriors:The_Warriors_Wiki|The Warriors Wiki',
	'w:c:es.oni:Oni_Wiki|Oni Wiki'
];
wgSidebar['Logros'];

/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/