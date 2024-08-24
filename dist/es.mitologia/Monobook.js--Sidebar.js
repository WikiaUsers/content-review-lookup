/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Mitología'] = [
        {'Europea|Europea': [
                'Plutón',
                'Afrodita',
                'Morfeo',
                'Leprechaun',
                'Poseidón',
               
        ]},	
        {'Aricana': [
                'Dioses Africanos',,

        ]},
        {'Asiática|Asiática': [
                'Ittan-momen',           
                'Tanuki',
                'Karakasa',           
                'Kappa',
                'Kameosa',

        ]},
        {'Americana|Americana': [
                'Chaac',           
                'Quetzalcoatl',

        ]},
        {'Americana|Americana'
        ]},
];
 
wgSidebar['Otros'] = [
        {'Categoría:Literatura|Literatura': [
                'Defensa del Bachiller de Letras|Bachiller de Letras',           
                'La casa de Asterión',

        ]},
        'Categoría:Referentes|Referentes',: [
                'Defensa del Bachiller de Letras|Bachiller de Letras',           

        
       ]},
];
wgSidebar['Comunidad'] = [
	'Wiki_Mitología:Administradores|Administradores',     
        'Especial:Leaderboard#|Ranking de Logros,
        'Especial:ListaUsuarios|Usuarios',
	'Foro:Index|Foro'
 
];
 
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);
/*</pre>*/