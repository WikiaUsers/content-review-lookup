/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//Replaces <span class="insertusername"></span> with the Username of the reader
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

 /*User Rights Record*/ ajaxCallAgain = [ 'MediaWiki:UserRightsRecord/code.js', ];