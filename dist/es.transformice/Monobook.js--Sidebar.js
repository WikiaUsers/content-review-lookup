/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Mapas'] = [
		'Mapa 0|Mapa 0',
		'Mapa 1|Mapa 1',
		'Mapa 2|Mapa 2',
		'Mapa 3|Mapa 3',
		'Mapa 666|Mapa 666',
                'Mapa 888|Mapa 888',
                'Mapa 444|Mapa 444',
		'Categor�a:Mapas|Ver m�s..',
];

wgSidebar['Ratones'] = [
		'Rat�n Shaman|Shaman',
		'Holzinator|Holzinator',
                'Melibellule|Melibellule',
                'Tigrounette|Tigrounette',
];
wgSidebar['Accesorios'] = [
        'Corona|Corona', 
        'Casco|Casco',
        'Corbata|Corbata', 
        'Arete de coraz�n|Arete de coraz�n',
        'Ceja|Ceja',
        'Gorro de l�der de tribu|Gorro de l�der de tribu',
];
/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/