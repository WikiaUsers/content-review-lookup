/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/*

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129677&counter=26' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129677&counter=26' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});

/*
-----------------------------------------
CÓDIGO PARA PLEGADO/DESPLEGADO DE BLOQUES
-----------------------------------------
Traido de [[wikipedia:es:mediwiki:common.js]]

Modificado por Chixpy en [[w:c:videojuego:mediawiki:monobook.js]]
  para su correcto funcionamiento en Wikia.

Plantillas que hacen uso de este código: [[Plantilla:Desplegable]]

Prerequisitos:

NavigationBarShowDefault : Si hay más de este número de desplegables
  ocultar todas automáticamente.
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

 if (typeof(mwCustomEditButtons) != 'undefined') {

/*
-------------------
BOTONES ADICIONALES
-------------------
Añadido por: [[uncyclopedia:es:user:Chixpy]]
*/ 
if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "\{\{borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png",
     "speedTip": "Aviso a usuario de artículo inadecuado",
     "tagOpen": '{{Wikiacentral\n',
     "tagClose": "\n}}",
     "sampleText": "|artículo= Nombre del artículo que creó y será borrado"};

 }


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
}

/**
 * Desactivar el botón guardar en la primera vez a los anónimos
 * Copyright Marc Mongenet, 2006 (fr.wikipedia.org)
 * Plyd 05/2007: add "after preview" in the button to prevent misunderstanding from beginners
 * Platonides 5/2008: Traído a es.wikipedia
 */
function forcePreview() {
  if (wgUserName != null || wgAction != "edit") return;
  saveButton = document.getElementById("wpSave");
  if (!saveButton) return;
  saveButton.disabled = true;
  saveButton.value += " (previsualizar antes)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}
 
addOnloadHook(forcePreview);

var wma_settings =
{
buttonImage: "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Erioll_world.svg/15px-Erioll_world.svg.png"
}
//</nowiki></pre>


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