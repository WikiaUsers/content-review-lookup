/* 
El contenido aqu� mostrado se aplicar� en todos los skins, por favor, estas p�ginas afectan de forma muy significativa al funcionamiento del wiki, no las alteres a menos que est�s completamente seguro de lo que est�s haciendo. Gran parte del texto ha sido extra�do de Inciclopedia y adaptado para Grand Theft Encyclopedia, por favor ten en cuenta al copiar el texto que es probable que no funcione correctamente en tu wiki. Gracias.
*/

/*
-------------------------------------
AYUDAS EMERGENTES Y ATAJOS DE TECLADO
-------------------------------------
Esta secci�n contiene las traducciones de los mensajes emergentes en
  los enlaces de los men�s.

A su vez tambi�n define la tecla que se debe usar junto con la
  tecla ALT para acceder a esas p�ginas.

En algunos exploradores usan otra tecla especial para ello:
  por ejemplo el SeaMonkey usa MAYS+ALT+la tecla correspondiente.
*/

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
ta['ca-nstab-forum'] = new Array('c','Ver p�gina del foro');

/*
-------------------
BOTONES ADICIONALES
-------------------
A�adido por: [[uncyclopedia:es:user:Chixpy]]
*/

 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "C�digo fuente",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "C�digo fuente"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantillas",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Plantilla"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuario"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categor�a",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categor�a"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| {' + '{tablabonita|alineacion=col1izq col2cen col3der|}}\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "!| encabezado 1\n!| encabezado 2\n!| encabezado 3\n|-\n|| fila 1, columna 1\n|| fila 1, columna 2\n|| fila 1, columna 3\n|-\n|| fila 2, columna 1\n|| fila 2, columna 2\n|| fila 2, columna 3"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/70/Button_fusion.png",
     "speedTip": "Pedir que se fusione el art�culo a otro",
     "tagOpen": "{{fusionar|",
     "tagClose": "}}",
     "sampleText": "Nombre del art�culo con el que se debe fusionar"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
     "speedTip": "P�gina de desambiguaci�n",
     "tagOpen": "{{desambiguacion}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png",
     "speedTip": "Advertir de vandalismo a un usuario",
     "tagOpen": "{{vandalismo|",
     "tagClose": "}}",
     "sampleText": "Motivo de aviso"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
     "speedTip": "Proponer el art�culo para ser borrado",
     "tagOpen": "{{borrar|",
     "tagClose": "}}",
     "sampleText": "Motivo por el que se propone para borrar"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_broom2.png",
     "speedTip": "Pedir que se arregle el art�culo",
     "tagOpen": "{{arreglar|",
     "tagClose": "}}",
     "sampleText": "Motivo por el que se pide el arreglo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162634/es.gta/images/d/d1/Sin_foto.png",
     "speedTip": "Advertir de que el art�culo necesita im�genes",
     "tagOpen": "{{sinfoto}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
     "speedTip": "Advertir de que se est� trabajando en el art�culo",
     "tagOpen": "{{enobras|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};
 }

/*
-----------------------------------------
C�DIGO PARA PLEGADO/DESPLEGADO DE BLOQUES
-----------------------------------------
Traido de [[wikipedia:es:mediwiki:common.js]]

Modificado por Chixpy en [[w:c:videojuego:mediawiki:monobook.js]]
  para su correcto funcionamiento en Wikia.

Plantillas que hacen uso de este c�digo: [[Plantilla:Desplegable]]

Prerequisitos:

NavigationBarShowDefault : Si hay m�s de este n�mero de desplegables
  ocultar todas autom�ticamente.
*/

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

addOnloadHook(createNavigationBarToggleButton);

/* 
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde est� "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]

Traida inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder ,
  para que funcione correctamente usando ''class='' en vez de ''id=''.
*/

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

/* Publicidad de Wikia - NO TOCAR */
$('#background_strip').bind('click.cabecera', function(){ window.location.href = 'http://es.rdr.wikia.com/wiki/Red_Dead_Wiki'; return false; });
$('#wiki_logo').bind('click.cabecera', function(){ window.location.href = 'http://es.gta.wikia.com/wiki/Grand_Theft_Encyclopedia'; return false; });

/*

-------------------------------------------------------------------------------
                    REDEFINICIONES DE COMPORTAMIENTO
-------------------------------------------------------------------------------

-------------------------------------
REDEFINICION DEL BOT�N "SUBIR IMAGEN"
-------------------------------------
A�adido por: [[uncyclopedia:es:user:Chixpy]]

Aqu� hago una redifici�n de la funci�n llamada por el enlace subir imagen que hay en la barra de herramientas.

En vez de usar [[Special:MiniUpload]] llama a [[Special:Upload]]
*/

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

/*
-----------------------------------------------
REDEFINICI�N DE ORDENACI�N DE TABLAS "SORTABLE"
-----------------------------------------------
A�adido por: [[uncyclopedia:es:user:Chixpy]]

Estos ingleses se creen el centro del universo y en las tablas que se
  pueden ordenar reconocen el punto como s�mbolo decimal as� que hago
  este apa�o para que lo haga correctamente..
*/

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

//Modificado por Sanbec en WP-es aplicando la soluci�n de WP en sueco
//(Anteriormente parece que solo cambiaba un punto)
//EXPERIMENTAL: A�adido adem�s para que ordene los porcentajes.
function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace("%", "");
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}

//Modificaci�n hecha por Sanbec en WP-es para que ordene alfab�ticamente bien
// ignorando acentos y no se limite a ordenarlo seg�n el c�digo ASCII.
function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}

/*

== Logo en buscador ==
*/

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
return; // remove this line when you fix FIXME
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
// there is no searchBox element anymore
		searchbox = getElementsByClassName(document.getElementById('searchBox'),  'div', 'r_boxContent')[0]; // FIXME
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
	a.appendChild(document.createTextNode('B�squeda avanzada'));
	li.appendChild(a);
	ul.appendChild(li);
	
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = (pos == -1) ? 'javascript:emptySearchDesc()' : '/wiki/' + line.substring(pos + 1);
	a.appendChild(document.createTextNode("�Qui�n es? (" + ((pos == -1) ? 'NO DESCRIPTION' : line.substring(pos + 1)) + ')'));
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
	alert('No existe descripci�n para este �cono de b�squeda. Por favor contacta a los administradores para resolver este problema.');
}

function ContentLoader()
{
		this.cache = true;
}


/* Wikimediaplayer */
 
document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:Wikimediaplayer.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');

// ============================================================
// COMIENZO script de cuenta atr�s
// C�digo por MegaScience de Medal of Honor Wiki | Traducido por bola
// (Usado en la Plantilla:Countdown)
// ============================================================
dateFuture = new Date(2010,1,9,12,0,0);
function GetCount(){

	dateNow = new Date();
	amount = dateFuture.getTime() - dateNow.getTime();
	delete dateNow;

	if(amount < 0){
		if(typeof flicker == 'undefined'){
			flicker = 0;
		}
		if(flicker == 0) {
			document.getElementById('countbox').innerHTML="<font face=\"Impact\" color=\"#FFBB11\" size=\"+3\">&nbsp;&nbsp;BioShock 2</font><br><br><font face=\"Impact\" size=\"+3\">&nbsp;&nbsp;ya est� disponible.</font>";
			flicker=1;
		}
		else if(flicker == 1){
			document.getElementById('countbox').innerHTML="<font face=\"Impact\" size=\"+3\">&nbsp;&nbsp;BioShock 2</font><br><br><font face=\"Impact\" color=\"#FFBB11\" size=\"+3\">&nbsp;&nbsp;ya est� disponible.</font>";
			flicker=0;
		}
		
		setTimeout("GetCount()", 500);
		
	}
	else{
		days=0;hours=0;mins=0;secs=0;out="<span style=\"font-family:Impact; text-align:center; float:center;\">Salida de BioShock en:</span><br><br><span style=\"font-family:Impact; text-align:center; float:center; color:#FFBB11\">";

		amount = Math.floor(amount/1000);

		days=Math.floor(amount/86400);
		amount=amount%86400;

		hours=Math.floor(amount/3600);
		amount=amount%3600;

		mins=Math.floor(amount/60);
		amount=amount%60;

		secs=Math.floor(amount);

		if(days != 0){out += days +" d�a"+((days!=1)?"s":"")+", ";}
		if(days != 0 || hours != 0){out += hours +" hora"+((hours!=1)?"s":"")+",<br/>";}
		if(days != 0 || hours != 0 || mins != 0){out += mins +" minuto"+((mins!=1)?"s":"")+", ";}
		out += secs +" segs</span>";
		document.getElementById('countbox').innerHTML=out;
		
		setTimeout("GetCount()", 1000);
		
	}
	
}

window.onload=GetCount;