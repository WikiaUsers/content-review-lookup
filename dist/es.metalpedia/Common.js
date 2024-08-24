// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

addOnloadHook(foldingTabsMulti);
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
    len = ftsets[i].boxen.length;
    } else {
    len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
    ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
    ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
    ftsets[set].boxen[j].style.display = 'block';
    } else {
    ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
    ftsets[set].links[j].className = 'selected';
    ftsets[set].links[j].blur();
    } else {
    ftsets[set].links[j].className = '';
    }
  }
}

/* Any JavaScript here will be loaded for all users on every page load.

== Ayudas Emergentes y Atajos de Teclado ==
Esta secci�n contiene las traducciones de los mensejes emergentes en los links de los men�s.

A su vez tambi�n define la tecla que se debe usar junto con la tecla ALT para acceder a esas p�ginas. (En algunos exploradores esta tecla puede cambiar, por ejemplo ALT+MAYS en SeaMonkey)
<nowiki> */
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
ta['n-help'] = new Array('','Aqu� puedes guiarte por la Wiki');
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
/*</nowiki>

== Cambio de CSS o JS en Ciertas P�ginas ==
Instrucciones para a�adir a una p�gina un CSS o JS espec�fico: 

A�ade a la lista siguiente la p�gina que hay que cambiar comillas incluidas:
<code><nowiki>"<Nombre del espacio>:<Nombre p�gina>": "<Nombre skin>",</nowiki></code>

<big>'''Atenci�n:  LAS �LTIMAS DE LA LISTAS NO TIENEN COMA AL FINAL'''</big>

*'''<Nombre del espacio>:<Nombre p�gina>''': Es el nombre completo de la p�gina SIN sustituir los espacios por caracteres de subrayado.
*'''<Nombre skin>''': Se trata del nombre un archivo MediaWiki:Skin/<Nombre skin> que contiene es CSS o el JS dependiendo del arraycon las modificaciones. En caso de ser vacio ("") entonces <Nombre skin> = <Nombre del espacio>:<Nombre p�gina>
*No es para usar en las p�ginas de usuario ni en cada p�gina de la GTE. S�lo para casos excepcionales.

Si no existe <code><nowiki>MediaWiki:Skin/<Nombre skin>.css</nowiki></code> (o js) simplemente creal� y modif�calo.
<nowiki>*/
SkinPersonalidadas = {
    "Portada": "Portada.css"

/*   EL �LTIMO NO LLEVA COMA AL FINAL  */
}

JSPersonalidados = {
    "Portada": "",

/*   EL �LTIMO NO LLEVA COMA AL FINAL  */
}

var re = RegExp("(.*) - GTA");
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
    document.write('<'+'script src="http://es.gta.wikia.com/index.php?' 
    +  'title=MediaWiki:Skin/' + skinName
    +  '&action=raw&ctype=text/javascript&dontcountme=s' 
    +  '"><'+'/script>');        
    }
}

/*</nowiki>

== C�digo para Plegado/Desplegado de Bloques ==
[[plantilla:Desplegable]]

=== Prerequisitos: ===
'''NavigationBarShowDefault''' -> Si hay m�s de este n�mero de desplegables ocultar todas autom�ticamente.
<nowiki>*/
  var NavigationBarHide = '[Ocultar]';
  var NavigationBarShow = '[Mostrar]';
/*</nowiki>

=== C�digo: ===
<nowiki>*/

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

/* </nowiki>
== Redefiniciones de Comportamiento ==
De [[w:c:inciclopedia|Inciclopedia]]
=== Redefinicion de "Subir Imagen" ===
Aqu� hago una redifici�n de la funci�n llamada por el enlace subir imagen que hay en la barra de herramientas.

En vez de usar [[special:MiniUpload]] llama a [[special:upload]]
<nowiki>*/

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

/*</nowiki>

== Funci�n de Carga (No Modificar) ==
De [[w:c:inciclopedia|Inciclopedia]]
<nowiki>*/

function addLoadEvent(func) {
   if (window.addEventListener) {
    window.addEventListener("load", func, false);
   } else if (window.attachEvent) {
    window.attachEvent("onload", func);
   }
}

/*</nowiki>


// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================