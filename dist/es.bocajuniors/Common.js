/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

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

UserTagsJS.modules.inactive = {
	days: 30, // Especifica a los cuantos días a los usuarios les aparecerá el tag de "inactivo"
	namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 500, 501, 1201],
	zeroIsInactive: false
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bannedfromchat', 'blocked'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
importArticles({
	type:'script',
	articles: [
		'u:dev:UserTags/code.js'
	]
});