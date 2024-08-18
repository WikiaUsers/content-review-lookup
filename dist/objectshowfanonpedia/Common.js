//Replaces Magic word {{USERNAME}} with the name of the user currently browsing the page
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
//END OF {{USERNAME}} REPLACEMENT