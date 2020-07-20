/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// -------------------------------------------------------------------------------
//  Force Preview  JavaScript code - Start
//
//  To allow any group to bypass being forced to preview, 
//  enter the group name in the permittedGroups array.
//  E.g.
//    var permittedGroups = [];                       // force everyone
//    var permittedGroups = [ "user"];                // permit logged-in users 
//    var permittedGroups = [ "sysop", "bureaucrat"]; // permit sysop, bureaucrat 
// -------------------------------------------------------------------------------
var permittedGroups = [];
 
Array.prototype.intersects = function() {
  // --------------------------------------------------------
  //  Returns true if any element in the argument array
  //  is the same as an element in this array
  // --------------------------------------------------------
  if( !arguments.length ){
    return false;
  }
  var array2 = arguments[0];
 
  var len1 = this.length;
  var len2 = array2.length;
  if( len2 == 0 ){
    return false;
  }
 
  for(var i=0; i<len1; i++){
    for(var j=0; j<len2; j++) {
      if( this[i] === array2[j] ) {
        return true;
      }
    }
  }
  return false;
};
 
function forcePreview() 
{
  if( wgAction != "edit") return;
  if( wgUserGroups === null) {
    wgUserGroups = [];
  }
  if( wgUserGroups.intersects(permittedGroups) ) {
    return;
  }
  var saveButton = document.getElementById("wpSave");
  if( !saveButton )
    return;
  saveButton.disabled = true;
  saveButton.value = "Grabar la página (¡previsualiza antes!)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}
 
addOnloadHook(forcePreview);

// -----------------------------------------------------
//  Force Preview  JavaScript code - End
// -----------------------------------------------------


/** Username replace function ([[template:USERNAME]])
 * Inserts user name into <span class="insertusername"></span>
 * Originally by [[wikia:User:Splarka|Splarka]]
 * New version by [[User:Spang|Spang]]
 */
function UserNameReplace() {
	if( typeof( disableUsernameReplace ) != 'undefined' && disableUsernameReplace || wgUserName == null )
		return;
	var n = YAHOO.util.Dom.getElementsByClassName( 'insertusername', 'span', document.getElementById( 'bodyContent' ) );
	for ( var x in n ) {
		n[x].innerHTML = wgUserName;
	}
}
addOnloadHook( UserNameReplace );

/** Funcion de expansion de el foro
 * Añade la opción "Dejar un mensaje" en páginas de foro.
 */
function foroExtra() {
  if(wgNamespaceNumber != 110) return;
  var item = document.createElement("li");
  item.setAttribute("id", "control_addsection");
  item.setAttribute("class", "");
  item.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb21710/common/skins/common/blank.gif" class="sprite talk"><a rel="nofollow" id="ca-addsection" href="/index.php?title='+wgPageName+'&amp;action=edit&amp;section=new&amp;editintro=Template:Forumhelp&amp;preloadtitle=RE: '+wgTitle+'" title="Inicia una nueva sección [+]" accesskey="+">Dejar un mensaje</a>';
  var controls = document.getElementById("page_controls");
  controls.insertBefore(item, controls.childNodes[1]);

}
addOnloadHook(foroExtra);