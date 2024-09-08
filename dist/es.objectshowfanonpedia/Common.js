//Reemplaza la palabra mágica {{USERNAME}} con el nombre del usuario que está navegando actualmente en la página
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
//FIN DEL REEMPLAZO DE {{USERNAME}}