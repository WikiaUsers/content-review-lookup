/* Umieszczony tutaj kod JavaScript dotyczyć będzie tylko administratorów */
/* link do nuke */
var username = mw.config.get("wgPageName").split("/")[1];
$('#contentSub a:nth-child(7)').after(' • <a title="Specjalna:Masowe usuwanie" href="/wiki/Specjalna:Masowe_usuwanie?target=' + username + '">masowe usuwanie</a>');

//Navigation popups
popupAdminLinks=true;