/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
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