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

==Ayudas emergentes y atajos de teclado==
Esta sección contiene las traducciones de los mensejes emergentes en los links de los menús.

A su vez también define la tecla que se debe usar junto con la tecla ALT para acceder a esas páginas. (En algunos exploradores esta tecla puede cambiar, por ejemplo ALT+MAYS en SeaMonkey)
<nowiki> */
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
ta['n-help'] = new Array('','Aquí puedes guiarte por la Wiki');
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
/*</nowiki>

== Cambio de CSS o JS en ciertas páginas ==

Instrucciones para añadir a una página un CSS o JS específico: 

Añade a la lista siguiente la página que hay que cambiar comillas incluidas:
<code><nowiki>"<Nombre del espacio>:<Nombre página>": "<Nombre skin>",</nowiki></code>

<big>'''Atención:  LAS ÚLTIMAS DE LA LISTAS NO TIENEN COMA AL FINAL'''</big>

*'''<Nombre del espacio>:<Nombre página>''': Es el nombre completo de la página SIN sustituir los espacios por caracteres de subrayado.
*'''<Nombre skin>''': Se trata del nombre un archivo MediaWiki:Skin/<Nombre skin> que contiene es CSS o el JS dependiendo del arraycon las modificaciones. En caso de ser vacio ("") entonces <Nombre skin> = <Nombre del espacio>:<Nombre página>
*No es para usar en las páginas de usuario ni en cada página de la GTE. Sólo para casos excepcionales.

Si no existe <code><nowiki>MediaWiki:Skin/<Nombre skin>.css</nowiki></code> (o js) simplemente crealó y modifícalo.
<nowiki>*/
SkinPersonalidadas = {
    "Portada": "Portada.css"

/*   EL ÚLTIMO NO LLEVA COMA AL FINAL  */
}

JSPersonalidados = {
    "Portada": "",

/*   EL ÚLTIMO NO LLEVA COMA AL FINAL  */
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

==Código para plegado/desplegado de bloques==
[[plantilla:Desplegable]]

=== Prerequisitos: ===
'''NavigationBarShowDefault''' -> Si hay más de este número de desplegables ocultar todas automáticamente.
<nowiki>*/
  var NavigationBarHide = '[Ocultar]';
  var NavigationBarShow = '[Mostrar]';
/*</nowiki>

=== Código: ===
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
Aquí hago una redifición de la función llamada por el enlace subir imagen que hay en la barra de herramientas.

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

== Función de carga (no modificar) ==
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

// ============================================================
// BEGIN Collapsible tables
// ============================================================
 
// Description: Allow tables to be collapsible
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
//              Customized for Fallout Wiki by User:Porter21
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 1;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ) {
   var Button = document.getElementById( "collapseButton" + tableIndex );
   var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
   if ( !Table || !Button ) {
      return false;
   }
 
   var Rows = Table.rows;
 
   if ( Button.firstChild.data == collapseCaption ) {
      for ( var i = 1; i < Rows.length; i++ ) {
          Rows[i].style.display = "none";
      }
      Button.firstChild.data = expandCaption;
   } else {
      for ( var i = 1; i < Rows.length; i++ ) {
          Rows[i].style.display = Rows[0].style.display;
      }
      Button.firstChild.data = collapseCaption;
   }
}
 
function createCollapseButtons() {
   var tableIndex = 0;
   var collapseIndex = 0;
   var NavigationBoxes = new Object();
   var Tables = document.getElementsByTagName( "table" );
 
   for ( var i = 0; i < Tables.length; i++ ) {
      if ( hasClass( Tables[i], "collapsible" ) ) {
 
         /* only add button and increment count if there is a header row to work with */
         var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
         if (!HeaderRow) continue;
         var Header = HeaderRow.getElementsByTagName( "th" )[0];
         if (!Header) continue;
 
         NavigationBoxes[ tableIndex ] = Tables[i];
         Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
         var Button     = document.createElement( "span" );
         var ButtonLink = document.createElement( "a" );
         var ButtonText = document.createTextNode( collapseCaption );
 
         Button.style.styleFloat = "right";
         Button.style.cssFloat = "right";
         Button.style.fontWeight = "normal";
         Button.style.textAlign = "right";
         Button.style.width = "4em";
         Button.className = "t_show_hide";
 
         ButtonLink.style.color = Header.style.color;
         ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
         ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
         ButtonLink.appendChild( ButtonText );
 
         Button.appendChild( document.createTextNode( "[" ) );
         Button.appendChild( ButtonLink );
         Button.appendChild( document.createTextNode( "]" ) );
 
         Header.insertBefore( Button, Header.childNodes[0] );
 
         if ( !hasClass( Tables[i], "nocount" ) ) {
            collapseIndex++;
	 }
         tableIndex++;
      }
   }
 
   for ( var i = 0;  i < tableIndex; i++ ) {
      if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
         collapseTable( i );
      } 
      else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
         var element = NavigationBoxes[i];
         while (element = element.parentNode) {
            if ( hasClass( element, "outercollapse" ) ) {
               collapseTable ( i );
               break;
            }
         }
      }
   }
}
 
addOnloadHook( createCollapseButtons );