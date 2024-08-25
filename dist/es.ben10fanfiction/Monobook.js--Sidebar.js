/* Any JavaScript here will be loaded for users using the MonoBook skin */
/*<pre>
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Wiki'] = [
	'Especial:CambiosRecientes|Cambios recientes',
	'Especial:Aleatoria|P�gina aleatoria',
	'Especial:NuevasIm�genes|Im�genes nuevas',
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

/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);

/*</pre>*/