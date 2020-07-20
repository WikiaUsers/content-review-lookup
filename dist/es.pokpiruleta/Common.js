/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// **************************************************
// NOMBRE DEL USUARIO
// **************************************************
// Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
// o la [[Plantilla:NOMBREUSUARIO]]
// Traída inicialmente de Uncyclopedia y corregida por 
// uncyclopedia:es:user:Ciencia Al Poder ,
// para que funcione correctamente usando ''class='' en vez de ''id=''.
// **************************************************
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

/*************************************************************************/ /* Contador de visitas (por Dark Neko Kasai) */ /*************************************************************************/  $(document).ready(function() { if (skin == 'oasis')  $('<li> <img style="padding-top:2px;" title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=2081021&counter=26" /> </li>').appendTo('#GlobalNavigation'); else $('#p-navigation ul').append('<li> <img title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=2081021&counter=26" /></li></li>'); });