/* Any JavaScript here will be loaded for all users on every page load. 

http://inciclopedia.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js


-------------------------------------
AYUDAS EMERGENTES Y ATAJOS DE TECLADO
-------------------------------------
Esta sección contiene las traducciones de los mensejes emergentes en
  los links de los menús.

A su vez también define la tecla que se debe usar junto con la
  tecla ALT para acceder a esas páginas.

En algunos exploradores usan otra tecla especial para ello:
  por ejemplo el SeaMonkey usa MAYS+ALT+la tecla correspondiente.
<pre><nowiki> */
ta = new Object();
ta['pt-userpage'] = new Array('.','Mi página de usuario');
ta['pt-anonuserpage'] = new Array('.','La página de usuario de la IP desde la que editas');
ta['pt-mytalk'] = new Array('n','Mi página de discusión');
ta['pt-anontalk'] = new Array('n','Discusión sobre ediciones hechas desde esta dirección IP');
ta['pt-preferences'] = new Array('','Mis preferencias');
ta['pt-watchlist'] = new Array('l','La lista de páginas para las que estás vigilando los cambios');
ta['pt-mycontris'] = new Array('y','Lista de mis contribuciones');
ta['pt-login'] = new Array('o','Te animamos a registrarte, aunque no es obligatorio');
ta['pt-anonlogin'] = new Array('o','Te animamos a registrarte, aunque no es obligatorio');
ta['pt-logout'] = new Array('o','Salir de la sesión');
ta['ca-talk'] = new Array('t','Discusión acerca del artículo');
ta['ca-edit'] = new Array('e','Puedes editar esta página. Por favor, usa el botón de previsualización antes de grabar.');
ta['ca-addsection'] = new Array('+','Añade un comentario a esta discusión');
ta['ca-viewsource'] = new Array('e','Esta página está protegida, sólo puedes ver su código fuente');
ta['ca-history'] = new Array('h','Versiones anteriores de esta página y sus autores');
ta['ca-protect'] = new Array('=','Proteger esta página');
ta['ca-delete'] = new Array('d','Borrar esta página');
ta['ca-undelete'] = new Array('d','Restaurar las ediciones hechas a esta página antes de que fuese borrada');
ta['ca-move'] = new Array('m','Trasladar (renombrar) esta página');
ta['ca-watch'] = new Array('w','Añadir esta página a tu lista de seguimiento');
ta['ca-unwatch'] = new Array('w','Borrar esta página de tu lista de seguimiento');
ta['search'] = new Array('f','Buscar en este wiki');
ta['p-logo'] = new Array('','Portada');
ta['n-mainpage'] = new Array('z','Visitar la Portada');
ta['n-portal'] = new Array('','Acerca del proyecto, qué puedes hacer, dónde encontrar información');
ta['n-currentevents'] = new Array('','Información de contexto sobre acontecimientos actuales');
ta['n-recentchanges'] = new Array('r','La lista de cambios recientes en el wiki');
ta['n-randompage'] = new Array('x','Cargar una página aleatoriamente');
ta['n-help'] = new Array('','El lugar para aprender');
ta['n-sitesupport'] = new Array('','Respáldanos');
ta['t-whatlinkshere'] = new Array('j','Lista de todas las páginas del wiki que enlazan con ésta');
ta['t-recentchangeslinked'] = new Array('k','Cambios recientes en las páginas que enlazan con esta otra');
ta['feed-rss'] = new Array('','Sindicación RSS de esta página');
ta['feed-atom'] = new Array('','Sindicación Atom de esta página');
ta['t-contributions'] = new Array('','Ver la lista de contribuciones de este usuario');
ta['t-emailuser'] = new Array('','Enviar un mensaje de correo a este usuario');
ta['t-upload'] = new Array('u','Subir imágenes o archivos multimedia');
ta['t-specialpages'] = new Array('q','Lista de todas las páginas especiales');
ta['ca-nstab-main'] = new Array('c','Ver el artículo');
ta['ca-nstab-user'] = new Array('c','Ver la página de usuario');
ta['ca-nstab-media'] = new Array('c','Ver la página de multimedia');
ta['ca-nstab-special'] = new Array('','Esta es una página especial, no se puede editar la página en sí');
ta['ca-nstab-wp'] = new Array('a','Ver la página de proyecto');
ta['ca-nstab-image'] = new Array('c','Ver la página de la imagen');
ta['ca-nstab-mediawiki'] = new Array('c','Ver el mensaje de sistema');
ta['ca-nstab-template'] = new Array('c','Ver la plantilla');
ta['ca-nstab-help'] = new Array('c','Ver la página de ayuda');
ta['ca-nstab-category'] = new Array('c','Ver la página de categoría');
ta['ca-nstab-forum'] = new Array('c','View the forum page');

/* Desactivación del botón de edición de los temas del foro antiguos
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


/*</nowiki></pre>
-------------------
BOTONES ADICIONALES
-------------------
Añadido por: [[User:chixpy|Chixpy]]
<pre><nowiki>*/

 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/3/35/Bot%C3%B3n_Super%C3%ADndice.png",
     "speedTip": "Superíndice",
     "tagOpen": "<sup>",
     "tagClose": "</sup>",
     "sampleText": "superíndice"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/b/bd/Bot%C3%B3n_Sub%C3%ADndice.png",
     "speedTip": "Subíndice",
     "tagOpen": "<sub>",
     "tagClose": "</sub>",
     "sampleText": "subíndice"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Código fuente",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "código fuente"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantillas",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "plantilla"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "usuario"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categoría",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categoría"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| {' + '{tablabonita|alineacion=col1izq col2cen col3der|}}\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "!| encabezado 1\n!| encabezado 2\n!| encabezado 3\n|-\n|| fila 1, columna 1\n|| fila 1, columna 2\n|| fila 1, columna 3\n|-\n|| fila 2, columna 1\n|| fila 2, columna 2\n|| fila 2, columna 3"};
 }


/*</nowiki></pre>
-------------------------------------
CAMBIO DE CSS O JS EN CIERTAS PÁGINAS
-------------------------------------

Traído de Uncyclopedia

Instrucciones para añadir a una página un CSS o JS específico: 

Añade a la lista siguiente la página que hay que cambiar comillas incluidas:
<code><nowiki>"<Nombre del espacio>:<Nombre página>": "<Nombre skin>",</nowiki></code>

<big>'''Atención:  LAS ÚLTIMAS DE LA LISTAS NO TIENEN COMA AL FINAL'''</big>

*'''<Nombre del espacio>:<Nombre página>''': Es el nombre completo de la página SIN sustituir los espacios por caracteres de subrayado.
*'''<Nombre skin>''': Se trata del nombre un archivo MediaWiki:Skin/<Nombre skin> que contiene es CSS o el JS dependiendo del arraycon las modificaciones. En caso de ser vacio ("") entonces <Nombre skin> = <Nombre del espacio>:<Nombre página>
*No es para usar en las páginas de usuario ni en cada página de Inciclopedia. Sólo para casos excepcionales.

Si no existe <code><nowiki>MediaWiki:Skin/<Nombre skin>.css</nowiki></code> (o js) simplemente crealó y modifícalo.
<pre><nowiki>*/
SkinPersonalidadas = {
    "AAAAAAAAA!": "Aaaa.css",  
    "La palabra periquito escrita exactamente doscientas cuarenta y dos veces": "Aaaa.css",
    "aTunes": "aTunes.css",
    "Breve": "Breve.css",
    "Desorden": "Desorden.css",
    "Escribir borracho":"Borracho.css",
    "Huevo": "Huevo.css",
    "Inciclopedia:Portada AAAAAAAAA": "Aaaa.css",  
    "Inciclopedia:Portal Perú": "Perú.css",
    "Perú": "Perú.css",
    "Pereza": "Pereza.css",
    "Sèver lA": "Revés.css",
    "Vacío": "Vacío.css",
    "Créditos": "Créditos.css",
    "Créditos de cine": "Créditos.css",
    "Corte de luz": "Créditos.css",
    "Inciclopedia:Portada Navidad": "PortadaNavidad.css",
    "Inciclopedia:Portada Segunda Guerra Mundial": "Portada2ndaGuerra.css",
    "McDonald's": "mcdonalds.css",
    "Nuevas Siete Maravillas del Mundo": "Maravillas.css",
    "Incinoticias:Portada": "Portada.css",
    "Inciclopedia:Donaciones": "Donaciones.css",
    "Inciclopedia:Portada Halloween 2": "Halloween.css",
    "Inciclopedia:Portada Navidad 2": "PortadaNavidad.css",
    "Inciclopedia:Portada San Valentín": "PortadaSanValentín.css",
    "Encyclopedia Dramatica": "EncyclopediaDramatica.css",
    "Hipnosis": "Hipnosis.css",
    "Virtual Boy": "VirtualBoy.css",
    "(Inserte título aquí)": "Insertetítuloaquí.css",
    "Incitables:Tio1.jpg": "Incitabletio.css",
    "Inciclopedia:Portada Día de Acción de Gracias‎": "PortadaAcciondegracias.css", 
    "Incilibros/Cómo preparar cereal con leche": "Cereal.css", 
    "Wikipedia": "Wikipedia.css",
    "Inciclopedia:Portada WikipediarS": "Inciclopediars.css"


/*   EL ÚLTIMO NO LLEVA COMA AL FINAL  */
}

JSPersonalidados = {
    "Créditos": "Créditos.js",
    "Marihuana": "Marihuana.js",
    "Porno GRATIS": "Mensajes.js",
    "Incilibros/Cómo preparar cereal con leche": "MensajesCereal.js",
    "Incinoticias:¡Inciclopedia tiene virus!": "VirusInciclopedico.js‎"

/*   EL ÚLTIMO NO LLEVA COMA AL FINAL  */
}

var re = RegExp("(.*) - Inciclopedia");
var matches = re.exec(document.title);
var skinName;

if (matches) {
    if (SkinPersonalidadas[matches[1]] != undefined) {
        skinName = (SkinPersonalidadas[matches[1]].length > 0) ? SkinPersonalidadas[matches[1]] : matches[1] +
                   '.css';
        document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' +
                        skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
    }

    if (JSPersonalidados[matches[1]] != undefined) {
        skinName = (JSPersonalidados[matches[1]].length > 0) ? JSPersonalidados[matches[1]] : matches[1] + 
                   '.js';
        document.write('<'+'script src="http://inciclopedia.wikia.com/index.php?' 
                       +  'title=MediaWiki:Skin/' + skinName
                       +  '&action=raw&ctype=text/javascript&dontcountme=s' 
                       +  '"><'+'/script>');        
    }
}

/*</nowiki></pre>
----------------------------------------
EDITAR JUSTO A LA DERECHA DE LOS TÍTULOS
----------------------------------------
Traido de la ladrona [[wikipedia:es:MediaWiki:Monobook.js]]
  que a su vez está traido de [[wikipedia:de:MediaWiki:Monobook.js]].
Pone los enlaces a editar justo a la la derecha de los títulos.

Si alguien desea conservar el comportamiento original de los botones
 (es decir que estén a la derecha del todo), puede copiar en su monobook.js
  la siguiente línea:

  var oldEditsectionLinks = true;

<pre><nowiki>*/
function moveEditsection() {
    if (typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false) {
        var spans = document.getElementsByTagName("span");
        for(var i = 0; i < spans.length; i++) {
            if(spans[i].className == "editsection") {
                spans[i].style.fontSize = "small";
                spans[i].style.fontWeight = "normal";
                spans[i].style.cssFloat = "none";
                spans[i].style.marginLeft = "0px";
                spans[i].parentNode.appendChild(document.createTextNode(" "));
                spans[i].parentNode.appendChild(spans[i]);
            }
        }
    }
}

addOnloadHook(moveEditsection);

/*</nowiki></pre>
-----------------------------------------
CÓDIGO PARA PLEGADO/DESPLEGADO DE BLOQUES
-----------------------------------------
Traido de [[wikipedia:es:mediwiki:common.js]].

Modificado por Chixpy en [[w:c:videojuego:mediawiki:monobook.js]]
  para su correcto funcionamiento en Wikia.

Plantillas que hacen uso de este código: [[plantilla:Desplegable]]

Prerequisitos:

NavigationBarShowDefault : Si hay más de este número de desplegables
  ocultar todas automáticamente.
<pre><nowiki>*/

var NavigationBarHide = '[Ocultar]';
var NavigationBarShow = '[Mostrar]';

function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarShow;
            }
        }

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarHide;
            }
        }
    }
}

 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all <div>-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode( NavigationBarShow );
            NavToggle.appendChild(NavToggleText);

            // add NavToggle-Button as first div-element 
            // in <div class="NavFrame">
            NavFrame.insertBefore(
                NavToggle,
                NavFrame.firstChild
            );
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }

    //Plegamos todas....
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
            toggleNavigationBar(i);
        }   
 }

addLoadEvent(createNavigationBarToggleButton);

/* </nowiki></pre>
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté <span class="insertusername"></span>
  o la [[Plantilla:NOMBREUSUARIO]]

Traida inicialmente de Uncyclopedia y corregida por [[user:Ciencia Al Poder|Ciencia Al Poder]], para que funcione correctamente usando ''class='' en vez de ''id=''.
<pre><nowiki>*/

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

/*</nowiki></pre>

-------------------------------------------------------------------------------
                    REDEFINICIONES DE COMPORTAMIENTO
-------------------------------------------------------------------------------

-------------------------------------
REDEFINICION DEL BOTÓN "SUBIR IMAGEN"
-------------------------------------
Añadido por: [[User:chixpy|Chixpy]]

Aquí hago una redifición de la función llamada por el enlace subir imagen que hay en la barra de herramientas.

En vez de usar [[special:MiniUpload]] llama a [[special:upload]]
<pre><nowiki>*/

function specialImageUpload(tagOpen, tagClose, sampleText)
{
   // Hack: We need to know whether or not a user is logged in
   // before they can upload a file.  Therefore, to know whether or not
   // they are logged in, we can look for the "watch this" checkbox on
   // the edit page since this only appears when the user is logged in to
   // the site.  If they are not logged in, we display a message and prompt
   // to ask if they would like to log in now.  If they are logged in, we
   // open up the image upload popup window, and allow them to upload.

    // if user is not logged in
    if ( document.getElementById('wpWatchthis') == null )
      loginBeforeUpload();
    else
    {
    	var re = /http:\/\/([^\/]*)\//g;
    	var matches = re.exec(window.location.href);
    	if ( !matches ) {
		// TAH: firefox bug: have to do it twice for it to work
		matches = re.exec(window.location.href);
	}
	var domain = matches[1];

	//alert("logged in, let's open the image uploader popup: " + domain);

	if (imageUploadDialog && imageUploadDialog.open && !imageUploadDialog.closed)
	  imageUploadDialog.close();

    	imageUploadDialog = window.open("http://" + domain + "/wiki/Special:Upload",
          "upload_file",
          "toolbar=no,location=no,top=0,left=0,menubar=0,scrollbars=yes,width=800"); 
    }
}

/*</nowiki></pre>
-----------------------------------------------
REDEFINICIÓN DE ORDENACIÓN DE TABLAS "SORTABLE"
-----------------------------------------------
Añadido por: [[User:chixpy|Chixpy]]

Estos ingleses se creen el centro del universo y en las tablas que se
  pueden ordenar reconocen el punto como símbolo decimal así que hago
  este apaño para que lo haga correctamente..
<pre><nowiki>*/

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "ene": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "abr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "ago": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dic": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

//Modificado por Sanbec en WP-es aplicando la solución de WP en sueco
//(Anteriormente parece que solo cambiaba un punto)
//EXPERIMENTAL: Añadido además para que ordene los porcentajes.
function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace("%", "");
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}

//Modificación hecha por Sanbec en WP-es para que ordene alfabéticamente bien
// ignorando acentos y no se limite a ordenarlo según el código ASCII.
function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}

/*</nowiki></pre>
-----------------------
REDEFINICIÓN DE TÍTULOS
-----------------------
Reescribe el título de la página usado por [[Plantilla:Título]]

Traido de Uncyclopedia y el autor es [[en:user:Sikon]]
<pre><nowiki>*/
function rewriteTitle()
{
   if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
       return;

   var titleDiv = document.getElementById('title-meta');

   if(titleDiv == null || titleDiv == undefined)
       return;

   var cloneNode = titleDiv.cloneNode(true);
   var firstHeading = YAHOO.util.Dom.getElementsByClassName('firstHeading', 'h1', document.getElementById('content') )[0];
   var node = firstHeading.childNodes[0];

   // new, then old!
   firstHeading.replaceChild(cloneNode, node);
   cloneNode.style.display = "inline";

   var titleAlign = document.getElementById('title-align');
   firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

addOnloadHook(rewriteTitle, false);


/*</nowiki></pre>
-----------------------------------------
MOSTRANDO BOTÓN DESHACER PARA REGISTRADOS
-----------------------------------------
Como ocultamos el botón deshacer a las IP, hay que volverlos a hacer aparecer.
<pre><nowiki>*/

addOnloadHook ( function(){
  if (wgUserName){
    // Mostramos botón deshacer de los historiales
    var deshacer = getElementsByClassName(document, "span", "mw-history-undo");  
    for (var i = 0; i < deshacer.length; i++){
      deshacer[i].style.display = 'inline';
    }
    // Mostramos botón deshacer de las páginas de comparación
    deshacer = document.getElementById("mw-diff-ntitle1");
    if (deshacer){
      deshacer.getElementsByTagName("a")[2].style.display = 'inline';
    }
  }
}
)

/* </nowiki></pre>
-------------------------------
FUNCIÓN DE CARGA (NO MODIFICAR)
-------------------------------
<pre><nowiki>*/

function addLoadEvent(func) {
   if (window.addEventListener) {
       window.addEventListener("load", func, false);
   } else if (window.attachEvent) {
       window.attachEvent("onload", func);
   }
}

//</nowiki></pre>