/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Portada'] = [
	'mainpage|General',
	'Historias:Portada|Historias',
	'Diálogos:Portada|Diálogos',
	{'Grand_Theft_Encyclopedia:Videos|Videos': [
		'Grand_Theft_Encyclopedia:Videos/Machinima|Machinima'
	]},
	'w:c:gta.respuestas:GTA_Respuestas|Respuestas'
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
	'Grand Theft Encyclopedia:Portal de la comunidad|Portal de la Comunidad',
	'http://irc.wikia.com/?select=gta-es|Chat de la Comunidad',
	'Grand_Theft_Encyclopedia:Administración|Administración',
        'Grand_Theft_Encyclopedia:Políticas|Políticas',
	{'Foro:Index|Foro': [
		'Foro:General|Foro General',
                'Foro:Diálogos|Foro de Diálogos',
                'Foro:Historias|Foro de Historias',
                'Foro:Respuestas|Foro de Respuestas'
        ]},
	'Project:Actualidad|Actualidad',
	{'Grand Theft Encyclopedia:Vandalismo|Vandalismos': [
		'Grand Theft Encyclopedia:Vandalismo|Vandalismos simples',
		'Grand Theft Encyclopedia:Police Department|Vandalismos especiales'
        ]},
	'Grand Theft Encyclopedia:Plantillas|Plantillas',
	'Grand Theft Encyclopedia:Concursos|Concursos',
	'Grand Theft Encyclopedia:Desafíos|Desafíos',
	{'Grand_Theft_Encyclopedia/Destacado|Destacado': [
		'Grand_Theft_Encyclopedia:Artículos_destacados|Artículos destacados',
		'Grand_Theft_Encyclopedia:Misiones_destacadas|Misiones destacadas',
		'Grand_Theft_Encyclopedia:Imagen_Destacada|Imágenes destacadas',
		'Grand_Theft_Encyclopedia:Historias_destacadas|Historias destacadas',
		'Grand_Theft_Encyclopedia:Diálogos_destacados|Diálogos destacados',
		'Grand_Theft_Encyclopedia:Usuario_y_escritor_del_mes|Usuario y escritor del mes',
		'Grand_Theft_Encyclopedia:Usuario_y_escritor_del_año|Usuario y escritor del año'
        ]}
];

wgSidebar['Saga GTA'] = [
	{'Grand Theft Auto|GTA': [
		'Personajes de Grand Theft Auto|Personajes',
		'Vehículos de Grand Theft Auto|Vehículos',
		'Misiones de Grand Theft Auto|Misiones',
		'Bandas de Grand Theft Auto|Bandas',
		'Armas de Grand Theft Auto|Armas'
        ]},
	{'Grand Theft Auto: London 1969|GTA: London 1969': [
		'Personajes de Grand Theft Auto: London 1969|Personajes',
		'Vehículos de Grand Theft Auto: London 1969|Vehículos',
		'Misiones de Grand Theft Auto: London 1969|Misiones',
		'Bandas de Grand Theft Auto: London 1969|Bandas',
		'Armas de Grand Theft Auto: London 1969|Armas'
        ]},
	{'Grand Theft Auto: London 1961|GTA: London 1961': [
		'Personajes de Grand Theft Auto: London 1961|Personajes',
		'Vehículos de Grand Theft Auto: London 1961|Vehículos',
		'Misiones de Grand Theft Auto: London 1961|Misiones',
		'Bandas de Grand Theft Auto: London 1961|Bandas',
		'Armas de Grand Theft Auto: London 1961|Armas'
        ]},
        'Grand Theft Auto 64|GTA 64',
	{'Grand Theft Auto 2|GTA 2': [
		'Personajes de Grand Theft Auto 2|Personajes',
		'Vehículos de Grand Theft Auto 2|Vehículos',
		'Misiones de Grand Theft Auto 2|Misiones',
		'Bandas de Grand Theft Auto 2|Bandas',
		'Armas de Grand Theft Auto 2|Armas'
        ]},
	{'Grand Theft Auto III|GTA III': [
		'Personajes de Grand Theft Auto III|Personajes',
		'Vehículos de Grand Theft Auto III|Vehículos',
		'Misiones de Grand Theft Auto III|Misiones',
		'Bandas de Grand Theft Auto III|Bandas',
		'Armas de Grand Theft Auto III|Armas'
        ]},
	{'Grand Theft Auto: Vice City|GTA: Vice City': [
		'Personajes de Grand Theft Auto: Vice City|Personajes',
		'Vehículos de Grand Theft Auto: Vice City|Vehículos',
		'Misiones de Grand Theft Auto: Vice City|Misiones',
		'Bandas de Grand Theft Auto: Vice City|Bandas',
		'Armas de Grand Theft Auto: Vice City|Armas'
        ]},
	{'Grand Theft Auto Advance|GTA Advance': [
		'Personajes de Grand Theft Auto Advance|Personajes',
		'Vehículos de Grand Theft Auto Advance|Vehículos',
		'Misiones de Grand Theft Auto Advance|Misiones',
		'Bandas de Grand Theft Auto Advance|Bandas',
		'Armas de Grand Theft Auto Advance|Armas'
        ]},
	{'Grand Theft Auto: San Andreas|GTA: San Andreas': [
		'Personajes de Grand Theft Auto: San Andreas|Personajes',
		'Vehículos de Grand Theft Auto: San Andreas|Vehículos',
		'Misiones de Grand Theft Auto: San Andreas|Misiones',
		'Bandas de Grand Theft Auto: San Andreas|Bandas',
		'Armas de Grand Theft Auto: San Andreas|Armas'
        ]},
	{'Grand Theft Auto: Liberty City|GTA: Liberty City': [
		'Personajes de Grand Theft Auto: Liberty City|Personajes',
		'Vehículos de Grand Theft Auto: Liberty City|Vehículos',
		'Misiones de Grand Theft Auto: Liberty City|Misiones',
		'Bandas de Grand Theft Auto: Liberty City|Bandas',
		'Armas de Grand Theft Auto: Liberty City|Armas'
        ]},
	{'Grand Theft Auto: Vice City Stories|GTA: Vice City Stories': [
		'Personajes de Grand Theft Auto: Vice City Stories|Personajes',
		'Vehículos de Grand Theft Auto: Vice City Stories|Vehículos',
		'Misiones de Grand Theft Auto: Vice City Stories|Misiones',
		'Bandas de Grand Theft Auto: Vice City Stories|Bandas',
		'Armas de Grand Theft Auto: Vice City Stories|Armas'
        ]},
	{'Grand Theft Auto IV|GTA IV': [
		'Personajes de Grand Theft Auto IV|Personajes',
		'Vehículos de Grand Theft Auto IV|Vehículos',
		'Misiones de Grand Theft Auto IV|Misiones',
		'Bandas de Grand Theft Auto IV|Bandas',
		'Armas de Grand Theft Auto IV|Armas'
        ]},
	{'Grand Theft Auto IV: The Lost and Damned|GTA IV: The Lost and Damned': [
		'Personajes de Grand Theft Auto IV: The Lost and Damned|Personajes',
		'Vehículos de Grand Theft Auto IV: The Lost and Damned|Vehículos',
		'Misiones de Grand Theft Auto IV: The Lost and Damned|Misiones',
		'Bandas de Grand Theft Auto IV: The Lost and Damned|Bandas',
		'Armas de Grand Theft Auto IV: The Lost and Damned|Armas'
        ]},
	{'Grand Theft Auto: Chinatown Wars|GTA: Chinatown Wars': [
		'Personajes de Grand Theft Auto: Chinatown Wars|Personajes',
		'Vehículos de Grand Theft Auto: Chinatown Wars|Vehículos',
		'Misiones de Grand Theft Auto: Chinatown Wars|Misiones',
		'Bandas de Grand Theft Auto: Chinatown Wars|Bandas',
		'Armas de Grand Theft Auto: Chinatown Wars|Armas'
        ]},
	{'Grand Theft Auto: The Ballad of Gay Tony|GTA: The Ballad of Gay Tony': [
		'Personajes de Grand Theft Auto: The Ballad of Gay Tony|Personajes',
		'Vehículos de Grand Theft Auto: The Ballad of Gay Tony|Vehículos',
		'Misiones de Grand Theft Auto: The Ballad of Gay Tony|Misiones',
		'Bandas de Grand Theft Auto: The Ballad of Gay Tony|Bandas',
		'Armas de Grand Theft Auto: The Ballad of Gay Tony|Armas'
        ]}
];

wgSidebar['Colabora'] = [
	'Grand Theft Encyclopedia:Esbozos|Esbozos',
	{'Grand_Theft_Encyclopedia:Proyectos|Proyectos': [
		'Grand_Theft_Encyclopedia:Proyecto_Vehículos|Vehículos',
		'Grand_Theft_Encyclopedia:Proyecto_Personajes|Personajes',
		'Grand_Theft_Encyclopedia:Proyecto_Armas|Armas',
		'Grand_Theft_Encyclopedia:Proyecto_Misiones|Misiones',
		'Grand_Theft_Encyclopedia:Proyecto_Lugares|Lugares',
		'Grand_Theft_Encyclopedia:Proyecto_Radios|Radios'
        ]},
	'Grand Theft Encyclopedia:Tutores|Tutores',
	'Categoría:Páginas sin foto|Sin foto',
	'Categoría:Arreglar|Arreglar',
	'Categoría:Arts con faltas ortográficas|Ortografía'
];
wgSidebar['Blogs'] = [
	'Blog:Entradas_recientes|Blogs recientes',
	'Blog:Blog de Noticias|Blog de Noticias'
];
wgSidebar['Rockstar Games'] = [
	'w:c:es.caniscanem:Canis_Canem_Wiki|Canis Canem Wiki',
	'w:c:es.manhunt:Manhunt_Wiki|Manhunt Wiki',
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