/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Mapas'] = [
		'Mapa 0|Mapa 0',
		'Mapa 1|Mapa 1',
		'Mapa 2|Mapa 2',
		'Mapa 3|Mapa 3',
		'Mapa 666|Mapa 666',
                'Mapa 888|Mapa 888',
                'Mapa 444|Mapa 444',
		'Categoría:Mapas|Ver más..',
];

wgSidebar['Ratones'] = [
		'Ratón Shaman|Shaman',
		'Holzinator|Holzinator',
                'Melibellule|Melibellule',
                'Tigrounette|Tigrounette',
];
wgSidebar['Accesorios'] = [
        'Corona|Corona', 
        'Casco|Casco',
        'Corbata|Corbata', 
        'Arete de corazón|Arete de corazón',
        'Ceja|Ceja',
        'Gorro de líder de tribu|Gorro de líder de tribu',
];
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/