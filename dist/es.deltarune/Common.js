function UserNameReplace() { 
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; 
    $("span.insertusername").html(wgUserName); 
    } 
    addOnloadHook(UserNameReplace)