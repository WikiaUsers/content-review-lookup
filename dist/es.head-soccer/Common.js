/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

//Replaces <span class="insertusername"></span> with the Username of the reader
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

 /*User Rights Record*/ ajaxCallAgain = [ 'MediaWiki:UserRightsRecord/code.js', ];