/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
// Username
function UserNameReplace(){
    if (wgUserName){
        var spans = getElementsByClassName(document, "span", "insetusername");
        
        for (var i = 0; i < spans.length; i++){
            spans[i].innerHTML = wgUserName;
        }
    }
}

addOnloadHook(UserNameReplace);