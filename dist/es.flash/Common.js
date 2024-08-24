/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
importArticle({
    type: 'script',
    articles: [
     'u:dev:NullEditButton/code.js',
     'w:c:dev:ReferencePopups/code.js',
     'u:test-z:Switch.js',
     'w:c:dev:ExtendedNavigation/code.js'
     ]
});
/* Refrescar autom�ticamente WikiActivity y CambiosRecientes */
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
 
/* Etiqueta de usuarios inactivos */
InactiveUsers = { text: 'Inactivo' };
 
/* Nombre de usuario (idea original de Inciclopedia, modificado por Ciencia Al Poder) */
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
addOnloadHook(UserNameReplace);
 
/* Reescribir t�tulo */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

/* Bloquear foros */
window.LockForums = {
    expiryDays: 45,
    expiryMessage: "Este foro se considera archivado ya que no se ha respondido en 45 d�as.",
};
 
/* UserTags */
window.UserTagsJS = {
    tags: { },
    modules: {
        autoconfirmed: false,
        inactive: {
            days: 30,
            namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 500, 501, 1201],
            zeroIsInactive: false
        },
        mwGroups: [ 'founder', 'bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot', 'bannedfromchat' ],
        newuser: false
    }
}
/* Alerta Spoiler */
window.dev = window.dev || {}; window.dev.editSummaries = { css: '#stdSummaries { width: 264px }', select: 'MediaWiki:Standard Edit Summary' };
 
window.SpoilerAlert = {
    question: 'Este art�culo contiene adelantos y/o tramas de episodios a�n no estrenados. �Desea continuar?',
    yes: 'Si, quiero continuar',
    no: 'No, gracias',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};