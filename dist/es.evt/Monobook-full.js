/* 
Monobook desarrollado por [[Usuario:Axxgreazz]]. (versión 2.0)
*Puedes ver el manual completo y las funcionalidades contenidas aquí en [[Usuario:Axxgreazz/Monobook-Suite|la página del Monobook-Suite]]
*Si necesitas mayores detalles sobre la configuración revisa el [[Usuario:Axxgreazz/Monobook-Suite/Configuración|Manual de configuración del Monobook-Suite]].
*Si quieres configurarlo de manera rápida usa el [[Usuario:Axxgreazz/Monobook-Suite/Panel de control|Panel de control]]. */
 
//<pre><nowiki>
 
/* Sección 1: Inicialización de monobook (No modificar) */
 
incluir ("","","init.js");           
incluir ("","","funciones.js");
 
/* Sección 2: Personalización de Modulos */
/* Copia cualquiera de los archivos indicados a continuación a tu espacio de usuario */
/* y personaliza tus botones de la barra de herramientas, busqueda y enlaces wiki */
 
incluir ("","","misparametros-full.js");
incluir ("","","misfunciones.js");
incluir ("","","misbotones-full.js");
incluir ("","","misbuscadores-full.js");
incluir ("","","misenlaces-full.js");
incluir ("","","misflotantes-full.js");
incluir ("","","misresumenes.js");
 
/* Sección 3 : Modulos del monobook
/* Puedes incorporar un módulo de esta u otra wiki */
/* Tan sólo especifica el host de la wiki, el nombre del usuario y el nombre de archivo */
 
incluir ("","","toolbarextendido.js");   /*Módulo de Barra de herramientas */
incluir ("","","enlaceswiki.js");        /*Módulo de Enlaces Wiki */
incluir ("","","modulobusqueda.js");     /*Módulo de Búsqueda */
incluir ("","","popups.js");             /*Módulo de Popups */
incluir ("","","instaview.js");          /*Módulo de Instaview */
incluir ("","","recent.js");             /*Módulo Anti-vandalismo */
incluir ("","","reversion.js");          /*Módulo de Reversión */
incluir ("","","statuschanger.js");      /*Administración de estados */
incluir ("","","quickedit.js");          /*Edición rápida */
incluir ("","","panelcontrol.js");       /*Panel de control del Monobook */
incluir ("","","quickimgdelete.js");     /*Mantenimiento de imágenes */
incluir ("","","botoneraflotante.js");   /*Botonera flotante */
incluir ("","","hotcats.js");            /*Edición rápida de categorías*/
incluir ("","","resumedeluxe.js");       /*Resúmenes predefinidos*/
incluir ("","","watchlistnotifier.js‎");  /*Notificador de lista de seguimiento*/
 
/* Sección 4: Función base (No modificar) */
 
function incluir(url,usuario,nombre)   
{
   if (url=="") {url = 'es.wikipedia.org'; }
   if (usuario=="") {usuario = 'Axxgreazz/Monobook-Suite'; };  /*no cambiar */
   document.write('<script type="text/javascript" src="' 
+ 'http://' + url + '/w/index.php?title=User:' + usuario 
+ '/' + nombre + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
//</nowiki></pre>