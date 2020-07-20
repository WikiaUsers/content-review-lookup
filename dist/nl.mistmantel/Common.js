/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */
//Enables {{USERNAME}} template. 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);