// Nombreusuario
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
 
addOnloadHook(UserNameReplace);


// Usuarios inactivos
InactiveUsers = { text: 'En el otro mundo' };