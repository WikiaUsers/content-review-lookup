/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/*****************/
/* NOMBREUSUARIO */
/*****************/

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

/* BOTONES EXTRAS */
/******************/
 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};


    }
 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuario"};


    }

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirigir",
		"tagOpen": "#REDIRECCIÓN [[",
		"tagClose": "]]",
		"sampleText": "Nombre del artículo"
	};

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

function toggleNavigationBar(indexNavigationBar) {
  var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
  var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

  if (!NavFrame || !NavToggle) {
    return false;
  };

  // if shown now
  if (NavToggle.firstChild.data == NavigationBarHide) {
    for (
    var NavChild = NavFrame.firstChild;
    NavChild != null;
    NavChild = NavChild.nextSibling) {
      if (NavChild.className == 'NavPic') {
        NavChild.style.display = 'none';
      };
      if (NavChild.className == 'NavContent') {
        NavChild.style.display = 'none';
      };
      if (NavChild.className == 'NavToggle') {
        NavChild.firstChild.data = NavigationBarShow;
      };
    };
    // if hidden now
  } else if (NavToggle.firstChild.data == NavigationBarShow) {
    for (
    var NavChild = NavFrame.firstChild;
    NavChild != null;
    NavChild = NavChild.nextSibling) {
      if (NavChild.className == 'NavPic') {
        NavChild.style.display = 'block';
      };
      if (NavChild.className == 'NavContent') {
        NavChild.style.display = 'block';
      };
      if (NavChild.className == 'NavToggle') {
        NavChild.firstChild.data = NavigationBarHide;
      };
    };
  };
};

// adds show/hide-button to navigation bars


function createNavigationBarToggleButton() {
  var indexNavigationBar = 0;
  // iterate over all <div>-elements
  for (
  var i = 0;
  NavFrame = document.getElementsByTagName("div")[i];
  i++) {
    // if found a navigation bar
    if (NavFrame.className == "NavFrame") {
      indexNavigationBar++;
      var NavToggle = document.createElement("a");
      NavToggle.className = 'NavToggle';
      NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
      NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

      var NavToggleText = document.createTextNode(NavigationBarShow);
      NavToggle.appendChild(NavToggleText);

      // add NavToggle-Button as first div-element 
      // in <div class="NavFrame">
      NavFrame.insertBefore(NavToggle, NavFrame.firstChild);
      NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
    };
  };

  //Plegamos todas....
  for (
  var i = 1;
  i <= indexNavigationBar;
  i++) {
    toggleNavigationBar(i);
    toggleNavigationBar(i);
  };
};

addOnloadHook(createNavigationBarToggleButton);