/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Juegos'] = [
        {'Juegos Principales|Juegos Principales': [
                'Kingdom Hearts',
                'Kingdom Hearts: Chain of Memories',
                'Kingdom Hearts 358/2 Days',
                'Kingdom Hearts II',
                'Kingdom Hearts Birth by Sleep',
                'Kingdom Hearts coded',
        ]},	
        {'Remakes y otros títulos|Remakes y otros títulos': [
                'Kingdom Hearts Final',
                'Kingdom Hearts Re: Chain of Memories',
                'Kingdom Hearts II Final Mix',
                'Kingdom Hearts Birth by Sleep Final Mix',
                'Kingdom Hearts Re:coded',
		'Kingdom Hearts V Cast',,
        ]},
        {'Próximos lanzamientos|Próximos lanzamientos': [
                'Kingdom Hearts 3D: Dream Drop Distance|Kingdom Hearts 3D',           
                'Kingdom Hearts III',
        ]},
];
 
wgSidebar['Universo KH'] = [
        {'Categoría:Personajes|Personajes': [
        'Categoría:Personajes Originales|Personajes originales',
        'Categoría:Personajes Final Fantasy|Personajes Final Fantasy',
        'Categoría:Personajes The World Ends With You|Personajes The World Ends With You',	
        'Categoría:Personajes Disney|Personajes Disney'
       ]},
        {'Categoría:Enemigos|Enemigos': [
                'Sincorazón',
                'Incorpóreos',
                'Nescientes',
                'Devoradores de Sueños',
                'Organización XIII',
                'Consejo de Villanos',
       ]},
        {'Categoría:Elementos de la trama|Elementos de la trama': [
                'Luz',
                'Oscuridad',
                'Corazón',
                'Categoría:Armas|Armas',
                'Magia',
                'Categoría:Habilidades|Habilidades',                
       ]},
];
wgSidebar['Comunidad'] = [
	'Final Fantasy Wiki:Artículos Destacados|Artículo destacado',        'http://es.kingdomhearts.wikia.com/wiki/Usuario_Blog:Seicer/Concurso_El_Editor_Estrella_Segunda_Edici%C3%B3n|Concurso Editor Estrella',	
        'Especial:PáginasRequeridas|Páginas requeridas',
	'Foro:Index|Foro'
 
];
 
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);
/*</pre>*/