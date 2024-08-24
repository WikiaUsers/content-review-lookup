/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Manhunt Wiki'] = [
	'w:c:manhunt.respuestas:Manhunt_Respuestas|Respuestas'
];
wgSidebar['GTA Revolution'] = [
	'http://www.gtarevolution.net/index.php|Web',
	'http://www.gtarevolution.net/public/index.php|Foro',
	'http://www.gtarevolution.net/public/index.php?action=mgallery|Galer�a',
	'http://www.youtube.com/GTARevolutionChannel|YouTube',
	'http://www.vimeo.com/gtarevolution|Vimeo',
	'http://www.facebook.com/gtarevolution|Facebook',
	'http://twitter.com/gtarevolution|Twitter'
];

wgSidebar['Comunidad'] = [
	'Manhunt_Wiki:Administraci�n|Administraci�n',
        'Manhunt_Wiki:Pol�ticas|Pol�ticas',
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
		'Veh�culos de Manhunt|Veh�culos',
		'Misiones de Manhunt|Misiones',
		'Bandas de Manhunt|Bandas',
		'Armas de Manhunt|Armas'
        ]},
	{'Manhunt 2|Manhunt 2': [
		'Personajes de Manhunt 2|Personajes',
		'Veh�culos de Manhunt 2|Veh�culos',
		'Misiones de Manhunt 2|Misiones',
		'Bandas de Manhunt 2|Bandas',
		'Armas de Manhunt 2|Armas'
        ]}
];

wgSidebar['Participa'] = [
	'Categor�a:Art�culos_para_actualizar|Actualizar',
	'Categor�a:Art�culos_para_arreglar|Arreglar',
	'Categor�a:Art�culos_para_borrar|Borrar',
	'Especial:P�ginasSinCategorizar|Categorizar',
	'Especial:P�ginasRequeridas|Crear',
	'Categor�a:Esbozos|Esbozos',
	'Categor�a:Art�culos_con_errores_ortogr�ficos|Ortografiar',
	'Categor�a:Art�culos_sin_foto|Sin foto',
	'Categor�a:Art�culos_en_obras|Terminar'
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

/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/