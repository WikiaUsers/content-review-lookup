/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Mitolog�a'] = [
        {'Europea|Europea': [
                'Plut�n',
                'Afrodita',
                'Morfeo',
                'Leprechaun',
                'Poseid�n',
               
        ]},	
        {'Aricana': [
                'Dioses Africanos',,

        ]},
        {'Asi�tica|Asi�tica': [
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
        {'Categor�a:Literatura|Literatura': [
                'Defensa del Bachiller de Letras|Bachiller de Letras',           
                'La casa de Asteri�n',

        ]},
        'Categor�a:Referentes|Referentes',: [
                'Defensa del Bachiller de Letras|Bachiller de Letras',           

        
       ]},
];
wgSidebar['Comunidad'] = [
	'Wiki_Mitolog�a:Administradores|Administradores',     
        'Especial:Leaderboard#|Ranking de Logros,
        'Especial:ListaUsuarios|Usuarios',
	'Foro:Index|Foro'
 
];
 
/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);
/*</pre>*/