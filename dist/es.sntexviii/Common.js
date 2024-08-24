//<pre><nowiki>

http://es.southpark.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    userLang: false, 
    es: {
	show: "mostrar",
	hide: "ocultar",
	showAll: "mostrar todo",
	hideAll: "ocultar todo"
    }
};

-------------------------------------
AYUDAS EMERGENTES Y ATAJOS DE TECLADO
-------------------------------------
Esta secci�n contiene las traducciones de los mensejes emergentes en
  los links de los men�s.

A su vez tambi�n define la tecla que se debe usar junto con la
  tecla ALT para acceder a esas p�ginas.

En algunos exploradores usan otra tecla especial para ello:
  por ejemplo el SeaMonkey usa MAYS+ALT+la tecla correspondiente.
<pre><nowiki> */
ta = new Object();
ta['pt-userpage'] = new Array('.','Mi p�gina de usuario');
ta['pt-anonuserpage'] = new Array('.','La p�gina de usuario de la IP desde la que editas');
ta['pt-mytalk'] = new Array('n','Mi p�gina de discusi�n');
ta['pt-anontalk'] = new Array('n','Discusi�n sobre ediciones hechas desde esta direcci�n IP');
ta['pt-preferences'] = new Array('','Mis preferencias');
ta['pt-watchlist'] = new Array('l','La lista de p�ginas para las que est�s vigilando los cambios');
ta['pt-mycontris'] = new Array('y','Lista de mis contribuciones');
ta['pt-login'] = new Array('o','Te animamos a registrarte, aunque no es obligatorio');
ta['pt-anonlogin'] = new Array('o','Te animamos a registrarte, aunque no es obligatorio');
ta['pt-logout'] = new Array('o','Salir de la sesi�n');
ta['ca-talk'] = new Array('t','Discusi�n acerca del art�culo');
ta['ca-edit'] = new Array('e','Puedes editar esta p�gina. Por favor, usa el bot�n de previsualizaci�n antes de grabar.');
ta['ca-addsection'] = new Array('+','A�ade un comentario a esta discusi�n');
ta['ca-viewsource'] = new Array('e','Esta p�gina est� protegida, s�lo puedes ver su c�digo fuente');
ta['ca-history'] = new Array('h','Versiones anteriores de esta p�gina y sus autores');
ta['ca-protect'] = new Array('=','Proteger esta p�gina');
ta['ca-delete'] = new Array('d','Borrar esta p�gina');
ta['ca-undelete'] = new Array('d','Restaurar las ediciones hechas a esta p�gina antes de que fuese borrada');
ta['ca-move'] = new Array('m','Trasladar (renombrar) esta p�gina');
ta['ca-watch'] = new Array('w','A�adir esta p�gina a tu lista de seguimiento');
ta['ca-unwatch'] = new Array('w','Borrar esta p�gina de tu lista de seguimiento');
ta['search'] = new Array('f','Buscar en este wiki');
ta['p-logo'] = new Array('','Portada');
ta['n-mainpage'] = new Array('z','Visitar la Portada');
ta['n-portal'] = new Array('','Acerca del proyecto, qu� puedes hacer, d�nde encontrar informaci�n');
ta['n-currentevents'] = new Array('','Informaci�n de contexto sobre acontecimientos actuales');
ta['n-recentchanges'] = new Array('r','La lista de cambios recientes en el wiki');
ta['n-randompage'] = new Array('x','Cargar una p�gina aleatoriamente');
ta['n-help'] = new Array('','El lugar para aprender');
ta['n-sitesupport'] = new Array('','Resp�ldanos');
ta['t-whatlinkshere'] = new Array('j','Lista de todas las p�ginas del wiki que enlazan con �sta');
ta['t-recentchangeslinked'] = new Array('k','Cambios recientes en las p�ginas que enlazan con esta otra');
ta['feed-rss'] = new Array('','Sindicaci�n RSS de esta p�gina');
ta['feed-atom'] = new Array('','Sindicaci�n Atom de esta p�gina');
ta['t-contributions'] = new Array('','Ver la lista de contribuciones de este usuario');
ta['t-emailuser'] = new Array('','Enviar un mensaje de correo a este usuario');
ta['t-upload'] = new Array('u','Subir im�genes o archivos multimedia');
ta['t-specialpages'] = new Array('q','Lista de todas las p�ginas especiales');
ta['ca-nstab-main'] = new Array('c','Ver el art�culo');
ta['ca-nstab-user'] = new Array('c','Ver la p�gina de usuario');
ta['ca-nstab-media'] = new Array('c','Ver la p�gina de multimedia');
ta['ca-nstab-special'] = new Array('','Esta es una p�gina especial, no se puede editar la p�gina en s�');
ta['ca-nstab-wp'] = new Array('a','Ver la p�gina de proyecto');
ta['ca-nstab-image'] = new Array('c','Ver la p�gina de la imagen');
ta['ca-nstab-mediawiki'] = new Array('c','Ver el mensaje de sistema');
ta['ca-nstab-template'] = new Array('c','Ver la plantilla');
ta['ca-nstab-help'] = new Array('c','Ver la p�gina de ayuda');
ta['ca-nstab-category'] = new Array('c','Ver la p�gina de categor�a');
ta['ca-nstab-forum'] = new Array('c','View the forum page');

/* Desactivaci�n del bot�n de edici�n de los temas del foro antiguos
--------------------------------------------------------------------
Adaptado de Uncyclopedia, autor original: Spang
*/
function ArchivarTemaForo() {
  if(typeof(ActivarForoArchivado) != 'undefined' && ActivarForoArchivado)
    return;
  if( !document.getElementById('ca-edit') || !document.getElementById('ForoArchivado') )
    return;
  editLink = document.getElementById('ca-edit').firstChild;
  editLink.removeAttribute('href', 0);
  editLink.style.color = 'gray';
  editLink.innerHTML = 'no edites';
}
addOnloadHook(ArchivarTemaForo);


/* FUNCI�N DE CARGA (NO MODIFICAR) */

function addLoadEvent(func) {
   if (window.addEventListener) {
       window.addEventListener("load", func, false);
   } else if (window.attachEvent) {
       window.attachEvent("onload", func);
   }
}

//</nowiki></pre>