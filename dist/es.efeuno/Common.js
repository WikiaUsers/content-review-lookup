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

== Nombre del usuario ==
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

==Botones adicionales==
Improtado de [[w:c:inciclopedia|Inciclopedia]]
<nowiki>*/

 if (mwCustomEditButtons) {

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


   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirección",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Redirección"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Tachado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "tachado"};

 }
/*</nowiki>

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

== Logo en buscador ==
<nowiki>*/

addOnloadHook(loadFunc);

function loadFunc()
{
	replaceSearchIcon();
}

/*
	the ContentLoader class to encapsulate "creative differences" with XHR
	
		Usage:
				- construct a ContentLoader object: var loader = new ContentLoader();
				- set necessary state parameters (via fields); e.g. loader.myvar = 'mytext';
				- set the callback: loader.callback = myfunc;
				- send the request:
						loader.send(url, postdata = null, contentType = 'application/x-www-form-urlencoded');
						(if postdata isn't null or omitted, POST is used, otherwise GET)
				- the callback function is called when the content is loaded
						- the ContentLoader object is this
						- the raw response data is this.text
						- the XML DOM object, if any, is this.document
*/
function ContentLoader()
{
		this.cache = true;
}

ContentLoader.prototype.enableCache = function(caching)
{
		this.cache = (caching == null) ? true : this.cache;
}

ContentLoader.prototype.createRequest = function()
{
	if(typeof(XMLHttpRequest) != 'undefined')
	{
		return new XMLHttpRequest();
	}
	else if(typeof(ActiveXObject) != 'undefined')
	{
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	return null;
}

ContentLoader.prototype.send = function(url, postdata, contentType)
{
	var method = (postdata == null) ? 'GET' : 'POST';
	this.request = this.createRequest();
	this.request.open(method, url);

	if(!this.cache)
		this.request.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );

	var request = this.request;
	var loader = this;
	
	if(postdata == null)
	{
			if(contentType == null)
					contentType = 'application/x-www-form-urlencoded';
	
			request.setRequestHeader('Content-type', contentType);
	}
	
	var f = function()
		{
			if(request.readyState == 4)
			{
				loader.text = request.responseText;
				loader.document = request.responseXML;
				request = null;
				loader.request = null;
				loader.callback();
			}
		}
	
	this.request.onreadystatechange = f;
	this.request.send(postdata);
}
/*
	end ContentLoader
*/

function replaceSearchIcon()
{
        if (skin=="quartz"){return;}//no search icon to replace
	var innerDiv;

	var searchbox = document.getElementById('searchBody');

	if(searchbox)
	{
		innerDiv = searchbox.getElementsByTagName('div')[0];
		var link = innerDiv.getElementsByTagName('a')[0];

		if(link)
			innerDiv.removeChild(link);
	}
	else
	{
		searchbox = getElementsByClassName(document.getElementById('searchBox'),  'div', 'r_boxContent')[0];
		innerDiv = searchbox.getElementsByTagName('div')[1];
	}
	
	var loader = new ContentLoader();
	loader.div = innerDiv;
	loader.callback = onSearchIconsArrival;
	loader.send('/index.php?title=Plantilla:Searchicons&action=raw');
}

function rand(n)
{
	return Math.round(Math.random() * n);
}

function onSearchIconsArrival()
{
	var lines = this.text.split('\n');
	var line = lines[rand(lines.length - 1)];
	var pos = line.indexOf(' ');
	 
	var link = document.createElement('div');
//	link.href = '/index.php?title=Special:Search&adv=1';
	link.id = 'search-icon-wrapper';
	var img = document.createElement('img');
	img.alt = 'Buscador';
	img.src = (pos == -1) ? line : line.substring(0, pos);
	link.appendChild(img);
	
	this.div.insertBefore(link, this.div.firstChild);

	var div = document.createElement('div');
	div.id = 'search-popup';
	div.style.display = 'none';
	var ul = document.createElement('ul');
	
	var li;
	var a;

	li = document.createElement('li');
	a = document.createElement('a');
	a.href = '/index.php?title=Special:Search&adv=1';
	a.appendChild(document.createTextNode('Búsqueda avanzada'));
	li.appendChild(a);
	ul.appendChild(li);
	
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = (pos == -1) ? 'javascript:emptySearchDesc()' : '/wiki/' + line.substring(pos + 1);
	a.appendChild(document.createTextNode("¿Quién es? (" + ((pos == -1) ? 'NO DESCRIPTION' : line.substring(pos + 1)) + ')'));
	li.appendChild(a);
	ul.appendChild(li);

	li = document.createElement('li');
	a = document.createElement('a');
	a.href = 'javascript:closeSearchPopup()';
	a.appendChild(document.createTextNode("Cerrar"));
	li.appendChild(a);
	ul.appendChild(li);

	div.appendChild(ul);
	document.getElementById('globalWrapper').appendChild(div);

	link.onclick = openSearchPopup;
}

function openSearchPopup(event)
{
	var div = document.getElementById('search-popup');
	var e = event || window.event;
	
	div.style.display = (div.style.display == 'none') ? 'block' : 'none';
	div.style.left = e.clientX + 'px';
	div.style.top = (e.clientY + document.documentElement.scrollTop) + 'px';
}

function closeSearchPopup()
{
	document.getElementById('search-popup').style.display = 'none';
}

function emptySearchDesc()
{
	alert('No existe descripción para este ícono de búsqueda. Por favor contacta a los administradores para resolver este problema.');
}

function ContentLoader()
{
		this.cache = true;
}

//</nowiki>