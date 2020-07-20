// ================================================================
// kudos to Halo Nation wiki
// BEGIN - Username replace function ([[template:username]])
// * Description: Inserts user name into <span class="insertusername"></span>
// ================================================================
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);