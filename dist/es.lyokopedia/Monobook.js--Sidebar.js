/* Any JavaScript here will be loaded for users using the MonoBook skin */

/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Lyokopedia Wiki'] = [
	{'Lyokopedia Wiki:Administradores|Administradores': [
		'Usuario:Ciro GC|Ciro GC'
                'Usuario:Cerebropokemon|Cerebropokemon'
	]},
];