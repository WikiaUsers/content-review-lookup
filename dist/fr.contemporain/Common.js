/* N’importe quel JavaScript ici sera chargé pour n’importe quel utilisateur et pour chaque page accédée. */
/**
 * Pour [[Modèle:Boîte déroulante]] 
 */
var NavigationBarShowDefault = 0;
 
function toggleNavigationBar(indexNavigationBar) {
  var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
  var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
  if (!NavFrame || !NavToggle) return;
 
  // surcharge des libellés dérouler/enrouler grâce a l'attribut title
  // exemple : title="[déroulade]/[enroulade]"
  var caption = [expandCaption, collapseCaption];
  if (NavFrame.title && NavFrame.title.length > 0) {
    caption = NavFrame.title.split("/");
    if (caption.length < 2) caption.push(collapseCaption);
  }
 
  // if shown now
  if (NavToggle.firstChild.data == caption[1]) {
    for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
      if (hasClass(NavChild, 'NavPic')) NavChild.style.display = 'none';
      if (hasClass(NavChild, 'NavContent')) NavChild.style.display = 'none';
      if (hasClass(NavChild, 'NavToggle')) NavChild.firstChild.data = caption[0];
    }
 
  // if hidden now
  } else if (NavToggle.firstChild.data == caption[0]) {
    for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
      if (hasClass(NavChild, 'NavPic')) NavChild.style.display = 'block';
      if (hasClass(NavChild, 'NavContent')) NavChild.style.display = 'block';
      if (hasClass(NavChild, 'NavToggle')) NavChild.firstChild.data = caption[1];
    }
  }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
  var indexNavigationBar = 0;
  var NavFrame;
  // iterate over all < div >-elements
  for( var i=0; NavFrame = document.getElementsByTagName("div")[i]; i++ ) {
    // if found a navigation bar
    if (hasClass(NavFrame, "NavFrame")) {
      indexNavigationBar++;
      var NavToggle = document.createElement("a");
      NavToggle.className = 'NavToggle';
      NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
      NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
      // surcharge des libellés dérouler/enrouler grâce a l'attribut title
      var caption = collapseCaption;
      if (NavFrame.title && NavFrame.title.indexOf("/") > 0) {
         caption = NavFrame.title.split("/")[1];
      }
 
      var NavToggleText = document.createTextNode(caption);
      NavToggle.appendChild(NavToggleText);
 
      // add NavToggle-Button as first div-element 
      // in <div class="NavFrame">
      NavFrame.insertBefore( NavToggle, NavFrame.firstChild );
      NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
    }
  }
  // if more Navigation Bars found than Default: hide all
  if (NavigationBarShowDefault < indexNavigationBar) {
    for( var i=1; i<=indexNavigationBar; i++ ) {
      toggleNavigationBar(i);
    }
  }
}
 
addOnloadHook(createNavigationBarToggleButton);