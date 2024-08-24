/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
importScriptPage('ShowHide/code.js','dev');

/* Código para cargar el Chat de IRC */
importScriptURI('http://es.maxsteel.wikia.com/index.php?title=MediaWiki:Chat.js&action=raw&ctype=text/javascript');

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129657&counter=26' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129657&counter=26' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});
/*
Añadir botones al editar artículo en modo normal
*/
 
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};
 
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "\{\{borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_user.png",
     "speedTip": "Usuario",
     "tagOpen": "\{\{usuario|",
     "tagClose": "\}\}",
     "sampleText": "nombre"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
     "speedTip": "Véase también",
     "tagOpen": "\{\{VT|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/26/Button_Tongue.png",
     "speedTip": "Insertar un emoticon. Solo usar en discusiones o blogs.",
     "tagOpen": "\{\{e|",
     "tagClose": "\}\}",
     "sampleText": "emoticon"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/8e/Button_stub.png",
     "speedTip": "Esbozo",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "esbozo"};
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6c/Button_see_also.png",
     "speedTip": "Véase también",
     "tagOpen": "\{\{VT|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
     "speedTip": "Artículo existente en Wikipedia",
     "tagOpen": "\{\{ArtWikipedia|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
     "speedTip": "Marcar el artículo en construcción",
     "tagOpen": "\{\{Construccion|Usuario:",
     "tagClose": "\}\}",
     "sampleText": "tu nombre de usuario"};
 
    }

/* 
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]

Traída de Inciclopedia, inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder, para que funcione correctamente usando ''class='' en vez de ''id=''.
*/

function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    };
  };
};

addOnloadHook(UserNameReplace);
//**Countdown Clock**//
importScriptPage('Countdown/code.js', 'dev');

/* switch.js */
importScript('MediaWiki:Common.js/Switch.js');

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
// Etiqueta Inactivo
InactiveUsers = { text: 'Retirado' };
importScriptPage('InactiveUsers/code.js', 'dev');

// Iconossociales
/*
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};
importScriptPage('SocialIcons/code.js','dev');
*/

/* Any JavaScript here will be loaded for all users on every page load. */
/**
 Toggles the display of elements on a page
 Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
 See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
 */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled) return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++) {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string") {
            if (toggles.charAt(0) == '-') {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles) toggles = new Array(toggles);
            }
            else toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length) continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
        switch (op) {
        case "_reset":
            for (var j in toggles)
            toggles[j].style.display = toggles[j]._toggle_original_display;
            break;
        case "_show":
            for (var j in toggles)
            toggles[j].style.display = '';
            break;
        case "_hide":
            for (var j in toggles)
            toggles[j].style.display = 'none';
            break;
        case "":
        default:
            // Toggle
            for (var j in toggles)
            toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
            break;
        }
    }
}
 
function createTogglerLink(toggler, id) {
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit() {
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (typeof elem.className != 'string' || !elem.className) continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++) {
            var elemClass = elemClasses[j];
            if (!allClasses[elemClass]) allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle") continue;
 
            if (elemClass == "_togglegroup") toggleGroup = new Array();
            else if (elemClass == "_toggle") toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init") {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show") elem.style.display = '';
                else if (disp == "hide") elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler") {
                if (togglerID == -1) {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1) toBeToggled = elemClass.substring(hyphen + 1);
                else {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
    createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f) {
    f.q.value = 'site:http://openwetware.org/wiki/' + f.base.value + '++' + f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});