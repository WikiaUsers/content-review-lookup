/* Any JavaScript here will be loaded for users using the MonoBook skin */
/*<pre>
Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Wiki'] = [
	'Especial:CambiosRecientes|Cambios recientes',
	'Especial:Aleatoria|Página aleatoria',
	'Especial:NuevasImágenes|Imágenes nuevas',
	'http://es.ben10fanon.wikia.com/wiki/Especial:Chat?useskin=wikia|Chat',
];
wgSidebar['Comunidad'] = [
	'Ben 10 Wiki:Portal de la comunidad|Portal de la comunidad',
	'Especial:ListaUsuarios|Lista de usuarios',
	'Especial:Top/community|Usuarios destacados',
	'Ben 10 Wiki:Zona de Pruebas|Zona de Pruebas',
	{'Ben 10 Wiki:Administradores|Administradores': [
		'Usuario:Benfutbol10|Benfutbol10',
		'Usuario:Infinitrix|Infinitrix',
		'Usuario:Csuarezllosa|Csuarezllosa',
		'Usuario:Goop9|Goop9',
		'Usuario:Nanomech25|Nanomech25',
		'Usuario:La chica 10|La chica 10',
		'Usuario:Ben10UA|Ben10UA'
	]}
];

/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/